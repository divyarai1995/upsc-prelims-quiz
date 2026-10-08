import { useMemo } from 'react';
import { SUBJECTS, SUBJECT_MAP } from '../data/subjects';
import { daysAgo, formatDuration, streakFrom } from '../lib/dates';
import { useCurrentAffairs } from '../lib/currentAffairs';
import { buildQuiz } from '../lib/picker';
import { useStore } from '../store';
import type { SubjectId } from '../types';
import { subjectAccuracy } from './Home';

export default function Stats() {
  const { progress, start } = useStore();
  const ca = useCurrentAffairs();
  const totals = useMemo(() => {
    let a = 0;
    let c = 0;
    for (const v of Object.values(progress.topics)) {
      a += v.a;
      c += v.c;
    }
    return { a, c, pct: a ? Math.round((c / a) * 100) : 0 };
  }, [progress.topics]);

  const days = Array.from({ length: 14 }, (_, i) => {
    const key = daysAgo(13 - i);
    return { key, n: progress.daily[key] ?? 0 };
  });
  const maxDay = Math.max(1, ...days.map((d) => d.n));

  const weak = useMemo(
    () =>
      Object.entries(progress.topics)
        .filter(([, v]) => v.a >= 3)
        .map(([k, v]) => {
          const [subject, topic] = k.split('|') as [SubjectId, string];
          return { subject, topic, a: v.a, pct: Math.round((v.c / v.a) * 100) };
        })
        .sort((x, y) => x.pct - y.pct || y.a - x.a)
        .slice(0, 8),
    [progress.topics],
  );

  const practiseTopic = (subject: SubjectId, topic: string) =>
    start(`${SUBJECT_MAP[subject].short}: ${topic}`, 'practice', buildQuiz({ subjects: [subject], topics: [topic], count: 10 }, progress, ca.data?.questions ?? []));

  return (
    <div className="stack">
      <h1>Your progress</h1>
      <div className="kpis">
        <div className="kpi">
          <b>{totals.a}</b>
          <span>Questions answered</span>
        </div>
        <div className="kpi">
          <b>{totals.pct}%</b>
          <span>Overall accuracy</span>
        </div>
        <div className="kpi">
          <b>{streakFrom(progress.daily)}</b>
          <span>Day streak</span>
        </div>
        <div className="kpi">
          <b>{progress.sessions.length}</b>
          <span>Quizzes finished</span>
        </div>
      </div>

      <div className="card">
        <h2>Last 14 days</h2>
        <div className="days" aria-label="Questions answered per day">
          {days.map((d) => (
            <div key={d.key} className={d.n ? '' : 'zero'} style={{ height: `${Math.max(3, (d.n / maxDay) * 100)}%` }} title={`${d.key}: ${d.n}`} />
          ))}
        </div>
        <div className="spread small muted" style={{ marginTop: 4 }}>
          <span>{days[0].key}</span>
          <span>Today</span>
        </div>
      </div>

      <div className="card stack">
        <h2>Accuracy by subject</h2>
        {SUBJECTS.map((s) => {
          const acc = subjectAccuracy(progress.topics, s.id);
          return (
            <div className="hbar" key={s.id}>
              <span>{s.short}</span>
              <span className="bar">
                <i style={{ width: `${acc.pct}%`, background: s.color }} />
              </span>
              <span className="small muted">{acc.a ? `${acc.pct}% · ${acc.a}` : '–'}</span>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2>Weakest topics</h2>
        {!weak.length && <div className="empty small">Answer at least 3 questions in a topic to see it here.</div>}
        {weak.map((w) => (
          <div className="review-item spread" key={`${w.subject}|${w.topic}`}>
            <div>
              <div>{w.topic}</div>
              <div className="small muted">
                {SUBJECT_MAP[w.subject].short} · {w.pct}% of {w.a}
              </div>
            </div>
            <button className="btn btn-sm" onClick={() => practiseTopic(w.subject, w.topic)}>
              Practise
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Recent quizzes</h2>
        {!progress.sessions.length && <div className="empty small">Finished quizzes appear here.</div>}
        {progress.sessions.slice(0, 15).map((s) => (
          <div className="review-item spread" key={s.id}>
            <div>
              <div>{s.title}</div>
              <div className="small muted">
                {new Date(s.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} · {s.mode} · {formatDuration(s.durationSec)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <b>
                {s.score}/{s.maxScore}
              </b>
              <div className="small muted">
                {s.correct}✓ {s.wrong}✗ {s.skipped}–
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
