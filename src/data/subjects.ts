import type { Paper, SubjectId } from '../types';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  short: string;
  paper: Paper;
  /** Relative share in a random mixed paper, based on recent Prelims trends. */
  weight: number;
  color: string;
  blurb: string;
}

export const SUBJECTS: SubjectMeta[] = [
  { id: 'polity', name: 'Polity & Governance', short: 'Polity', paper: 'GS', weight: 15, color: '#2563eb', blurb: 'Constitution, Parliament, judiciary, federalism, bodies' },
  { id: 'history', name: 'History & Culture', short: 'History', paper: 'GS', weight: 15, color: '#b45309', blurb: 'Ancient, medieval, modern India, art and culture' },
  { id: 'geography', name: 'Geography', short: 'Geography', paper: 'GS', weight: 11, color: '#0d9488', blurb: 'Physical, Indian and world geography' },
  { id: 'economy', name: 'Economy', short: 'Economy', paper: 'GS', weight: 14, color: '#7c3aed', blurb: 'Banking, fiscal policy, external sector, schemes' },
  { id: 'environment', name: 'Environment & Ecology', short: 'Environment', paper: 'GS', weight: 15, color: '#16a34a', blurb: 'Ecology, biodiversity, protected areas, climate' },
  { id: 'science', name: 'Science & Technology', short: 'Sci-Tech', paper: 'GS', weight: 10, color: '#db2777', blurb: 'Space, biotech, health, defence, emerging tech' },
  { id: 'gk', name: 'GK & Static Affairs', short: 'GK', paper: 'GS', weight: 8, color: '#ca8a04', blurb: 'Organisations, reports, indices, firsts' },
  { id: 'current', name: 'Current Affairs', short: 'Current', paper: 'GS', weight: 12, color: '#dc2626', blurb: 'Auto-updated daily from news feeds' },
  { id: 'quant', name: 'Basic Numeracy', short: 'Quant', paper: 'CSAT', weight: 30, color: '#0891b2', blurb: 'Fresh generated problems every time' },
  { id: 'reasoning', name: 'Logical Reasoning', short: 'Reasoning', paper: 'CSAT', weight: 22, color: '#4f46e5', blurb: 'Arrangements, directions, coding, syllogisms' },
  { id: 'comprehension', name: 'Reading Comprehension', short: 'RC', paper: 'CSAT', weight: 20, color: '#9333ea', blurb: 'Passages with inference questions' },
  { id: 'di', name: 'Data Interpretation', short: 'DI', paper: 'CSAT', weight: 8, color: '#059669', blurb: 'Tables with fresh numbers every time' },
];

export const SUBJECT_MAP = Object.fromEntries(SUBJECTS.map((s) => [s.id, s])) as Record<SubjectId, SubjectMeta>;

export const GS_SUBJECTS = SUBJECTS.filter((s) => s.paper === 'GS').map((s) => s.id);
export const CSAT_SUBJECTS = SUBJECTS.filter((s) => s.paper === 'CSAT').map((s) => s.id);

/** UPSC marking: GS +2 / -1/3 of 2; CSAT +2.5 / -1/3 of 2.5. */
export const MARKING: Record<Paper, { correct: number; wrong: number }> = {
  GS: { correct: 2, wrong: 2 / 3 },
  CSAT: { correct: 2.5, wrong: 2.5 / 3 },
};

export function paperOf(subject: SubjectId): Paper {
  return SUBJECT_MAP[subject].paper;
}
