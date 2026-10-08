import { useMemo } from 'react';
import { CSAT_SUBJECTS, GS_SUBJECTS, SUBJECTS } from '../data/subjects';
import { STATIC_BANK } from '../data/bank';
import { GENERATORS } from '../generators';
import { dayKey, streakFrom } from '../lib/dates';
import { buildQuiz, dailyChallenge } from '../lib/picker';
import { dueCards, resolveQuestion } from '../lib/progress';
import { questionsSince, useCurrentAffairs } from '../lib/currentAffairs';
import { navigate } from '../router';
import { useStore } from '../store';
import type { SubjectId } from '../types';

export function subjectAccuracy(topics: Record<string, { a: number; c: number }>, s: SubjectId) {
  let a = 0;
  let c = 0;
  for (const [k, v] of Object.entries(topics)) {
    if (k.startsWith(`${s}|`)) {
      a += v.a;
      c += v.c;
    }
  }
  return { a, c, pct: a ? Math.round((c / a) * 100) : 0 };
}

export default function Home() {
  const { progress, start, session } = useStore();
  const ca = useCurrentAffairs();
  const caQuestions = ca.data?.questions ?? [];
  const today = progress.daily[dayKey()] ?? 0;
  const goal = progress.settings.dailyGoal;
  const pct = Math.min(100, Math.round((today / goal) * 100));
  const streak = streakFrom(progress.daily);
  const due = useMemo(() => dueCards(progress), [progress]);

  const quick = () => start('Quick 10', 'practice', buildQuiz({ subjects: [...GS_SUBJECTS, ...CSAT_SUBJECTS], count: 10 }, progress, caQuestions));
  const gsMock = () => {
    const qs = buildQuiz({ subjects: GS_SUBJECTS, count: 100 }, progress, caQuestions);
    start('GS Paper I mock', 'exam', qs, { timeLimitSec: 7200 });
  };
  const csatMock = () => {
    const qs = buildQuiz({ subjects: CSAT_SUBJECTS, count: 80 }, progress, caQuestions);
    start('CSAT Paper II mock', 'exam', qs, { timeLimitSec: 7200 });
  };
  const daily = () => start(`Daily 15 · ${dayKey()}`, 'practice', dailyChallenge());
  const caQuiz = () => {
    const recent = questionsSince(caQuestions, 30);
    const pool = recent.length >= 10 ? recent : caQuestions;
    start('Current affairs', 'practice', buildQuiz({ subjects: ['current'], count: Math.min(15, pool.length) }, progress, pool));
  };
  const reviewDue = () => {
    const qs = due.map((id) => resolveQuestion(id, progress, ca.data?.byId)).filter((q): q is NonNullable<typeof q> => !!q);
    start('Mistakes review', 'practice', qs.slice(0, 30));
  };
  const subject = (s: SubjectId) => {
    const name = SUBJECTS.find((x) => x.id === s)!.name;
    start(name, 'practice', buildQuiz({ subjects: [s], count: 10 }, progress, caQuestions));
  };

  return (
    <div className="stack">
      {session && !session.finishedAt && (
        <div className="notice spread">
          <span>
            Unfinished quiz: <b>{session.title}</b> ({session.responses.filter((r) => r !== null).length}/{session.questions.length} answered)
          </span>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/quiz')}>
            Resume
          </button>
        </div>
      )}

      <div className="card hero">
        <div className="spread" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ marginBottom: 4 }}>Ready for today’s practice?</h1>
            <p className="muted" style={{ marginBottom: 14 }}>
              {today} of {goal} questions today{streak > 1 ? ` · ${streak}-day streak` : ''}
            </p>
          </div>
          <div className="ring" style={{ ['--p' as string]: pct }} data-label={`${pct}%`} />
        </div>
        <button className="btn" onClick={quick}>
          Start a random 10-question quiz
        </button>
      </div>

      <div className="section-title">Modes</div>
      <div className="grid">
        <button className="tile" onClick={daily}>
          <strong>Daily 15</strong>
          <span>Same mixed set for everyone today: 10 GS + 5 CSAT</span>
        </button>
        <button className="tile" onClick={reviewDue} disabled={!due.length}>
          <strong>Review mistakes {due.length ? `(${due.length})` : ''}</strong>
          <span>{due.length ? 'Spaced repetition of questions you got wrong' : 'Nothing due. Wrong answers land here.'}</span>
        </button>
        <button className="tile" onClick={caQuiz} disabled={!caQuestions.length}>
          <strong>Current affairs quiz</strong>
          <span>{caQuestions.length ? `${caQuestions.length} questions from recent news` : 'Updates daily once the news job runs'}</span>
        </button>
        <button className="tile" onClick={gsMock}>
          <strong>GS Paper I mock</strong>
          <span>100 questions · 2 hours · +2 / −0.66</span>
        </button>
        <button className="tile" onClick={csatMock}>
          <strong>CSAT Paper II mock</strong>
          <span>80 questions · 2 hours · +2.5 / −0.83</span>
        </button>
        <button className="tile" onClick={() => navigate('/practice')}>
          <strong>Custom practice</strong>
          <span>Pick subjects, topics, length and timer</span>
        </button>
      </div>

      <div className="section-title">Subjects</div>
      <div className="grid-tight">
        {SUBJECTS.map((s) => {
          const acc = subjectAccuracy(progress.topics, s.id);
          const disabled = s.id === 'current' && !caQuestions.length;
          return (
            <button key={s.id} className="subject" onClick={() => subject(s.id)} disabled={disabled}>
              <span className="subject-head">
                <span className="dot" style={{ background: s.color }} />
                {s.short}
                <span className="pill" style={{ marginLeft: 'auto' }}>
                  {s.paper}
                </span>
              </span>
              <span className="bar">
                <i style={{ width: `${acc.pct}%`, background: s.color }} />
              </span>
              <span className="small muted">{acc.a ? `${acc.pct}% of ${acc.a} correct` : s.blurb}</span>
            </button>
          );
        })}
      </div>

      <p className="small muted" style={{ marginTop: 12 }}>
        {STATIC_BANK.length} hand-written questions, {GENERATORS.length} generators that create unlimited fresh CSAT problems
        {caQuestions.length ? `, and ${caQuestions.length} current affairs questions` : ''}.
        {ca.data?.index.updated ? ` News last updated ${new Date(ca.data.index.updated).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}.` : ''}
      </p>
    </div>
  );
}
