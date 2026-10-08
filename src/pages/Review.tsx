import { useMemo } from 'react';
import { useCurrentAffairs } from '../lib/currentAffairs';
import { BOX_INTERVAL_DAYS, dueCards, MAX_BOX, resolveQuestion } from '../lib/progress';
import { prepare } from '../lib/picker';
import { useStore } from '../store';
import type { Question } from '../types';
import { SUBJECT_MAP } from '../data/subjects';

export default function Review() {
  const { progress, start } = useStore();
  const ca = useCurrentAffairs();
  const resolve = (ids: string[]) =>
    ids.map((id) => resolveQuestion(id, progress, ca.data?.byId)).filter((q): q is Question => !!q).map((q) => prepare(q));

  const due = useMemo(() => dueCards(progress), [progress]);
  const all = Object.keys(progress.review);
  const boxes = Array.from({ length: MAX_BOX }, (_, i) => Object.values(progress.review).filter((c) => c.box === i + 1).length);
  const nextDue = Object.values(progress.review)
    .map((c) => c.due)
    .filter((d) => d > Date.now())
    .sort((a, b) => a - b)[0];
  const bookmarks = progress.bookmarks;
  const bookmarkQs = useMemo(() => bookmarks.map((id) => resolveQuestion(id, progress, ca.data?.byId)).filter((q): q is Question => !!q), [bookmarks, progress, ca.data]);

  return (
    <div className="stack">
      <h1>Review</h1>
      <div className="card stack">
        <div className="spread">
          <div>
            <div className="big-number">{due.length}</div>
            <div className="muted small">due now · {all.length} in your mistakes deck</div>
          </div>
          <div className="row">
            <button className="btn btn-primary" disabled={!due.length} onClick={() => start('Mistakes review', 'practice', resolve(due).slice(0, 30))}>
              Review due{due.length > 30 ? ' (30)' : ''}
            </button>
            <button className="btn" disabled={!all.length} onClick={() => start('All mistakes', 'practice', resolve(all).slice(0, 50))}>
              Practise all
            </button>
          </div>
        </div>
        <p className="small muted" style={{ margin: 0 }}>
          Every wrong answer goes into box 1. Each correct review moves it up a box and spaces the next review further out ({BOX_INTERVAL_DAYS.slice(1).join(', ')} days). After box {MAX_BOX} it leaves the deck.
          {nextDue && !due.length ? ` Next card due ${new Date(nextDue).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}.` : ''}
        </p>
        <div className="kpis">
          {boxes.map((n, i) => (
            <div className="kpi" key={i}>
              <b>{n}</b>
              <span>Box {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="spread" style={{ marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>Bookmarks ({bookmarkQs.length})</h2>
          <button className="btn btn-sm" disabled={!bookmarkQs.length} onClick={() => start('Bookmarks', 'practice', bookmarkQs.map((q) => prepare(q)))}>
            Practise bookmarks
          </button>
        </div>
        {!bookmarkQs.length && <div className="empty small">Tap ☆ during a quiz to save a question here.</div>}
        {bookmarkQs.slice(0, 50).map((q) => (
          <div className="review-item" key={q.id}>
            <div className="small muted">
              {SUBJECT_MAP[q.subject].short} · {q.topic}
            </div>
            <div>{q.ask ? `${q.question} ${q.ask}` : q.question}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
