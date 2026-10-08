#!/usr/bin/env node
// Daily current affairs update.
//   1. Fetch RSS feeds listed in scripts/sources.json
//   2. Keep recent, UPSC-relevant items and store them as a daily brief
//   3. If LLM_API_KEY is set, turn the best items into exam-style MCQs
// Output: public/data/ca/YYYY-MM.json (questions), briefs-YYYY-MM.json, index.json
//
// Env: LLM_API_KEY (or GEMINI_API_KEY), LLM_BASE_URL, LLM_MODEL,
//      CA_QUESTIONS (default 10), CA_MAX_BRIEFS (default 30), CA_MAX_AGE_HOURS (default 48),
//      CA_SOURCES and CA_DATA_DIR (paths, used by tests)

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { chatJSON, llmConfig } from './lib/llm.mjs';
import { parseFeed } from './lib/rss.mjs';
import { normaliseTitle, scoreItem } from './lib/relevance.mjs';
import { SYSTEM_PROMPT, userPrompt, validateQuestion } from './lib/questions.mjs';

const ROOT = new URL('../', import.meta.url);
const DATA = process.env.CA_DATA_DIR ? pathToFileURL(`${process.env.CA_DATA_DIR.replace(/\/+$/, '')}/`) : new URL('public/data/ca/', ROOT);
const SOURCES = process.env.CA_SOURCES ? pathToFileURL(process.env.CA_SOURCES) : new URL('scripts/sources.json', ROOT);
const QUESTIONS = Number(process.env.CA_QUESTIONS || 10);
const MAX_BRIEFS = Number(process.env.CA_MAX_BRIEFS || 30);
const MAX_AGE_H = Number(process.env.CA_MAX_AGE_HOURS || 48);
const IST_MS = 330 * 60_000;

const sha = (s) => createHash('sha1').update(s).digest('hex').slice(0, 10);
const istDate = (d) => new Date(d.getTime() + IST_MS).toISOString().slice(0, 10);

async function readJson(url, fallback) {
  try {
    return JSON.parse(await readFile(url, 'utf8'));
  } catch {
    return fallback;
  }
}

async function writeJson(url, data) {
  await writeFile(url, `${JSON.stringify(data, null, 1)}\n`);
}

async function fetchFeed(src) {
  const res = await fetch(src.url, {
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; upsc-prelims-quiz/1.0; +https://github.com)', accept: 'application/rss+xml, application/xml, text/xml, */*' },
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseFeed(await res.text());
}

async function main() {
  await mkdir(DATA, { recursive: true });
  const sources = JSON.parse(await readFile(SOURCES, 'utf8'));
  const now = new Date();
  const today = istDate(now);
  const month = today.slice(0, 7);
  const prevMonth = istDate(new Date(now.getTime() - 32 * 86_400_000)).slice(0, 7);

  // 1. Fetch
  const fetched = [];
  for (const src of sources) {
    try {
      const items = await fetchFeed(src);
      console.log(`✓ ${src.name}: ${items.length} items`);
      for (const it of items) fetched.push({ ...it, source: src.name, bonus: src.bonus ?? 0 });
    } catch (e) {
      console.log(`✗ ${src.name}: ${e.message}`);
    }
  }

  // 2. Filter and dedupe against what is already stored
  const briefFile = (m) => new URL(`briefs-${m}.json`, DATA);
  const qFile = (m) => new URL(`${m}.json`, DATA);
  const briefs = await readJson(briefFile(month), { month, briefs: [] });
  const prevBriefs = month === prevMonth ? { briefs: [] } : await readJson(briefFile(prevMonth), { briefs: [] });
  const seen = new Set([...briefs.briefs, ...prevBriefs.briefs].flatMap((b) => [normaliseTitle(b.title), b.url]));

  const cutoff = now.getTime() - MAX_AGE_H * 3_600_000;
  const fresh = [];
  for (const it of fetched) {
    if (it.date && it.date.getTime() < cutoff) continue;
    const key = normaliseTitle(it.title);
    if (!key || seen.has(key) || seen.has(it.link)) continue;
    const { score, category } = scoreItem(it, it.bonus);
    if (score < 2) continue;
    seen.add(key);
    seen.add(it.link);
    fresh.push({
      id: sha(it.link || it.title),
      date: it.date ? istDate(it.date) : today,
      title: it.title.replace(/\s+-\s+[^-]{2,40}$/, '').trim(),
      summary: it.summary.length > 260 ? `${it.summary.slice(0, 257).trimEnd()}…` : it.summary,
      source: it.source,
      url: it.link,
      category,
      score,
    });
  }
  fresh.sort((a, b) => b.score - a.score);
  const picked = fresh.slice(0, MAX_BRIEFS);
  console.log(`${fresh.length} new relevant items, keeping ${picked.length}`);
  briefs.briefs.push(...picked.map(({ score, ...b }) => b));
  briefs.briefs.sort((a, b) => b.date.localeCompare(a.date));

  // 3. Questions
  const qs = await readJson(qFile(month), { month, questions: [] });
  const cfg = llmConfig();
  let added = 0;
  if (!cfg.apiKey) {
    console.log('LLM_API_KEY not set: storing headlines only. See README to enable daily questions.');
  } else if (picked.length < 3) {
    console.log('Too few new items to write questions today.');
  } else {
    const items = picked.slice(0, 25);
    try {
      const { model, json } = await chatJSON(cfg, SYSTEM_PROMPT, userPrompt(items, QUESTIONS));
      const existing = new Set(qs.questions.map((q) => normaliseTitle(q.question + (q.statements ?? []).join(' '))));
      for (const raw of Array.isArray(json.questions) ? json.questions : []) {
        const q = validateQuestion(raw, items);
        if (!q) continue;
        const key = normaliseTitle(q.question + (q.statements ?? []).join(' '));
        if (existing.has(key)) continue;
        existing.add(key);
        qs.questions.push({ id: `ca-${q.date.replace(/-/g, '')}-${sha(key)}`, ...q });
        added++;
      }
      console.log(`${model} wrote ${added} valid questions`);
    } catch (e) {
      console.log(`Question generation failed: ${e.message}`);
    }
  }

  await writeJson(briefFile(month), briefs);
  if (qs.questions.length || added) await writeJson(qFile(month), qs);

  // 4. Index of all months on disk
  const files = await readdir(DATA);
  const months = new Set(files.map((f) => /^(?:briefs-)?(\d{4}-\d{2})\.json$/.exec(f)?.[1]).filter(Boolean));
  const index = { updated: now.toISOString(), months: [] };
  for (const m of [...months].sort().reverse()) {
    const q = await readJson(qFile(m), { questions: [] });
    const b = await readJson(briefFile(m), { briefs: [] });
    index.months.push({ month: m, questions: q.questions.length, briefs: b.briefs.length });
  }
  await writeJson(new URL('index.json', DATA), index);
  console.log(`Done: +${picked.length} briefs, +${added} questions for ${month}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
