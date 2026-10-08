import type { Question, SubjectId } from '../../types';
import comprehension from './comprehension';
import economy from './economy';
import environment from './environment';
import geography from './geography';
import gk from './gk';
import history from './history';
import polity from './polity';
import reasoning from './reasoning';
import science from './science';

export const STATIC_BANK: Question[] = [
  ...polity,
  ...history,
  ...geography,
  ...economy,
  ...environment,
  ...science,
  ...gk,
  ...reasoning,
  ...comprehension,
];

export const STATIC_BY_ID = new Map(STATIC_BANK.map((q) => [q.id, q]));

export function staticFor(subject: SubjectId): Question[] {
  return STATIC_BANK.filter((q) => q.subject === subject);
}
