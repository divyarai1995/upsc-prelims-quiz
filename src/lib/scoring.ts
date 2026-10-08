import type { Question, SubjectId } from '../types';
import { MARKING, paperOf } from '../data/subjects';

export interface ScoreSummary {
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  maxScore: number;
  bySubject: Partial<Record<SubjectId, { c: number; t: number; w: number }>>;
}

/** UPSC marking: full marks for correct, one-third of the question's marks deducted for wrong, zero for skipped. */
export function scoreQuiz(questions: Question[], responses: (number | null)[], negative = true): ScoreSummary {
  const sum: ScoreSummary = { correct: 0, wrong: 0, skipped: 0, score: 0, maxScore: 0, bySubject: {} };
  questions.forEach((q, i) => {
    const m = MARKING[paperOf(q.subject)];
    const r = responses[i];
    const bs = (sum.bySubject[q.subject] ??= { c: 0, t: 0, w: 0 });
    bs.t++;
    sum.maxScore += m.correct;
    if (r === null || r === undefined) {
      sum.skipped++;
    } else if (r === q.answer) {
      sum.correct++;
      bs.c++;
      sum.score += m.correct;
    } else {
      sum.wrong++;
      bs.w++;
      if (negative) sum.score -= m.wrong;
    }
  });
  sum.score = Math.round(sum.score * 100) / 100;
  sum.maxScore = Math.round(sum.maxScore * 100) / 100;
  return sum;
}
