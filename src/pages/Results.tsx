import { useMemo, useState } from 'react';
import { QuestionBody } from '../components/QuestionView';
import { SUBJECT_MAP } from '../data/subjects';
import { formatDuration } from '../lib/dates';
import { scoreQuiz } from '../lib/scoring';
import { navigate } from '../router';
import { useStore } from '../store';
import type { SubjectId } from '../types';

const KEYS = ['A', 'B', 'C', 'D'];
type Filter = 'all' | 'wrong' | 'skipped';

export default function Results() {
  const { last, start } = useStore();
  const [filter, setFilter] = useState<Filter>('wrong');
  const sum = useMemo(() => (last ? scoreQuiz(last.questions, last.responses, last.negative) : null), [last]);

  if (!last || !sum) {
    return (
      <div className="card empty">
        <p>No results yet. Finish a quiz to see your score here.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go home
        </button>
      </div>
    );
  }

  const attempted = sum.correct + sum.wrong;
  const accuracy = attempted ? Math.round((sum.correct / attempted) * 100) : 0;
  const duration = last.finishedAt ? Math.round((last.finishedAt - last.startedAt) / 1000) : 0;
  const items = last.questions
    .map((q, i) => ({ q, i, r: last.responses[i] }))
    .filter(({ q, r }) => (filter === 'all' ? true : filter === 'wrong' ? r !== null && r !== q.answer : r === null));
  const wrongOnes = last.questions.filter((q, i) => last.responses[i] !== null && last.responses[i] !== q.answer);

  return (
    <div className="stack">
      <div className="card">
        <div className="spread">
          <div>
            <div className="muted small">{last.title}</div>
            <div className="big-number">
              {sum.score} <span className="muted" style={{ fontSize: '1rem', fontWeight: 600 }}>/ {sum.maxScore}</span>
            </div>
            <div className="small muted">{last.negative ? 'UPSC marking with negative marks' : 'No negative marking'}</div>
          </div>
          <div className="row">
            <button className="btn" onClick={() => navigate('/')}>
              Home
            </button>
            {wrongOnes.length > 0 && (
              <button className="btn btn-primary" onClick={() => start('Retry mistakes', 'practice', wrongOnes)}>
                Retry {wrongOnes.length} wrong
              </button>
            )}
          </div>
        </div>
        <div className="kpis" style={{ marginTop: 14 }}>
          <div className="kpi">
            <b style={{ color: 'var(--good)' }}>{sum.correct}</b>
            <span>Correct</span>
          </div>
          <div className="kpi">
            <b style={{ color: 'var(--bad)' }}>{sum.wrong}</b>
            <span>Wrong</span>
          </div>
          <div className="kpi">
            <b>{sum.skipped}</b>
            <span>Skipped</span>
          </div>
          <div className="kpi">
            <b>{accuracy}%</b>
            <span>Accuracy</span>
          </div>
          <div className="kpi">
            <b>{formatDuration(duration)}</b>
            <span>Time</span>
          </div>
        </div>
      </div>

      <div className="card stack">
        <h2>By subject</h2>
        {(Object.entries(sum.bySubject) as [SubjectId, { c: number; t: number; w: number }][]).map(([s, v]) => (
          <div className="hbar" key={s}>
            <span>{SUBJECT_MAP[s].short}</span>
            <span className="bar">
              <i style={{ width: `${(v.c / v.t) * 100}%`, background: SUBJECT_MAP[s].color }} />
            </span>
            <span className="small muted">
              {v.c}/{v.t}
            </span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="spread" style={{ marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>Answers</h2>
          <div className="seg">
            {(['wrong', 'skipped', 'all'] as Filter[]).map((f) => (
              <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f === 'wrong' ? 'Wrong' : 'Skipped'}
              </button>
            ))}
          </div>
        </div>
        {items.length === 0 && <div className="empty">Nothing here.</div>}
        {items.map(({ q, i, r }) => (
          <div className="review-item" key={`${q.id}-${i}`}>
            <div className="row" style={{ marginBottom: 6 }}>
              <span className="pill">Q{i + 1}</span>
              <span className={`tag ${r === null ? 'skip' : r === q.answer ? 'good' : 'bad'}`}>{r === null ? 'Skipped' : r === q.answer ? 'Correct' : 'Wrong'}</span>
              <span className="small muted">
                {SUBJECT_MAP[q.subject].short} · {q.topic}
              </span>
            </div>
            <details>
              <summary style={{ cursor: 'pointer' }}>{q.ask ? `${q.question} ${q.ask}` : q.question}</summary>
              <div style={{ marginTop: 8 }}>
                <QuestionBody q={q} compact />
              </div>
            </details>
            <div className="small" style={{ marginTop: 6 }}>
              {r !== null && r !== q.answer && (
                <div style={{ color: 'var(--bad)' }}>
                  Your answer: {KEYS[r]}. {q.options[r]}
                </div>
              )}
              <div style={{ color: 'var(--good)' }}>
                Correct: {KEYS[q.answer]}. {q.options[q.answer]}
              </div>
              <div className="muted" style={{ marginTop: 4 }}>
                {q.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
