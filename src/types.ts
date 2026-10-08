export type Paper = 'GS' | 'CSAT';

export type SubjectId =
  | 'polity'
  | 'history'
  | 'geography'
  | 'economy'
  | 'environment'
  | 'science'
  | 'gk'
  | 'current'
  | 'quant'
  | 'reasoning'
  | 'comprehension'
  | 'di';

export interface DataTable {
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface Question {
  /** Stable id. Progress is keyed on it, so never reuse or renumber. */
  id: string;
  subject: SubjectId;
  topic: string;
  /** Stem shown first. */
  question: string;
  /** Numbered statements rendered as 1., 2., 3. */
  statements?: string[];
  /** 'ar' renders statements as Statement-I / Statement-II. */
  format?: 'ar';
  /** Match-the-pairs rows rendered as a two column table. */
  pairs?: [string, string][];
  pairHeaders?: [string, string];
  /** Data interpretation table. */
  table?: DataTable;
  /** Reading comprehension passage. */
  passage?: string;
  /** Closing line after statements or pairs, e.g. "Which of the statements given above is/are correct?" */
  ask?: string;
  options: string[];
  /** Index into options. */
  answer: number;
  explanation: string;
  difficulty?: 1 | 2 | 3;
  source?: { label: string; url?: string };
  /** ISO date (YYYY-MM-DD) for current affairs items. */
  date?: string;
  /** True for procedurally generated CSAT questions. */
  generated?: boolean;
  /** Options form a fixed sequence and must not be shuffled. */
  keepOrder?: boolean;
}

export interface Brief {
  id: string;
  date: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: string;
}

/** public/data/ca/YYYY-MM.json */
export interface CaMonth {
  month: string;
  questions: Question[];
}

/** public/data/ca/briefs-YYYY-MM.json */
export interface BriefMonth {
  month: string;
  briefs: Brief[];
}

export interface CaIndex {
  updated: string | null;
  months: { month: string; questions: number; briefs: number }[];
}
