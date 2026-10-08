import { useMemo, useState } from 'react';
import { prettyDate } from '../lib/dates';
import { questionsSince, useCurrentAffairs } from '../lib/currentAffairs';
import { buildQuiz } from '../lib/picker';
import { useStore } from '../store';
import { REPO_URL } from '../config';

const REPO_DOCS = `${REPO_URL}#current-affairs-updates`;

export default function CurrentAffairs() {
  const { progress, start } = useStore();
  const { data, loading, error } = useCurrentAffairs();
  const [cat, setCat] = useState<string>('All');
  const [limit, setLimit] = useState(40);

  const categories = useMemo(() => ['All', ...new Set((data?.briefs ?? []).map((b) => b.category))], [data]);
  const briefs = useMemo(() => (data?.briefs ?? []).filter((b) => cat === 'All' || b.category === cat), [data, cat]);
  const grouped = useMemo(() => {
    const m = new Map<string, typeof briefs>();
    for (const b of briefs.slice(0, limit)) m.set(b.date, [...(m.get(b.date) ?? []), b]);
    return [...m.entries()];
  }, [briefs, limit]);

  if (loading) return <div className="card empty">Loading current affairs…</div>;

  const qs = data?.questions ?? [];
  const quiz = (days: number | null, label: string) => {
    const pool = days ? questionsSince(qs, days) : qs;
    start(`Current affairs · ${label}`, 'practice', buildQuiz({ subjects: ['current'], count: Math.min(20, pool.length) }, progress, pool));
  };
  const week = questionsSince(qs, 7).length;
  const month = questionsSince(qs, 30).length;

  return (
    <div className="stack">
      <h1>Current affairs</h1>
      {error && <div className="notice">Could not load current affairs ({error}). If you are offline, open the app once online to cache it.</div>}

      <div className="card stack">
        <div className="spread">
          <div>
            <div className="big-number">{qs.length}</div>
            <div className="small muted">
              questions from the news
              {data?.index.updated ? ` · updated ${new Date(data.index.updated).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}` : ''}
            </div>
          </div>
          <div className="row">
            <button className="btn btn-sm" disabled={!week} onClick={() => quiz(7, 'last 7 days')}>
              Last 7 days ({week})
            </button>
            <button className="btn btn-sm" disabled={!month} onClick={() => quiz(30, 'last 30 days')}>
              Last 30 days ({month})
            </button>
            <button className="btn btn-sm btn-primary" disabled={!qs.length} onClick={() => quiz(null, 'all')}>
              Everything
            </button>
          </div>
        </div>
        {!qs.length && (
          <p className="small muted" style={{ margin: 0 }}>
            Questions are generated daily from news headlines by a GitHub Action using a free AI key. Headlines below still update without a key.{' '}
            <a href={REPO_DOCS} target="_blank" rel="noopener noreferrer">
              Setup guide
            </a>
          </p>
        )}
      </div>

      <div className="card">
        <h2>Daily brief</h2>
        <div className="chips" style={{ marginBottom: 10 }}>
          {categories.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        {!briefs.length && <div className="empty small">No headlines yet. They appear after the first scheduled update.</div>}
        {grouped.map(([date, items]) => (
          <div key={date}>
            <div className="section-title">{prettyDate(date)}</div>
            {items.map((b) => (
              <div className="brief" key={b.id}>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  {b.title}
                </a>
                <div className="small muted">
                  {b.source} · {b.category}
                </div>
                {b.summary && <div className="small" style={{ marginTop: 4 }}>{b.summary}</div>}
              </div>
            ))}
          </div>
        ))}
        {briefs.length > limit && (
          <button className="btn btn-block" onClick={() => setLimit((l) => l + 60)} style={{ marginTop: 10 }}>
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
