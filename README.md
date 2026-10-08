# Prelims Practice

A free web app for UPSC Civil Services Prelims practice. It quizzes you at random across every GS and CSAT area, tracks weak topics, brings mistakes back with spaced repetition, and pulls in current affairs every day.

**Live app:** https://divyarai1995.github.io/upsc-prelims-quiz/ (after the one-time setup below)

Everything runs on free services: GitHub Pages hosts the app, GitHub Actions runs the daily news job, and Google's Gemini free tier writes the current affairs questions. Progress stays in your browser. There is no server, account or login.

## What it does

| Area | How questions are produced |
| --- | --- |
| Polity, History and Culture, Geography, Economy, Environment, Science and Tech, GK | ~316 hand-written questions in UPSC formats: direct MCQs, "how many statements are correct", match the pairs, Statement-I / Statement-II |
| Current affairs | Written daily from PIB, The Hindu, Indian Express Explained and Google News, each linked to its source |
| CSAT numeracy, reasoning, data interpretation | 24 generators that build a new problem every time: series, percentages, profit and loss, interest, time and work, speed and distance, ratios, averages, ages, clocks, calendars, P&C, probability, alligation, LCM/HCF, unit digits, directions, coding-decoding, alphabet tests, ranking, seating arrangements (solver-checked), blood relations, odd one out, data tables |
| Reading comprehension, syllogisms, decision making | Hand-written passages and logic questions |

Modes:

- **Quick 10**: random mix of GS and CSAT, weighted like the real paper
- **Daily 15**: the same 10 GS + 5 CSAT set for everyone on a given day
- **Custom practice**: pick paper, subjects, topics, length, practice or exam mode, timer, negative marking
- **GS Paper I mock**: 100 questions, 2 hours, +2 / −0.66
- **CSAT Paper II mock**: 80 questions, 2 hours, +2.5 / −0.83
- **Review mistakes**: every wrong answer enters a Leitner deck and returns after 1, 3, 7, 14 and 30 days
- **Bookmarks**, **subject and topic accuracy**, **weakest topics**, **daily goal and streak**
- Works offline after the first visit and can be installed on a phone home screen

The picker favours questions you have not seen, then ones you got wrong, then ones you have not seen for a while.

## One-time setup

1. **Turn on GitHub Pages.** Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Add a free AI key (for daily current affairs questions).**
   - Create a key at https://aistudio.google.com/apikey (free, no card needed).
   - Repo **Settings → Secrets and variables → Actions → New repository secret**. Name: `LLM_API_KEY`. Value: the key.
3. **Run it once.** **Actions → Update and deploy → Run workflow**. After it finishes, the app is live at the URL above.

From then on the workflow runs every day at 06:15 IST, adds the day's headlines and about 10 new questions, and redeploys.

Without a key the app still works fully. The news job stores headlines as a daily brief but writes no questions.

### Using a different free AI provider

The job talks to any OpenAI-compatible API. Add these under **Settings → Secrets and variables → Actions → Variables**:

| Provider | `LLM_BASE_URL` | `LLM_MODEL` (example) |
| --- | --- | --- |
| Google Gemini (default) | leave unset | leave unset, or e.g. `gemini-2.5-flash` |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b-versatile` |
| OpenRouter | `https://openrouter.ai/api/v1` | any model tagged `:free` |

Put that provider's key in the `LLM_API_KEY` secret. Optional variable `CA_QUESTIONS` sets questions per day (default 10). One request a day stays well inside every free tier. Check each provider's current limits before relying on them.

### News sources

Edit `scripts/sources.json` to add or remove RSS feeds. A feed that fails is skipped and logged; the rest still run. Items are kept only if they are recent (48 hours) and score as exam-relevant on keyword rules in `scripts/lib/relevance.mjs`.

## Accuracy

The hand-written bank sticks to stable, well-established facts and every answer key is derived from per-statement true/false marks, which avoids key slips. AI-written current affairs questions only see the headline and summary, so they can be wrong. Each one links to its source: check it when something looks off. Report errors through an issue.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # generator, bank, scoring, picker and news pipeline tests
npm run build
LLM_API_KEY=... npm run update-ca   # run the news job by hand
```

## Adding questions

Questions live in `src/data/bank/*.ts`. Use the helpers so the answer is computed from what you mark true or false:

```ts
b.two('Parliament', 'Consider the following statements:', [
  'The Rajya Sabha is a permanent body.',
  'A Money Bill can be introduced in the Rajya Sabha.',
], [true, false], 'Explanation shown after answering.');

b.pairs('Protected Areas', 'Consider the following pairs:', ['Park', 'State'], [
  ['Kaziranga', 'Assam'],
  ['Bandipur', 'Kerala'],
  ['Gir', 'Gujarat'],
], [true, false, true], 'Bandipur is in Karnataka.');
```

Also available: `b.mcq`, `b.many` (3 or 4 statements, "how many are correct"), `b.ar` (Statement-I / Statement-II). Ids are assigned in order, and progress is saved against them, so **only append** to a file. Use `b.skip()` to retire a question without shifting later ids. `npm test` validates the whole bank.

New CSAT problem types go in `src/generators/`. Each generator takes a seeded RNG and returns a question; the tests run every generator 400 times and check it is well formed.

## Project layout

```
src/
  data/bank/          hand-written questions per subject
  data/subjects.ts    subjects, paper weights, UPSC marking
  generators/         CSAT question generators (seeded, reproducible)
  lib/                picker, scoring, progress + spaced repetition, current affairs loader
  pages/              Home, Practice, Quiz, Results, Review, News, Stats, Settings
scripts/
  update-current-affairs.mjs   daily news job (no dependencies)
  sources.json                 RSS feeds
public/data/ca/       generated current affairs data (committed by the workflow)
.github/workflows/    deploy.yml (daily update + Pages deploy), ci.yml (pull requests)
```

## Your data

Progress, mistakes and bookmarks are stored in `localStorage` on your device. Use **Settings → Export backup** to move them to another browser or keep a copy.

## License

MIT
