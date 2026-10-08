import type { Question } from '../types';

export type Mode = 'practice' | 'exam';

export interface QuizSession {
  id: string;
  title: string;
  mode: Mode;
  questions: Question[];
  responses: (number | null)[];
  /** Practice mode: answer locked in and explanation shown. */
  revealed: boolean[];
  marked: boolean[];
  current: number;
  startedAt: number;
  finishedAt?: number;
  timeLimitSec: number | null;
  negative: boolean;
}

const ACTIVE = 'upsc-quiz:active:v1';
const LAST = 'upsc-quiz:last:v1';

export function newSession(title: string, mode: Mode, questions: Question[], opts: { timeLimitSec?: number | null; negative?: boolean } = {}): QuizSession {
  return {
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    title,
    mode,
    questions,
    responses: questions.map(() => null),
    revealed: questions.map(() => false),
    marked: questions.map(() => false),
    current: 0,
    startedAt: Date.now(),
    timeLimitSec: opts.timeLimitSec ?? null,
    negative: opts.negative ?? true,
  };
}

/** UPSC gives 120 minutes for 100 GS or 80 CSAT questions. */
export function examTimeFor(questions: Question[]): number {
  const csat = new Set(['quant', 'reasoning', 'comprehension', 'di']);
  const sec = questions.reduce((s, q) => s + (csat.has(q.subject) ? 90 : 72), 0);
  return Math.ceil(sec / 60) * 60;
}

function read(key: string): QuizSession | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as QuizSession) : null;
  } catch {
    return null;
  }
}

function write(key: string, s: QuizSession | null) {
  try {
    if (s) localStorage.setItem(key, JSON.stringify(s));
    else localStorage.removeItem(key);
  } catch {
    // Ignore storage failures; the session still lives in memory.
  }
}

export const loadActive = () => read(ACTIVE);
export const saveActive = (s: QuizSession | null) => write(ACTIVE, s);
export const loadLast = () => read(LAST);
export const saveLast = (s: QuizSession | null) => write(LAST, s);
