// Prompting and validation for AI-written current affairs questions.

export const TOPICS = [
  'Polity & Governance',
  'Economy',
  'Environment',
  'Science & Tech',
  'International Relations',
  'Schemes & Initiatives',
  'Geography',
  'Defence & Security',
  'Health',
  'Culture & Heritage',
  'Reports & Indices',
];

export const SYSTEM_PROMPT = `You write multiple-choice questions for India's UPSC Civil Services Preliminary Examination (General Studies Paper I), in the style of recent papers.

Rules:
- Base every question on one of the numbered news items. Use only facts stated in that item, plus widely established static background knowledge (for example which ministry handles a subject, a constitutional article, or where a place is).
- Never invent figures, names, dates or rankings that are not in the item.
- Skip items that are opinion, sport results, crime or celebrity news.
- Each question has exactly 4 options and exactly one correct answer.
- Mix formats: direct questions, "Consider the following statements" with 2 or 3 numbered statements, and match-the-pair style written as statements. For statement questions put the statements in "statements" and the closing line in "ask" (for example "How many of the above statements are correct?" with options "Only one", "Only two", "All three", "None").
- Vary which option is correct.
- The explanation must say why the answer is right, quoting the fact from the news item, in 1 to 3 sentences.
- Reply with JSON only, no prose.`;

export function userPrompt(items, count) {
  const list = items.map((it, i) => `[${i}] (${it.date}, ${it.source}) ${it.title}${it.summary ? ` — ${it.summary}` : ''}`).join('\n');
  return `News items:
${list}

Write up to ${count} questions from the most exam-relevant items, at most one or two per item.

Return exactly this JSON shape:
{"questions":[{"item":0,"topic":"one of: ${TOPICS.join(' | ')}","question":"...","statements":["..."],"ask":"...","options":["...","...","...","..."],"answer":0,"explanation":"..."}]}
"statements" and "ask" are optional. "answer" is the 0-based index of the correct option.`;
}

const str = (v, min = 1) => typeof v === 'string' && v.trim().length >= min;

/**
 * Returns a clean question object or null if the model output is unusable.
 * @returns {null | { subject: string, topic: string, question: string, statements?: string[], ask?: string, options: string[], answer: number, explanation: string, date: string, source: { label: string, url: string } }}
 */
export function validateQuestion(raw, items) {
  if (!raw || typeof raw !== 'object') return null;
  const item = items[Number(raw.item)];
  if (!item) return null;
  if (!str(raw.question, 12) || !str(raw.explanation, 20)) return null;
  if (!Array.isArray(raw.options) || raw.options.length !== 4 || !raw.options.every((o) => str(o))) return null;
  const options = raw.options.map((o) => o.trim());
  if (new Set(options.map((o) => o.toLowerCase())).size !== 4) return null;
  const answer = Number(raw.answer);
  if (!Number.isInteger(answer) || answer < 0 || answer > 3) return null;
  let statements;
  if (raw.statements !== undefined && raw.statements !== null) {
    if (!Array.isArray(raw.statements) || raw.statements.length > 5 || !raw.statements.every((s) => str(s, 5))) return null;
    statements = raw.statements.length ? raw.statements.map((s) => s.trim().replace(/^\d+[.)]\s*/, '')) : undefined;
  }
  const topic = TOPICS.includes(raw.topic) ? raw.topic : item.category && TOPICS.includes(item.category) ? item.category : 'Current Affairs';
  /** @type {any} */
  const q = {
    subject: 'current',
    topic,
    question: raw.question.trim(),
    options,
    answer,
    explanation: raw.explanation.trim(),
    date: item.date,
    source: { label: item.source, url: item.url },
  };
  if (statements) {
    q.statements = statements;
    q.ask = str(raw.ask, 5) ? raw.ask.trim() : 'Which of the statements given above is/are correct?';
  } else if (str(raw.ask, 5)) {
    q.ask = raw.ask.trim();
  }
  return q;
}
