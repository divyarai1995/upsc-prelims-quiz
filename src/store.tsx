import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Question } from './types';
import { addSession, loadProgress, recordAnswer, saveProgress, type Progress } from './lib/progress';
import { scoreQuiz } from './lib/scoring';
import { loadActive, loadLast, newSession, saveActive, saveLast, type Mode, type QuizSession } from './lib/session';
import { navigate } from './router';

interface Store {
  progress: Progress;
  update: (fn: (p: Progress) => Progress) => void;
  session: QuizSession | null;
  setSession: (s: QuizSession | null) => void;
  last: QuizSession | null;
  start: (title: string, mode: Mode, questions: Question[], opts?: { timeLimitSec?: number | null; negative?: boolean }) => void;
  answerPractice: (index: number, option: number) => void;
  finish: () => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [session, setSessionState] = useState<QuizSession | null>(loadActive);
  const [last, setLast] = useState<QuizSession | null>(loadLast);
  const sessionRef = useRef(session);

  useEffect(() => saveProgress(progress), [progress]);

  useEffect(() => {
    const theme = progress.settings.theme;
    if (theme === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
  }, [progress.settings.theme]);

  const update = useCallback((fn: (p: Progress) => Progress) => setProgress(fn), []);

  const setSession = useCallback((s: QuizSession | null) => {
    sessionRef.current = s;
    setSessionState(s);
    saveActive(s);
  }, []);

  const start: Store['start'] = useCallback(
    (title, mode, questions, opts) => {
      if (!questions.length) return;
      setSession(newSession(title, mode, questions, { negative: progress.settings.negative, ...opts }));
      navigate('/quiz');
    },
    [progress.settings.negative, setSession],
  );

  const answerPractice = useCallback(
    (index: number, option: number) => {
      const s = sessionRef.current;
      if (!s || s.revealed[index]) return;
      const q = s.questions[index];
      setSession({
        ...s,
        responses: s.responses.map((r, i) => (i === index ? option : r)),
        revealed: s.revealed.map((r, i) => (i === index ? true : r)),
      });
      setProgress((p) => recordAnswer(p, q, option === q.answer));
    },
    [setSession],
  );

  const finish = useCallback(() => {
    const s = sessionRef.current;
    if (!s) return;
    const done: QuizSession = { ...s, finishedAt: Date.now() };
    const sum = scoreQuiz(s.questions, s.responses, s.negative);
    const bySubject: Record<string, { c: number; t: number }> = {};
    for (const [k, v] of Object.entries(sum.bySubject)) bySubject[k] = { c: v.c, t: v.t };
    setProgress((p) => {
      let next = p;
      if (s.mode === 'exam') {
        s.questions.forEach((q, i) => {
          const r = s.responses[i];
          if (r !== null) next = recordAnswer(next, q, r === q.answer);
        });
      }
      return addSession(next, {
        id: s.id,
        date: done.finishedAt!,
        title: s.title,
        mode: s.mode,
        total: s.questions.length,
        correct: sum.correct,
        wrong: sum.wrong,
        skipped: sum.skipped,
        score: sum.score,
        maxScore: sum.maxScore,
        durationSec: Math.round((done.finishedAt! - s.startedAt) / 1000),
        bySubject,
      });
    });
    setSession(null);
    saveLast(done);
    setLast(done);
    navigate('/results');
  }, [setSession]);

  const value = useMemo(
    () => ({ progress, update, session, setSession, last, start, answerPractice, finish }),
    [progress, update, session, setSession, last, start, answerPractice, finish],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside provider');
  return s;
}
