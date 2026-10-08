import { buildOptions, fmt, numericOptions, Rng } from './rng';
import type { Generator, GenOut } from './types';

const THEMES = [
  { caption: 'Production of foodgrains in a state (lakh tonnes)', items: ['Wheat', 'Rice', 'Pulses'], unit: 'lakh tonnes' },
  { caption: 'Vehicles sold by a company (thousands)', items: ['Cars', 'Two-wheelers', 'Trucks'], unit: 'thousand' },
  { caption: 'Electricity generated in a region (TWh)', items: ['Coal', 'Solar', 'Wind'], unit: 'TWh' },
  { caption: 'Tourist arrivals in three cities (thousands)', items: ['Jaipur', 'Kochi', 'Shillong'], unit: 'thousand' },
  { caption: 'Students enrolled in three colleges', items: ['College A', 'College B', 'College C'], unit: 'students' },
];

function table(rng: Rng): GenOut {
  for (let guard = 0; guard < 500; guard++) {
    const theme = rng.pick(THEMES);
    const start = rng.int(2015, 2021);
    const years = [0, 1, 2, 3, 4].map((i) => start + i);
    const data = theme.items.map(() => years.map(() => rng.int(4, 40) * 5));
    const totals = years.map((_, y) => data.reduce((s, row) => s + row[y], 0));
    const tbl = {
      caption: theme.caption,
      headers: ['Year', ...theme.items],
      rows: years.map((yr, y) => [yr, ...data.map((row) => row[y])]),
    };
    const k = rng.int(0, 4);
    const it = rng.int(0, theme.items.length - 1);
    const name = theme.items[it];
    const row = data[it];
    if (k === 0) {
      const sum = row.reduce((a, b) => a + b, 0);
      const avg = sum / 5;
      const { options, answer } = numericOptions(rng, avg, [sum / 4, avg + 5, avg - 5, Math.max(...row) - Math.min(...row)]);
      return {
        question: 'Study the table and answer the question.',
        table: tbl,
        ask: `What is the average annual figure for ${name} over the five years?`,
        options,
        answer,
        explanation: `Sum for ${name} = ${row.join(' + ')} = ${sum}. Average = ${sum}/5 = ${fmt(avg)}.`,
        difficulty: 1,
      };
    }
    if (k === 1) {
      const i = rng.int(0, 3);
      const j = rng.int(i + 1, 4);
      if (row[j] <= row[i]) continue;
      const exact = ((row[j] - row[i]) / row[i]) * 100;
      const ans = Math.round(exact);
      const wrongBase = Math.round(((row[j] - row[i]) / row[j]) * 100);
      if (Math.abs(exact - ans) > 0.34) continue;
      const { options, answer } = numericOptions(rng, ans, [wrongBase, ans + 10, Math.max(1, ans - 8), row[j] - row[i]], (n) => `${n}%`);
      return {
        question: 'Study the table and answer the question.',
        table: tbl,
        ask: `By approximately what percentage did ${name} increase from ${years[i]} to ${years[j]}?`,
        options,
        answer,
        explanation: `Increase = ${row[j]} − ${row[i]} = ${row[j] - row[i]}. Percentage = ${row[j] - row[i]}/${row[i]} × 100 ≈ ${fmt(exact)}%, i.e. about ${ans}%. Dividing by the later value (${wrongBase}%) is the usual mistake.`,
        difficulty: 2,
      };
    }
    if (k === 2) {
      const max = Math.max(...totals);
      if (totals.filter((t) => t === max).length > 1) continue;
      const yr = years[totals.indexOf(max)];
      const { options, answer } = buildOptions(rng, String(yr), rng.shuffle(years.filter((y) => y !== yr).map(String)), () => String(rng.pick(years)));
      return {
        question: 'Study the table and answer the question.',
        table: tbl,
        ask: `In which year was the combined total of all ${theme.items.length} categories the highest?`,
        options,
        answer,
        explanation: `Yearly totals: ${years.map((y, idx) => `${y}: ${totals[idx]}`).join(', ')}. The highest is ${max} in ${yr}.`,
        difficulty: 1,
      };
    }
    if (k === 3) {
      const other = (it + 1) % theme.items.length;
      const count = years.filter((_, y) => data[it][y] > data[other][y]).length;
      const { options, answer } = numericOptions(rng, count, [0, 1, 2, 3, 4, 5].filter((c) => c !== count), (n) => String(n));
      return {
        question: 'Study the table and answer the question.',
        table: tbl,
        ask: `In how many of the five years was the figure for ${name} greater than that for ${theme.items[other]}?`,
        options,
        answer,
        explanation: `Compare year by year: ${years.map((y, idx) => `${y}: ${data[it][idx]} vs ${data[other][idx]}`).join('; ')}. ${name} is greater in ${count} year(s).`,
        difficulty: 1,
      };
    }
    const other = (it + 1) % theme.items.length;
    const sA = data[it].reduce((a, b) => a + b, 0);
    const sB = data[other].reduce((a, b) => a + b, 0);
    if (sA === sB) continue;
    const diff = Math.abs(sA - sB);
    const { options, answer } = numericOptions(rng, diff, [diff + 10, Math.max(5, diff - 15), sA, sB]);
    return {
      question: 'Study the table and answer the question.',
      table: tbl,
      ask: `What is the difference between the five-year totals of ${name} and ${theme.items[other]}?`,
      options,
      answer,
      explanation: `${name} total = ${sA}. ${theme.items[other]} total = ${sB}. Difference = ${diff}.`,
      difficulty: 1,
    };
  }
  return table(new Rng(17));
}

export const diGenerators: Generator[] = [{ key: 'table', subject: 'di', topic: 'Tables', make: table }];
