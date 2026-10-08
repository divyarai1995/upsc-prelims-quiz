import { describe, expect, it } from 'vitest';
import { STATIC_BANK } from '../src/data/bank';
import { SUBJECT_MAP } from '../src/data/subjects';

describe('static question bank', () => {
  it('has unique ids', () => {
    const ids = STATIC_BANK.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every question is well formed', () => {
    for (const q of STATIC_BANK) {
      expect(SUBJECT_MAP[q.subject], q.id).toBeDefined();
      expect(q.topic.length, q.id).toBeGreaterThan(1);
      expect(q.question.length, q.id).toBeGreaterThan(5);
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, q.id).toBe(4);
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.id).toBeLessThan(4);
      expect(q.explanation.length, q.id).toBeGreaterThan(20);
      for (const o of q.options) expect(o.trim().length, q.id).toBeGreaterThan(0);
    }
  });

  it('covers every GS subject except current affairs, plus static CSAT', () => {
    const subjects = new Set(STATIC_BANK.map((q) => q.subject));
    for (const s of ['polity', 'history', 'geography', 'economy', 'environment', 'science', 'gk', 'reasoning', 'comprehension'] as const) {
      expect(subjects.has(s), s).toBe(true);
    }
  });

  it('plain multiple-choice answers are not all in one position', () => {
    const plain = STATIC_BANK.filter((q) => !q.statements && !q.pairs && !q.keepOrder);
    const counts = [0, 0, 0, 0];
    for (const q of plain) counts[q.answer]++;
    // Positions are shuffled at quiz time, but the authored spread should not be lopsided either.
    expect(Math.max(...counts) / plain.length).toBeLessThan(0.6);
  });
});
