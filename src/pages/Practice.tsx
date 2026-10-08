import { useMemo, useState } from 'react';
import { SUBJECTS } from '../data/subjects';
import { staticFor } from '../data/bank';
import { generatorTopics } from '../generators';
import { useCurrentAffairs } from '../lib/currentAffairs';
import { buildQuiz } from '../lib/picker';
import { examTimeFor, type Mode } from '../lib/session';
import { formatDuration } from '../lib/dates';
import { useStore } from '../store';
import type { Paper, SubjectId } from '../types';

const COUNTS = [10, 20, 50, 100];

export default function Practice() {
  const { progress, start } = useStore();
  const ca = useCurrentAffairs();
  const caQuestions = ca.data?.questions ?? [];
  const [paper, setPaper] = useState<Paper | 'BOTH'>('GS');
  const [picked, setPicked] = useState<SubjectId[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [count, setCount] = useState(20);
  const [mode, setMode] = useState<Mode>('practice');
  const [timed, setTimed] = useState(true);
  const [negative, setNegative] = useState(progress.settings.negative);

  const visible = SUBJECTS.filter((s) => paper === 'BOTH' || s.paper === paper);
  const chosen: SubjectId[] = picked.length ? picked : visible.map((s) => s.id);

  const topicList = useMemo(() => {
    if (chosen.length !== 1) return [];
    const s = chosen[0];
    const fromBank = s === 'current' ? caQuestions.map((q) => q.topic) : staticFor(s).map((q) => q.topic);
    return [...new Set([...fromBank, ...generatorTopics(s)])].sort();
  }, [chosen, caQuestions]);

  const toggle = (s: SubjectId) => {
    setTopics([]);
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  };

  const go = () => {
    const qs = buildQuiz({ subjects: chosen, topics: topics.length ? topics : undefined, count }, progress, caQuestions);
    const title = chosen.length === 1 ? SUBJECTS.find((s) => s.id === chosen[0])!.name : paper === 'BOTH' ? 'Mixed practice' : `${paper} practice`;
    start(title, mode, qs, { timeLimitSec: mode === 'exam' && timed ? examTimeFor(qs) : null, negative });
  };

  const estimate = buildEstimate(chosen, count);

  return (
    <div className="stack">
      <h1>Custom practice</h1>

      <div className="card stack">
        <div className="field">
          <label>Paper</label>
          <div className="seg">
            {(['GS', 'CSAT', 'BOTH'] as const).map((p) => (
              <button
                key={p}
                className={paper === p ? 'on' : ''}
                onClick={() => {
                  setPaper(p);
                  setPicked([]);
                  setTopics([]);
                }}
              >
                {p === 'GS' ? 'GS Paper I' : p === 'CSAT' ? 'CSAT Paper II' : 'Both'}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Subjects {picked.length ? '' : <span className="muted small">(all selected)</span>}</label>
          <div className="chips">
            {visible.map((s) => (
              <button key={s.id} className={`chip ${picked.includes(s.id) ? 'on' : ''}`} onClick={() => toggle(s.id)}>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {topicList.length > 1 && (
          <div className="field">
            <label>Topics {topics.length ? '' : <span className="muted small">(all)</span>}</label>
            <div className="chips">
              {topicList.map((t) => (
                <button key={t} className={`chip ${topics.includes(t) ? 'on' : ''}`} onClick={() => setTopics((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t]))}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="field">
          <label>Number of questions</label>
          <div className="seg">
            {COUNTS.map((c) => (
              <button key={c} className={count === c ? 'on' : ''} onClick={() => setCount(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Mode</label>
          <div className="seg">
            <button className={mode === 'practice' ? 'on' : ''} onClick={() => setMode('practice')}>
              Practice
            </button>
            <button className={mode === 'exam' ? 'on' : ''} onClick={() => setMode('exam')}>
              Exam
            </button>
          </div>
          <span className="small muted">
            {mode === 'practice' ? 'See the answer and explanation after each question.' : 'Answer everything first, then see your score with UPSC marking.'}
          </span>
        </div>

        {mode === 'exam' && (
          <label className="toggle">
            <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
            <span>Timer at UPSC pace (about {formatDuration(estimate)} for {count} questions)</span>
          </label>
        )}
        <label className="toggle">
          <input type="checkbox" checked={negative} onChange={(e) => setNegative(e.target.checked)} />
          <span>Negative marking (one-third of the marks for a wrong answer)</span>
        </label>

        <button className="btn btn-primary btn-block" onClick={go}>
          Start {count} questions
        </button>
      </div>
    </div>
  );
}

function buildEstimate(subjects: SubjectId[], count: number): number {
  const csatShare = subjects.filter((s) => SUBJECTS.find((x) => x.id === s)!.paper === 'CSAT').length / Math.max(1, subjects.length);
  return Math.ceil((count * (72 * (1 - csatShare) + 90 * csatShare)) / 60) * 60;
}
