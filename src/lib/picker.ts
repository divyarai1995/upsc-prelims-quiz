import type { Question, SubjectId } from '../types';
import { staticFor } from '../data/bank';
import { SUBJECT_MAP } from '../data/subjects';
import { generate, generatorsFor } from '../generators';
import { Rng, randomSeed } from '../generators/rng';
import { DAY_MS, dayKey } from './dates';
import type { Progress } from './progress';

export interface PickConfig {
  subjects: SubjectId[];
  /** Optional topic filter. Topics are matched within the chosen subjects. */
  topics?: string[];
  count: number;
}

/** Splits `count` across subjects by weight using largest remainders, respecting per-subject caps. */
export function allocate(weights: Map<SubjectId, number>, caps: Map<SubjectId, number>, count: number): Map<SubjectId, number> {
  const out = new Map<SubjectId, number>();
  let remaining = count;
  let active = [...weights.keys()].filter((s) => (caps.get(s) ?? 0) > 0);
  while (remaining > 0 && active.length) {
    const total = active.reduce((s, k) => s + (weights.get(k) ?? 0), 0) || active.length;
    const raw = active.map((s) => ({ s, x: (remaining * (weights.get(s) || 1)) / total }));
    const give = new Map(raw.map(({ s, x }) => [s, Math.floor(x)]));
    let left = remaining - [...give.values()].reduce((a, b) => a + b, 0);
    for (const { s } of raw.sort((a, b) => (b.x % 1) - (a.x % 1))) {
      if (left <= 0) break;
      give.set(s, (give.get(s) ?? 0) + 1);
      left--;
    }
    let placed = 0;
    for (const s of active) {
      const room = (caps.get(s) ?? 0) - (out.get(s) ?? 0);
      const g = Math.min(room, give.get(s) ?? 0);
      out.set(s, (out.get(s) ?? 0) + g);
      placed += g;
    }
    remaining -= placed;
    active = active.filter((s) => (caps.get(s) ?? 0) > (out.get(s) ?? 0));
    if (placed === 0) break;
  }
  return out;
}

function priority(q: Question, p: Progress, now: number): number {
  const s = p.q[q.id];
  if (!s) return 3 + Math.random();
  const ageDays = (now - s.last) / DAY_MS;
  return (s.lastCorrect ? 0 : 1.5) + Math.min(1, ageDays / 30) + Math.random();
}

function takeBest(pool: Question[], k: number, p: Progress, now: number): Question[] {
  return pool
    .map((q) => ({ q, w: priority(q, p, now) }))
    .sort((a, b) => b.w - a.w)
    .slice(0, k)
    .map((x) => x.q);
}

function isNumericOption(o: string): boolean {
  return /^[₹\d.,\s%°:/-]+$/.test(o.replace(/\b(years?|days?|hours?|km\/h|km|seconds?|m)\b/g, '').trim());
}

/** Shuffles options of plain MCQs so answer positions are not predictable. */
export function prepare(q: Question, rng: Rng = new Rng(randomSeed())): Question {
  if (q.keepOrder || q.generated || q.statements || q.pairs || q.format || q.options.every(isNumericOption)) return q;
  const order = rng.shuffle([0, 1, 2, 3]);
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
}

export function poolFor(subject: SubjectId, topics: string[] | undefined, ca: Question[]): Question[] {
  const base = subject === 'current' ? ca : staticFor(subject);
  if (!topics?.length) return base;
  return base.filter((q) => topics.includes(q.topic));
}

/** Builds a quiz that favours unseen questions and recent mistakes. */
export function buildQuiz(cfg: PickConfig, p: Progress, ca: Question[], now = Date.now()): Question[] {
  const weights = new Map<SubjectId, number>();
  const caps = new Map<SubjectId, number>();
  const pools = new Map<SubjectId, Question[]>();
  for (const s of cfg.subjects) {
    const pool = poolFor(s, cfg.topics, ca);
    const gens = generatorsFor(s, cfg.topics);
    pools.set(s, pool);
    weights.set(s, SUBJECT_MAP[s].weight);
    caps.set(s, gens.length ? Number.POSITIVE_INFINITY : pool.length);
  }
  const alloc = allocate(weights, caps, cfg.count);
  const out: Question[] = [];
  for (const [s, k] of alloc) {
    if (!k) continue;
    const pool = pools.get(s) ?? [];
    const gens = generatorsFor(s, cfg.topics);
    // Subjects with generators mix ~30% hand-written questions with fresh generated ones.
    const fromStatic = Math.min(pool.length, gens.length ? Math.round(k * 0.3) : k);
    out.push(...takeBest(pool, fromStatic, p, now));
    for (let i = fromStatic; i < k; i++) {
      const g = gens[Math.floor(Math.random() * gens.length)];
      out.push(generate(g.key, randomSeed()));
    }
  }
  const rng = new Rng(randomSeed());
  return rng.shuffle(out).map((q) => prepare(q, rng));
}

/** Same 15 questions for everyone on a given day: 10 GS from the bank and 5 fresh CSAT. */
export function dailyChallenge(date = new Date()): Question[] {
  const seed = Number(dayKey(date).replace(/-/g, ''));
  const rng = new Rng(seed);
  const gsSubjects: SubjectId[] = ['polity', 'history', 'geography', 'economy', 'environment', 'science', 'gk'];
  const gs = rng.sample(gsSubjects.flatMap((s) => staticFor(s)), 10);
  const csat = generatorsFor('quant').concat(generatorsFor('reasoning'));
  const gen = Array.from({ length: 5 }, () => generate(rng.pick(csat).key, rng.int(1, 2 ** 30)));
  return [...gs, ...gen].map((q) => prepare(q, rng));
}
