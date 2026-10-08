import type { Question, SubjectId } from '../../types';

/**
 * Authoring helpers for the static question bank.
 *
 * IDs are assigned in order (prefix-001, prefix-002, ...). Progress is stored
 * against these ids, so only ever APPEND new questions to the end of a file.
 * To retire a question, replace it with `b.skip()` so later ids do not shift.
 *
 * For statement and pair questions you mark each item true/false and the
 * helper derives the correct option, which avoids answer-key slips.
 */

const ASK_TWO = 'Which of the statements given above is/are correct?';
const ASK_MANY = 'How many of the above statements are correct?';
const ASK_PAIRS = 'How many of the pairs given above are correctly matched?';

export const OPT_TWO = ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'];
const OPT_MANY: Record<number, string[]> = {
  3: ['Only one', 'Only two', 'All three', 'None'],
  4: ['Only one', 'Only two', 'Only three', 'All four'],
};
const OPT_PAIRS: Record<number, string[]> = {
  3: ['Only one pair', 'Only two pairs', 'All three pairs', 'None of the pairs'],
  4: ['Only one pair', 'Only two pairs', 'Only three pairs', 'All four pairs'],
};
export const OPT_AR = [
  'Both Statement-I and Statement-II are correct and Statement-II explains Statement-I',
  'Both Statement-I and Statement-II are correct, but Statement-II does not explain Statement-I',
  'Statement-I is correct, but Statement-II is incorrect',
  'Statement-I is incorrect, but Statement-II is correct',
];

type Extra = Partial<Pick<Question, 'difficulty' | 'source' | 'passage' | 'keepOrder'>>;

function countAnswer(n: number, truths: boolean[]): number {
  const k = truths.filter(Boolean).length;
  if (n === 3) return k === 0 ? 3 : k - 1;
  if (n === 4) {
    if (k === 0) throw new Error('Four-item questions need at least one true item');
    return k - 1;
  }
  throw new Error(`Unsupported item count ${n}`);
}

export function bank(subject: SubjectId, prefix: string) {
  const list: Question[] = [];
  let n = 0;
  const nextId = () => `${prefix}-${String(++n).padStart(3, '0')}`;
  const push = (q: Omit<Question, 'id' | 'subject'>) => {
    list.push({ id: nextId(), subject, ...q });
  };

  return {
    list,
    /** Reserve an id for a retired question. */
    skip() {
      n++;
    },
    mcq(topic: string, question: string, options: string[], answer: number, explanation: string, extra: Extra = {}) {
      if (options.length !== 4 || answer < 0 || answer > 3) throw new Error(`Bad mcq: ${question}`);
      push({ topic, question, options, answer, explanation, ...extra });
    },
    /** Two numbered statements with the standard 1 only / 2 only / both / neither options. */
    two(topic: string, intro: string, statements: [string, string], truths: [boolean, boolean], explanation: string, extra: Extra = {}) {
      const [a, b] = truths;
      const answer = a && b ? 2 : a ? 0 : b ? 1 : 3;
      push({ topic, question: intro || 'Consider the following statements:', statements, ask: ASK_TWO, options: OPT_TWO, answer, explanation, ...extra });
    },
    /** Three or four statements, "How many of the above statements are correct?" */
    many(topic: string, intro: string, statements: string[], truths: boolean[], explanation: string, extra: Extra = {}) {
      if (statements.length !== truths.length) throw new Error(`Truth count mismatch: ${intro}`);
      push({
        topic,
        question: intro || 'Consider the following statements:',
        statements,
        ask: ASK_MANY,
        options: OPT_MANY[statements.length],
        answer: countAnswer(statements.length, truths),
        explanation,
        ...extra,
      });
    },
    /** Match the pairs, "How many of the pairs given above are correctly matched?" */
    pairs(topic: string, intro: string, headers: [string, string], pairs: [string, string][], truths: boolean[], explanation: string, extra: Extra = {}) {
      if (pairs.length !== truths.length) throw new Error(`Truth count mismatch: ${intro}`);
      push({
        topic,
        question: intro || 'Consider the following pairs:',
        pairs,
        pairHeaders: headers,
        ask: ASK_PAIRS,
        options: OPT_PAIRS[pairs.length],
        answer: countAnswer(pairs.length, truths),
        explanation,
        ...extra,
      });
    },
    /** Statement-I / Statement-II format used since Prelims 2023. answer indexes OPT_AR. */
    ar(topic: string, s1: string, s2: string, answer: number, explanation: string, extra: Extra = {}) {
      push({
        topic,
        question: 'Consider the following statements:',
        statements: [s1, s2],
        format: 'ar',
        ask: 'Which one of the following is correct in respect of the above statements?',
        options: OPT_AR,
        answer,
        explanation,
        ...extra,
      });
    },
  };
}
