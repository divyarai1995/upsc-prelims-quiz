import type { Question, SubjectId } from '../types';
import { STATIC_BY_ID } from '../data/bank';
import { fromGeneratedId } from '../generators';
import { dayKey, DAY_MS } from './dates';

export interface QStat {
  seen: number;
  correct: number;
  last: number;
  lastCorrect: boolean;
}

/** Leitner box for the mistakes deck. */
export interface ReviewCard {
  box: number;
  due: number;
  added: number;
}

export interface SessionRecord {
  id: string;
  date: number;
  title: string;
  mode: 'practice' | 'exam';
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  durationSec: number;
  bySubject: Partial<Record<SubjectId, { c: number; t: number }>>;
}

export interface Settings {
  theme: 'system' | 'light' | 'dark';
  dailyGoal: number;
  negative: boolean;
}

export interface Progress {
  version: 1;
  q: Record<string, QStat>;
  /** Keyed by `${subject}|${topic}`. a = attempted, c = correct. */
  topics: Record<string, { a: number; c: number }>;
  review: Record<string, ReviewCard>;
  /** Copies of non-bank questions (current affairs) referenced by review or bookmarks. */
  saved: Record<string, Question>;
  bookmarks: string[];
  sessions: SessionRecord[];
  daily: Record<string, number>;
  settings: Settings;
}

/** Days until next review after a correct answer, indexed by box. */
export const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
export const MAX_BOX = BOX_INTERVAL_DAYS.length - 1;

const KEY = 'upsc-quiz:progress:v1';

export function emptyProgress(): Progress {
  return {
    version: 1,
    q: {},
    topics: {},
    review: {},
    saved: {},
    bookmarks: [],
    sessions: [],
    daily: {},
    settings: { theme: 'system', dailyGoal: 30, negative: true },
  };
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyProgress();
    return normalise(JSON.parse(raw));
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // Storage full or blocked. The app keeps working for this session.
  }
}

export function normalise(raw: unknown): Progress {
  const base = emptyProgress();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<Progress>;
  return {
    ...base,
    ...r,
    version: 1,
    settings: { ...base.settings, ...(r.settings ?? {}) },
    q: r.q ?? {},
    topics: r.topics ?? {},
    review: r.review ?? {},
    saved: r.saved ?? {},
    bookmarks: Array.isArray(r.bookmarks) ? r.bookmarks : [],
    sessions: Array.isArray(r.sessions) ? r.sessions : [],
    daily: r.daily ?? {},
  };
}

function needsCopy(q: Question): boolean {
  return !STATIC_BY_ID.has(q.id) && !q.generated;
}

/** Applies one answered question to progress. Returns a new object. */
export function recordAnswer(p: Progress, q: Question, correct: boolean, now = Date.now()): Progress {
  const prev = p.q[q.id];
  const stat: QStat = {
    seen: (prev?.seen ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
    last: now,
    lastCorrect: correct,
  };
  const tkey = `${q.subject}|${q.topic}`;
  const t = p.topics[tkey] ?? { a: 0, c: 0 };
  const review = { ...p.review };
  const saved = { ...p.saved };
  const card = review[q.id];
  if (!correct) {
    review[q.id] = { box: 1, due: now, added: card?.added ?? now };
    if (needsCopy(q)) saved[q.id] = q;
  } else if (card) {
    const box = card.box + 1;
    if (box > MAX_BOX) {
      delete review[q.id];
      if (!p.bookmarks.includes(q.id)) delete saved[q.id];
    } else {
      review[q.id] = { ...card, box, due: now + BOX_INTERVAL_DAYS[box] * DAY_MS };
    }
  }
  const day = dayKey(now);
  return {
    ...p,
    q: { ...p.q, [q.id]: stat },
    topics: { ...p.topics, [tkey]: { a: t.a + 1, c: t.c + (correct ? 1 : 0) } },
    review,
    saved,
    daily: { ...p.daily, [day]: (p.daily[day] ?? 0) + 1 },
  };
}

export function toggleBookmark(p: Progress, q: Question): Progress {
  const has = p.bookmarks.includes(q.id);
  const saved = { ...p.saved };
  if (has) {
    if (!p.review[q.id]) delete saved[q.id];
  } else if (needsCopy(q)) {
    saved[q.id] = q;
  }
  return { ...p, bookmarks: has ? p.bookmarks.filter((x) => x !== q.id) : [...p.bookmarks, q.id], saved };
}

export function addSession(p: Progress, s: SessionRecord): Progress {
  return { ...p, sessions: [s, ...p.sessions].slice(0, 300) };
}

/** Resolves a stored question id back to a question, if it still exists. */
export function resolveQuestion(id: string, p: Progress, extra?: Map<string, Question>): Question | undefined {
  return STATIC_BY_ID.get(id) ?? fromGeneratedId(id) ?? extra?.get(id) ?? p.saved[id];
}

export function dueCards(p: Progress, now = Date.now()): string[] {
  return Object.entries(p.review)
    .filter(([, c]) => c.due <= now)
    .sort((a, b) => a[1].box - b[1].box || a[1].due - b[1].due)
    .map(([id]) => id);
}
