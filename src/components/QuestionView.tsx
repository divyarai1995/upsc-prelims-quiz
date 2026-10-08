import type { Question } from '../types';
import { SUBJECT_MAP } from '../data/subjects';

const KEYS = ['A', 'B', 'C', 'D'];
const ROMAN = ['I', 'II', 'III', 'IV'];

interface Props {
  q: Question;
  selected: number | null;
  /** Show correct and wrong highlighting plus explanation. */
  reveal: boolean;
  onSelect?: (i: number) => void;
  compact?: boolean;
}

export function QuestionBody({ q, compact }: { q: Question; compact?: boolean }) {
  return (
    <>
      {q.passage && (
        <details className="passage" open={!compact}>
          <summary>Passage</summary>
          <p style={{ marginTop: 8, marginBottom: 0 }}>{q.passage}</p>
        </details>
      )}
      <div className="q-stem">{q.question}</div>
      {q.statements && (
        <ol className="q-statements">
          {q.statements.map((s, i) => (
            <li key={i}>
              <b>{q.format === 'ar' ? `Statement-${ROMAN[i]}:` : `${i + 1}.`}</b>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      )}
      {q.pairs && (
        <div className="table-wrap">
          <table className="data">
            {q.pairHeaders && (
              <thead>
                <tr>
                  <th />
                  <th>{q.pairHeaders[0]}</th>
                  <th>{q.pairHeaders[1]}</th>
                </tr>
              </thead>
            )}
            <tbody>
              {q.pairs.map(([a, b], i) => (
                <tr key={i}>
                  <td>{i + 1}.</td>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {q.table && (
        <div className="table-wrap">
          <table className="data">
            {q.table.caption && <caption>{q.table.caption}</caption>}
            <thead>
              <tr>
                {q.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {q.table.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {q.ask && <div className="q-ask">{q.ask}</div>}
    </>
  );
}

export function Explanation({ q, selected }: { q: Question; selected: number | null }) {
  const right = selected === q.answer;
  return (
    <div className="explain" role="status">
      <div className={`verdict ${selected === null ? '' : right ? 'good' : 'bad'}`}>
        {selected === null ? `Answer: ${KEYS[q.answer]}` : right ? 'Correct' : `Incorrect. Answer: ${KEYS[q.answer]}`}
      </div>
      <div>{q.explanation}</div>
      {q.source && (
        <div className="small muted" style={{ marginTop: 6 }}>
          Source:{' '}
          {q.source.url ? (
            <a href={q.source.url} target="_blank" rel="noopener noreferrer">
              {q.source.label}
            </a>
          ) : (
            q.source.label
          )}
        </div>
      )}
    </div>
  );
}

export function QuestionView({ q, selected, reveal, onSelect, compact }: Props) {
  const meta = SUBJECT_MAP[q.subject];
  return (
    <div>
      <div className="row" style={{ marginBottom: 10 }}>
        <span className="pill" style={{ color: meta.color }}>
          {meta.short}
        </span>
        <span className="pill">{q.topic}</span>
        {q.date && <span className="pill">{q.date}</span>}
      </div>
      <QuestionBody q={q} compact={compact} />
      <div className="options" role="radiogroup">
        {q.options.map((o, i) => {
          let cls = 'option';
          if (reveal) {
            if (i === q.answer) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          } else if (i === selected) cls += ' selected';
          return (
            <button
              key={i}
              className={cls}
              role="radio"
              aria-checked={i === selected}
              disabled={reveal || !onSelect}
              onClick={() => onSelect?.(i)}
            >
              <span className="key">{KEYS[i]}</span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      {reveal && <Explanation q={q} selected={selected} />}
    </div>
  );
}
