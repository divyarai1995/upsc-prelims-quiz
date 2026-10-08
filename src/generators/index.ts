import type { Question, SubjectId } from '../types';
import { diGenerators } from './di';
import { quantGenerators } from './quant';
import { reasoningGenerators } from './reasoning';
import { randomSeed, Rng } from './rng';
import type { Generator } from './types';

export const GENERATORS: Generator[] = [...quantGenerators, ...reasoningGenerators, ...diGenerators];
const BY_KEY = new Map(GENERATORS.map((g) => [g.key, g]));

export function generate(key: string, seed: number): Question {
  const g = BY_KEY.get(key);
  if (!g) throw new Error(`Unknown generator ${key}`);
  const out = g.make(new Rng(seed));
  return { id: `gen:${key}:${seed}`, subject: g.subject, topic: g.topic, generated: true, ...out };
}

/** Rebuilds a generated question from its id, e.g. "gen:clock:123". */
export function fromGeneratedId(id: string): Question | undefined {
  const m = /^gen:([a-z]+):(\d+)$/.exec(id);
  if (!m || !BY_KEY.has(m[1])) return undefined;
  return generate(m[1], Number(m[2]));
}

export function generatorsFor(subject: SubjectId, topics?: string[]): Generator[] {
  return GENERATORS.filter((g) => g.subject === subject && (!topics?.length || topics.includes(g.topic)));
}

export function randomGenerated(subject: SubjectId, topics?: string[]): Question | undefined {
  const gens = generatorsFor(subject, topics);
  if (!gens.length) return undefined;
  const g = gens[Math.floor(Math.random() * gens.length)];
  return generate(g.key, randomSeed());
}

export function generatorTopics(subject: SubjectId): string[] {
  return generatorsFor(subject).map((g) => g.topic);
}
