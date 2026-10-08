import { useCallback, useEffect, useState } from 'react';
import { QuestionView } from '../components/QuestionView';
import { formatDuration } from '../lib/dates';
import { toggleBookmark } from '../lib/progress';
import { navigate } from '../router';
import { useStore } from '../store';

export default function Quiz() {
  const { session, setSession, answerPractice, finish, progress, update } = useStore();
  const [showPalette, setShowPalette] = useState(false);
  const [now, setNow] = useState(Date.now());

  const timeLeft = session?.timeLimitSec ? Math.max(0, session.timeLimitSec - Math.floor((now - session.startedAt) / 1000)) : null;

  useEffect(() => {
    if (!session?.timeLimitSec) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [session?.timeLimitSec]);

  useEffect(() => {
    if (timeLeft === 0) finish();
  }, [timeLeft, finish]);

  const go = useCallback(
    (i: number) => {
      if (!session) return;
      const idx = Math.max(0, Math.min(session.questions.length - 1, i));
      setSession({ ...session, current: idx });
      window.scrollTo(0, 0);
    },
    [session, setSession],
  );

  const select = useCallback(
    (opt: number) => {
      if (!session) return;
      const i = session.current;
      if (session.mode === 'practice') {
        answerPractice(i, opt);
      } else {
        const same = session.responses[i] === opt;
        setSession({ ...session, responses: session.responses.map((r, j) => (j === i ? (same ? null : opt) : r)) });
      }
    },
    [session, answerPractice, setSession],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!session || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const map: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
      if (k in map) select(map[k]);
      else if (k === 'arrowright' || k === 'enter') {
        if (session.current < session.questions.length - 1) go(session.current + 1);
      } else if (k === 'arrowleft') go(session.current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [session, select, go]);

  if (!session) {
    return (
      <div className="card empty">
        <p>No quiz in progress.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go home
        </button>
      </div>
    );
  }

  const i = session.current;
  const q = session.questions[i];
  const total = session.questions.length;
  const selected = session.responses[i];
  const revealed = session.mode === 'practice' && session.revealed[i];
  const answered = session.responses.filter((r) => r !== null).length;
  const last = i === total - 1;
  const bookmarked = progress.bookmarks.includes(q.id);

  const submit = () => {
    const unanswered = total - answered;
    const msg = unanswered ? `${unanswered} question(s) unanswered. Submit anyway?` : 'Submit and see your score?';
    if (window.confirm(msg)) finish();
  };

  const quit = () => {
    if (window.confirm('Finish this quiz now? Your answers so far will be scored.')) finish();
  };

  return (
    <div>
      <div className="quiz-head">
        <strong>{session.title}</strong>
        <span className="pill">
          {i + 1} / {total}
        </span>
        {timeLeft !== null && <span className={`pill timer ${timeLeft < 300 ? 'low' : ''}`}>{formatDuration(timeLeft)}</span>}
        <span style={{ marginLeft: 'auto' }} />
        <button className={`star ${bookmarked ? 'on' : ''}`} title={bookmarked ? 'Remove bookmark' : 'Bookmark'} aria-label="Bookmark" onClick={() => update((p) => toggleBookmark(p, q))}>
          {bookmarked ? '★' : '☆'}
        </button>
        <button className="btn btn-sm btn-ghost" onClick={quit}>
          Finish
        </button>
      </div>
      <div className="progress-line">
        <i style={{ width: `${((session.mode === 'practice' ? session.revealed.filter(Boolean).length : answered) / total) * 100}%` }} />
      </div>

      <div className="card">
        <QuestionView q={q} selected={selected} reveal={revealed} onSelect={revealed ? undefined : select} />

        <div className="quiz-actions">
          <button className="btn" onClick={() => go(i - 1)} disabled={i === 0}>
            Previous
          </button>
          {session.mode === 'exam' && (
            <button className="btn" onClick={() => setSession({ ...session, marked: session.marked.map((m, j) => (j === i ? !m : m)) })}>
              {session.marked[i] ? 'Unmark' : 'Mark for review'}
            </button>
          )}
          <span className="grow" />
          {last ? (
            <button className="btn btn-primary" onClick={session.mode === 'exam' ? submit : finish} disabled={session.mode === 'practice' && !revealed}>
              {session.mode === 'exam' ? 'Submit' : 'See results'}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => go(i + 1)} disabled={session.mode === 'practice' && !revealed}>
              {session.mode === 'practice' ? 'Next' : selected === null ? 'Skip' : 'Save & next'}
            </button>
          )}
        </div>
        {session.mode === 'practice' && !revealed && (
          <div className="small muted" style={{ marginTop: 10 }}>
            Not sure? Leaving it is free in the real exam. Here, pick your best guess to see the explanation. Keys: <kbd>A</kbd>–<kbd>D</kbd>, <kbd>→</kbd> next.
          </div>
        )}
      </div>

      {session.mode === 'exam' && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="spread">
            <span className="small muted">
              {answered} answered · {session.marked.filter(Boolean).length} marked · {total - answered} left
            </span>
            <div className="row">
              <button className="btn btn-sm" onClick={() => setShowPalette((s) => !s)}>
                {showPalette ? 'Hide' : 'Show'} question palette
              </button>
              <button className="btn btn-sm btn-primary" onClick={submit}>
                Submit
              </button>
            </div>
          </div>
          {showPalette && (
            <div className="palette" style={{ marginTop: 12 }}>
              {session.questions.map((_, j) => (
                <button
                  key={j}
                  className={[session.marked[j] ? 'marked' : session.responses[j] !== null ? 'answered' : '', j === i ? 'current' : ''].join(' ')}
                  onClick={() => go(j)}
                >
                  {j + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
