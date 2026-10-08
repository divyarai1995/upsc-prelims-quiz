import { execFile } from 'node:child_process';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { createServer, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { chatJSON, llmConfig, parseJsonLoose } from '../scripts/lib/llm.mjs';
import { cleanText, parseFeed } from '../scripts/lib/rss.mjs';
import { normaliseTitle, scoreItem } from '../scripts/lib/relevance.mjs';
import { validateQuestion } from '../scripts/lib/questions.mjs';

const run = promisify(execFile);
const now = new Date().toUTCString();

const RSS = `<?xml version="1.0"?><rss version="2.0"><channel><title>Test</title>
<item><title><![CDATA[Cabinet approves new scheme for MSME credit guarantee]]></title><link>https://example.org/a</link><pubDate>${now}</pubDate><description>&lt;p&gt;The Union Cabinet approved a credit &amp;amp; guarantee scheme for MSMEs.&lt;/p&gt;</description></item>
<item><title>ISRO launches earth observation satellite from Sriharikota</title><link>https://example.org/b</link><pubDate>${now}</pubDate><description>The satellite will monitor climate and forest cover.</description></item>
<item><title>Actor's film breaks box office record</title><link>https://example.org/c</link><pubDate>${now}</pubDate><description>Celebrity news.</description></item>
<item><title>Supreme Court rules on Governor's powers under Article 200</title><link>https://example.org/d</link><pubDate>${now}</pubDate><description>A Constitution bench of the Supreme Court said Governors cannot sit on Bills indefinitely.</description></item>
<item><title>Old news on wetlands and Ramsar sites</title><link>https://example.org/old</link><pubDate>Mon, 01 Jan 2001 00:00:00 GMT</pubDate><description>Ramsar wetland climate.</description></item>
</channel></rss>`;

const ATOM = `<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>New Ramsar wetland site designated in India for biodiversity</title><link href="https://example.org/e"/><updated>${new Date().toISOString()}</updated><summary>The wetland supports endangered species and migratory birds.</summary></entry></feed>`;

describe('rss parsing', () => {
  it('reads RSS items, unwraps CDATA and decodes entity-encoded HTML', () => {
    const items = parseFeed(RSS);
    expect(items).toHaveLength(5);
    expect(items[0].title).toBe('Cabinet approves new scheme for MSME credit guarantee');
    expect(items[0].summary).toBe('The Union Cabinet approved a credit & guarantee scheme for MSMEs.');
    expect(items[0].date).toBeInstanceOf(Date);
  });

  it('reads Atom entries with href links', () => {
    const [e] = parseFeed(ATOM);
    expect(e.link).toBe('https://example.org/e');
    expect(e.title).toContain('Ramsar');
  });

  it('cleans text', () => {
    expect(cleanText('<b>A</b>&nbsp;&#8377;5 &#x2014; done')).toBe('A ₹5 — done');
  });
});

describe('relevance', () => {
  it('scores policy news above entertainment', () => {
    const good = scoreItem({ title: 'Supreme Court on Article 356 and Governor', summary: '' });
    const bad = scoreItem({ title: "Actor's film tops box office", summary: '' });
    expect(good.score).toBeGreaterThan(1);
    expect(good.category).toBe('Polity & Governance');
    expect(bad.score).toBeLessThan(1);
  });

  it('normalises titles for de-duplication', () => {
    expect(normaliseTitle('RBI keeps repo rate unchanged - The Hindu')).toBe(normaliseTitle('RBI keeps repo rate unchanged!'));
  });
});

describe('question validation', () => {
  const items = [{ date: '2026-10-08', source: 'PIB', url: 'https://example.org/a', category: 'Economy' }];
  const good = { item: 0, topic: 'Economy', question: 'Which body approved the scheme?', options: ['Cabinet', 'RBI', 'SEBI', 'NITI Aayog'], answer: 0, explanation: 'The news item says the Union Cabinet approved it.' };

  it('accepts a well-formed question and attaches source and date', () => {
    const q = validateQuestion(good, items);
    expect(q).toMatchObject({ subject: 'current', topic: 'Economy', date: '2026-10-08', source: { label: 'PIB' } });
  });

  it('rejects broken output', () => {
    expect(validateQuestion({ ...good, options: ['a', 'b', 'c'] }, items)).toBeNull();
    expect(validateQuestion({ ...good, answer: 4 }, items)).toBeNull();
    expect(validateQuestion({ ...good, item: 5 }, items)).toBeNull();
    expect(validateQuestion({ ...good, options: ['a', 'a', 'b', 'c'] }, items)).toBeNull();
    expect(validateQuestion({ ...good, explanation: '' }, items)).toBeNull();
  });

  it('strips numbering from statements and adds a default ask line', () => {
    const q = validateQuestion({ ...good, statements: ['1. First fact here', '2) Second fact here'] }, items)!;
    expect(q.statements).toEqual(['First fact here', 'Second fact here']);
    expect(q.ask).toMatch(/is\/are correct/);
  });
});

describe('llm client', () => {
  it('defaults to the Gemini OpenAI-compatible endpoint with fallbacks', () => {
    const c = llmConfig({ LLM_API_KEY: 'k' });
    expect(c.baseUrl).toContain('generativelanguage.googleapis.com');
    expect(c.models.length).toBeGreaterThan(1);
    expect(llmConfig({ LLM_API_KEY: 'k', LLM_BASE_URL: 'https://api.groq.com/openai/v1', LLM_MODEL: 'llama' }).models).toEqual(['llama']);
  });

  it('parses JSON wrapped in code fences', () => {
    expect(parseJsonLoose('```json\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it('falls through to the next model on 404 and retries without response_format on 400', async () => {
    const calls: string[] = [];
    const fake = async (_url: string, init: { body: string }) => {
      const body = JSON.parse(init.body);
      calls.push(`${body.model}:${body.response_format ? 'json' : 'plain'}`);
      if (body.model === 'm1') return new Response('model not found', { status: 404 });
      if (body.response_format) return new Response('response_format unsupported', { status: 400 });
      return new Response(JSON.stringify({ choices: [{ message: { content: '{"questions":[]}' } }] }), { status: 200 });
    };
    const out = await chatJSON({ apiKey: 'k', baseUrl: 'http://x', models: ['m1', 'm2'] }, 's', 'u', { fetchImpl: fake as never, log: () => {} });
    expect(out.model).toBe('m2');
    expect(calls).toEqual(['m1:json', 'm2:json', 'm2:plain']);
  });
});

describe('update script end to end', () => {
  let server: Server;
  let base = '';
  let llmCalls = 0;

  beforeAll(async () => {
    server = createServer((req, res) => {
      if (req.url === '/feed.xml') return res.end(RSS);
      if (req.url === '/atom.xml') return res.end(ATOM);
      if (req.url === '/llm/chat/completions') {
        llmCalls++;
        const content = JSON.stringify({
          questions: [
            { item: 0, topic: 'Polity & Governance', question: 'Consider the following statements about the ruling:', statements: ['It concerned Article 200.', 'It was delivered by a Constitution bench.'], ask: 'Which of the statements given above is/are correct?', options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'], answer: 2, explanation: 'The item says a Constitution bench ruled on Article 200.' },
            { item: 1, topic: 'Science & Tech', question: 'From where was the earth observation satellite launched?', options: ['Sriharikota', 'Thumba', 'Kourou', 'Wheeler Island'], answer: 0, explanation: 'The item says it was launched from Sriharikota.' },
            { item: 9, question: 'bad', options: [], answer: 9, explanation: '' },
          ],
        });
        return res.end(JSON.stringify({ choices: [{ message: { content } }] }));
      }
      res.statusCode = 404;
      res.end();
    });
    await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
    const addr = server.address();
    base = `http://127.0.0.1:${typeof addr === 'object' && addr ? addr.port : 0}`;
  });

  afterAll(() => server.close());

  it('writes briefs, questions and index, and does not duplicate on a second run', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'ca-'));
    const sources = join(dir, 'sources.json');
    await writeFile(
      sources,
      JSON.stringify([
        { name: 'Fixture RSS', url: `${base}/feed.xml` },
        { name: 'Fixture Atom', url: `${base}/atom.xml` },
        { name: 'Broken', url: `${base}/missing.xml` },
      ]),
    );
    const env = { ...process.env, CA_SOURCES: sources, CA_DATA_DIR: dir, LLM_API_KEY: 'test', LLM_BASE_URL: `${base}/llm`, LLM_MODEL: 'fake', NODE_USE_ENV_PROXY: '' };
    const { stdout } = await run('node', ['scripts/update-current-affairs.mjs'], { env });
    expect(stdout).toContain('✗ Broken');
    expect(stdout).toContain('wrote 2 valid questions');

    const index = JSON.parse(await readFile(join(dir, 'index.json'), 'utf8'));
    expect(index.months).toHaveLength(1);
    const m = index.months[0].month;
    expect(index.months[0]).toMatchObject({ questions: 2 });
    const briefs = JSON.parse(await readFile(join(dir, `briefs-${m}.json`), 'utf8')).briefs;
    const titles = briefs.map((b: { title: string }) => b.title).join(' | ');
    expect(titles).toContain('ISRO');
    expect(titles).toContain('Ramsar wetland site');
    expect(titles).not.toContain('box office');
    expect(titles).not.toContain('Old news');
    const qs = JSON.parse(await readFile(join(dir, `${m}.json`), 'utf8')).questions;
    expect(qs[0].id).toMatch(/^ca-\d{8}-[0-9a-f]{10}$/);
    expect(qs[0].source.url).toMatch(/^https:\/\/example\.org\//);

    const callsBefore = llmCalls;
    const second = await run('node', ['scripts/update-current-affairs.mjs'], { env });
    expect(second.stdout).toContain('0 new relevant items');
    expect(llmCalls).toBe(callsBefore);
    const again = JSON.parse(await readFile(join(dir, `briefs-${m}.json`), 'utf8')).briefs;
    expect(again).toHaveLength(briefs.length);
  }, 30_000);

  it('stores headlines only when no API key is set', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'ca-'));
    const sources = join(dir, 'sources.json');
    await writeFile(sources, JSON.stringify([{ name: 'Fixture RSS', url: `${base}/feed.xml` }]));
    const env = { ...process.env, CA_SOURCES: sources, CA_DATA_DIR: dir, LLM_API_KEY: '', GEMINI_API_KEY: '' };
    const { stdout } = await run('node', ['scripts/update-current-affairs.mjs'], { env });
    expect(stdout).toContain('LLM_API_KEY not set');
    const index = JSON.parse(await readFile(join(dir, 'index.json'), 'utf8'));
    expect(index.months[0].questions).toBe(0);
    expect(index.months[0].briefs).toBeGreaterThan(0);
  }, 30_000);
});
