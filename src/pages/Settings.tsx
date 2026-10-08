import { useRef, useState } from 'react';
import { STATIC_BANK } from '../data/bank';
import { SUBJECTS } from '../data/subjects';
import { GENERATORS } from '../generators';
import { REPO_URL } from '../config';
import { emptyProgress, normalise, type Settings as S } from '../lib/progress';
import { useStore } from '../store';

export default function Settings() {
  const { progress, update } = useStore();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const set = <K extends keyof S>(k: K, v: S[K]) => update((p) => ({ ...p, settings: { ...p.settings, [k]: v } }));

  const exportData = () => {
    const blob = new Blob([JSON.stringify(progress, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `upsc-quiz-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importData = async (f: File) => {
    try {
      const data = normalise(JSON.parse(await f.text()));
      update(() => data);
      setMsg(`Imported ${Object.keys(data.q).length} answered questions.`);
    } catch {
      setMsg('That file could not be read as a progress backup.');
    }
  };

  const reset = () => {
    if (window.confirm('Delete all progress, mistakes and bookmarks on this device? Export a backup first if you might want it.')) {
      update(() => ({ ...emptyProgress(), settings: progress.settings }));
      setMsg('Progress cleared.');
    }
  };

  const counts = SUBJECTS.map((s) => ({ s, n: STATIC_BANK.filter((q) => q.subject === s.id).length })).filter((x) => x.n);

  return (
    <div className="stack">
      <h1>Settings</h1>
      <div className="card stack">
        <div className="field">
          <label>Theme</label>
          <div className="seg">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button key={t} className={progress.settings.theme === t ? 'on' : ''} onClick={() => set('theme', t)}>
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="goal">Daily goal (questions)</label>
          <input
            id="goal"
            type="number"
            min={5}
            max={500}
            step={5}
            value={progress.settings.dailyGoal}
            onChange={(e) => set('dailyGoal', Math.max(5, Math.min(500, Number(e.target.value) || 30)))}
            style={{ maxWidth: 140 }}
          />
        </div>
        <label className="toggle">
          <input type="checkbox" checked={progress.settings.negative} onChange={(e) => set('negative', e.target.checked)} />
          <span>Negative marking by default</span>
        </label>
      </div>

      <div className="card stack">
        <h2>Your data</h2>
        <p className="small muted" style={{ margin: 0 }}>
          Progress is stored only in this browser. Export a backup to move it to another device or keep it safe.
        </p>
        <div className="row">
          <button className="btn" onClick={exportData}>
            Export backup
          </button>
          <button className="btn" onClick={() => file.current?.click()}>
            Import backup
          </button>
          <input ref={file} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
          <button className="btn btn-danger" onClick={reset}>
            Reset progress
          </button>
        </div>
        {msg && <div className="small">{msg}</div>}
      </div>

      <div className="card">
        <h2>About</h2>
        <p className="small">
          {STATIC_BANK.length} hand-written questions:{' '}
          {counts.map(({ s, n }, i) => (
            <span key={s.id}>
              {s.short} {n}
              {i < counts.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
        <p className="small">
          {GENERATORS.length} generators produce unlimited fresh CSAT questions: {GENERATORS.map((g) => g.topic).join(', ')}.
        </p>
        <p className="small" style={{ margin: 0 }}>
          Free and open source.{' '}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            Source, setup guide and how to add questions
          </a>
          .
        </p>
      </div>
    </div>
  );
}
