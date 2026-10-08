import { useEffect, useState } from 'react';
import type { Brief, BriefMonth, CaIndex, CaMonth, Question } from '../types';

export interface CaData {
  index: CaIndex;
  questions: Question[];
  briefs: Brief[];
  byId: Map<string, Question>;
}

const BASE = import.meta.env.BASE_URL;
/** UPSC tends to ask about the 12 to 18 months before the exam. */
const QUESTION_MONTHS = 18;
const BRIEF_MONTHS = 2;
let cache: Promise<CaData> | null = null;

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function loadCurrentAffairs(): Promise<CaData> {
  if (!cache) {
    cache = (async () => {
      const index = await getJson<CaIndex>('data/ca/index.json');
      const [qMonths, bMonths] = await Promise.all([
        Promise.all(
          index.months
            .filter((m) => m.questions > 0)
            .slice(0, QUESTION_MONTHS)
            .map((m) => getJson<CaMonth>(`data/ca/${m.month}.json`).catch(() => null)),
        ),
        Promise.all(
          index.months
            .filter((m) => m.briefs > 0)
            .slice(0, BRIEF_MONTHS)
            .map((m) => getJson<BriefMonth>(`data/ca/briefs-${m.month}.json`).catch(() => null)),
        ),
      ]);
      const questions = qMonths.flatMap((m) => m?.questions ?? []).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
      const briefs = bMonths.flatMap((m) => m?.briefs ?? []).sort((a, b) => b.date.localeCompare(a.date));
      return { index, questions, briefs, byId: new Map(questions.map((q) => [q.id, q])) };
    })();
    cache.catch(() => {
      cache = null;
    });
  }
  return cache;
}

export function useCurrentAffairs() {
  const [state, setState] = useState<{ data?: CaData; error?: string; loading: boolean }>({ loading: true });
  useEffect(() => {
    let live = true;
    loadCurrentAffairs()
      .then((data) => live && setState({ data, loading: false }))
      .catch((e: Error) => live && setState({ error: e.message, loading: false }));
    return () => {
      live = false;
    };
  }, []);
  return state;
}

export function questionsSince(questions: Question[], days: number): Question[] {
  const cutoff = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  return questions.filter((q) => (q.date ?? '') >= cutoff);
}
