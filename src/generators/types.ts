import type { Question, SubjectId } from '../types';
import type { Rng } from './rng';

export type GenOut = Pick<Question, 'question' | 'options' | 'answer' | 'explanation'> &
  Partial<Pick<Question, 'statements' | 'table' | 'ask' | 'difficulty'>>;

export interface Generator {
  key: string;
  subject: Extract<SubjectId, 'quant' | 'reasoning' | 'di'>;
  topic: string;
  make(rng: Rng): GenOut;
}
