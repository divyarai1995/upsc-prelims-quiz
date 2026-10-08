import { describe, expect, it } from 'vitest';
import { STATIC_BANK } from '../src/data/bank';
import { allocate, buildQuiz, dailyChallenge, prepare } from '../src/lib/picker';
import { BOX_INTERVAL_DAYS, dueCards, emptyProgress, normalise, recordAnswer, toggleBookmark } from '../src/lib/progress';
import { scoreQuiz } from '../src/lib/scoring';
import { streakFrom, dayKey, daysAgo } from '../src/lib/dates';
import { Rng } from '../src/generators/rng';
import type { Question, SubjectId } from '../src/types';

const gsQ = STATIC_BANK.find((q) => q.subject === 'polity')!;
const csatQ = STATIC_BANK.find((q) => q.subject === 'reasoning')!;

describe('scoring', () => {
  it('applies UPSC marks and one-third negative marking', () => {
    const qs = [gsQ, gsQ, gsQ, csatQ, csatQ];
    const wrongGs = (gsQ.answer + 1) % 4;
    const wrongCs = (csatQ.answer + 1) % 4;
    const s = scoreQuiz(qs, [gsQ.answer, wrongGs, null, csatQ.answer, wrongCs]);
    expect(s.correct).toBe(2);
    expect(s.wrong).toBe(2);
    expect(s.skipped).toBe(1);
    expect(s.maxScore).toBe(2 * 3 + 2.5 * 2);
    expect(s.score).toBeCloseTo(2 - 2 / 3 + 2.5 - 2.5 / 3, 2);
  });

  it('can switch negative marking off', () => {
    const s = scoreQuiz([gsQ, gsQ], [gsQ.answer, (gsQ.answer + 1) % 4], false);
    expect(s.score).toBe(2);
  });
});

describe('allocate', () => {
  it('splits by weight and respects caps', () => {
    const w = new Map<SubjectId, number>([
      ['polity', 15],
      ['gk', 5],
    ]);
    const caps = new Map<SubjectId, number>([
      ['polity', 100],
      ['gk', 2],
    ]);
    const a = allocate(w, caps, 20);
    expect(a.get('gk')).toBe(2);
    expect(a.get('polity')).toBe(18);
  });

  it('never exceeds the requested total', () => {
    const w = new Map<SubjectId, number>([
      ['polity', 15],
      ['history', 15],
      ['economy', 14],
    ]);
    const caps = new Map<SubjectId, number>([
      ['polity', Infinity],
      ['history', Infinity],
      ['economy', Infinity],
    ]);
    const a = allocate(w, caps, 7);
    expect([...a.values()].reduce((x, y) => x + y, 0)).toBe(7);
  });
});

describe('buildQuiz', () => {
  it('returns the requested number of questions across GS and CSAT', () => {
    const qs = buildQuiz({ subjects: ['polity', 'history', 'quant', 'reasoning'], count: 30 }, emptyProgress(), []);
    expect(qs).toHaveLength(30);
    expect(new Set(qs.map((q) => q.id)).size).toBe(30);
    const subjects = new Set(qs.map((q) => q.subject));
    expect(subjects.has('quant')).toBe(true);
    expect(subjects.has('polity')).toBe(true);
  });

  it('skips current affairs when no data is loaded and still fills the quiz', () => {
    const qs = buildQuiz({ subjects: ['current', 'polity'], count: 10 }, emptyProgress(), []);
    expect(qs).toHaveLength(10);
    expect(qs.every((q) => q.subject === 'polity')).toBe(true);
  });

  it('prefers unseen questions', () => {
    let p = emptyProgress();
    const polity = STATIC_BANK.filter((q) => q.subject === 'polity');
    for (const q of polity.slice(0, polity.length - 5)) p = recordAnswer(p, q, true);
    const qs = buildQuiz({ subjects: ['polity'], count: 5 }, p, []);
    const unseen = new Set(polity.slice(-5).map((q) => q.id));
    expect(qs.every((q) => unseen.has(q.id))).toBe(true);
  });

  it('filters by topic', () => {
    const qs = buildQuiz({ subjects: ['quant'], topics: ['Clocks'], count: 5 }, emptyProgress(), []);
    expect(qs.every((q) => q.topic === 'Clocks')).toBe(true);
  });
});

describe('prepare', () => {
  it('shuffles plain options but keeps the answer pointing at the same text', () => {
    const q = STATIC_BANK.find((x) => !x.statements && !x.pairs && !x.keepOrder && !x.options.every((o) => /^\d+$/.test(o)))!;
    for (let s = 1; s < 50; s++) {
      const p = prepare(q, new Rng(s));
      expect(p.options[p.answer]).toBe(q.options[q.answer]);
      expect([...p.options].sort()).toEqual([...q.options].sort());
    }
  });

  it('leaves statement questions in the standard order', () => {
    const q = STATIC_BANK.find((x) => x.statements)!;
    expect(prepare(q, new Rng(3))).toBe(q);
  });
});

describe('daily challenge', () => {
  it('is the same for the same date', () => {
    const d = new Date('2026-10-08T10:00:00');
    expect(dailyChallenge(d).map((q) => q.id)).toEqual(dailyChallenge(d).map((q) => q.id));
    expect(dailyChallenge(d)).toHaveLength(15);
  });
});

describe('progress and spaced repetition', () => {
  const caQ: Question = { ...gsQ, id: 'ca-test-1', subject: 'current', topic: 'Economy' };

  it('adds wrong answers to box 1, promotes on correct, graduates after the last box', () => {
    let p = recordAnswer(emptyProgress(), gsQ, false, 1000);
    expect(p.review[gsQ.id]).toMatchObject({ box: 1, due: 1000 });
    expect(dueCards(p, 1000)).toEqual([gsQ.id]);
    p = recordAnswer(p, gsQ, true, 2000);
    expect(p.review[gsQ.id].box).toBe(2);
    expect(p.review[gsQ.id].due).toBe(2000 + BOX_INTERVAL_DAYS[2] * 86_400_000);
    for (let i = 0; i < 10; i++) p = recordAnswer(p, gsQ, true, 3000 + i);
    expect(p.review[gsQ.id]).toBeUndefined();
    expect(p.q[gsQ.id].seen).toBe(12);
  });

  it('stores a copy of current affairs questions so they can be reviewed later', () => {
    const p = recordAnswer(emptyProgress(), caQ, false);
    expect(p.saved[caQ.id]).toBeDefined();
    const b = toggleBookmark(emptyProgress(), caQ);
    expect(b.saved[caQ.id]).toBeDefined();
    expect(toggleBookmark(b, caQ).saved[caQ.id]).toBeUndefined();
  });

  it('counts answers per day and computes streaks', () => {
    const p = emptyProgress();
    p.daily = { [dayKey()]: 4, [daysAgo(1)]: 2, [daysAgo(2)]: 1, [daysAgo(4)]: 3 };
    expect(streakFrom(p.daily)).toBe(3);
  });

  it('normalises partial or foreign backups', () => {
    const p = normalise({ q: { x: { seen: 1, correct: 1, last: 1, lastCorrect: true } }, settings: { dailyGoal: 50 } });
    expect(p.settings.dailyGoal).toBe(50);
    expect(p.settings.theme).toBe('system');
    expect(p.bookmarks).toEqual([]);
    expect(normalise('garbage').q).toEqual({});
  });
});
