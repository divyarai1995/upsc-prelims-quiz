import { describe, expect, it } from 'vitest';
import { fromGeneratedId, generate, GENERATORS } from '../src/generators';

const SEEDS = Array.from({ length: 400 }, (_, i) => i * 7919 + 13);

describe('generators', () => {
  for (const g of GENERATORS) {
    it(`${g.key} builds well-formed questions`, () => {
      for (const seed of SEEDS) {
        const q = generate(g.key, seed);
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(4);
        const text = JSON.stringify(q);
        expect(text).not.toMatch(/NaN|undefined|Infinity|\[object/);
        expect(q.explanation.length).toBeGreaterThan(10);
      }
    });

    it(`${g.key} is deterministic per seed`, () => {
      expect(generate(g.key, 12345)).toEqual(generate(g.key, 12345));
      expect(fromGeneratedId(`gen:${g.key}:12345`)).toEqual(generate(g.key, 12345));
    });
  }

  it('clock answers match the hand-angle formula', () => {
    for (const seed of SEEDS) {
      const q = generate('clock', seed);
      const [, h, m] = /at (\d+):(\d+)/.exec(q.question)!.map(Number);
      const raw = Math.abs(30 * h - 5.5 * m) % 360;
      const expected = Math.min(raw, 360 - raw);
      expect(parseFloat(q.options[q.answer])).toBeCloseTo(expected, 5);
    }
  });

  it('calendar answers match the JS Date weekday', () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (const seed of SEEDS) {
      const q = generate('calendar', seed);
      const m = /what day of the week was (\d+) (\w+) (\d+)\?/.exec(q.question)!;
      const d = new Date(`${m[2]} ${m[1]}, ${m[3]} 00:00:00 UTC`);
      expect(q.options[q.answer]).toBe(days[d.getUTCDay()]);
    }
  });

  it('series answers continue the pattern for arithmetic cases', () => {
    for (const seed of SEEDS) {
      const q = generate('series', seed);
      const nums = q.question.replace(/[^0-9,\s]/g, '').split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n) && n !== 0);
      const d = nums.slice(1).map((n, i) => n - nums[i]);
      if (d.every((x) => x === d[0])) {
        expect(Number(q.options[q.answer].replace(/,/g, ''))).toBe(nums[nums.length - 1] + d[0]);
      }
    }
  });

  it('time and work answers are consistent', () => {
    for (const seed of SEEDS) {
      const q = generate('work', seed);
      const nums = (q.question.match(/\d+/g) ?? []).map(Number);
      const ans = Number(q.options[q.answer].split(' ')[0]);
      if (q.question.startsWith('A can finish')) {
        const [a, b] = nums;
        expect(ans).toBeCloseTo((a * b) / (a + b), 6);
      } else if (q.question.startsWith('A and B together')) {
        const [T, a] = nums;
        expect(1 / T - 1 / a).toBeCloseTo(1 / ans, 9);
      } else {
        const [a, b] = nums;
        expect(1 / a - 1 / b).toBeCloseTo(1 / ans, 9);
      }
    }
  });

  it('seating puzzles have a unique solution that matches the answer', () => {
    const perms = (arr: string[]): string[][] =>
      arr.length <= 1 ? [arr] : arr.flatMap((x, i) => perms([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [x, ...p]));
    for (const seed of SEEDS.slice(0, 120)) {
      const q = generate('seat', seed);
      const names = (q.question.match(/\b[P-W]\b/g) ?? []) as string[];
      const n = names.length;
      const ok = (p: Record<string, number>) =>
        q.statements!.every((s) => {
          let m: RegExpExecArray | null;
          if ((m = /^(\w) sits at one of the ends/.exec(s))) return p[m[1]] === 0 || p[m[1]] === n - 1;
          if ((m = /^(\w) does not sit at either end/.exec(s))) return p[m[1]] !== 0 && p[m[1]] !== n - 1;
          if ((m = /^(\w) is second from the left/.exec(s))) return p[m[1]] === 1;
          if ((m = /^(\w) is second from the right/.exec(s))) return p[m[1]] === n - 2;
          if ((m = /^(\w) sits exactly in the middle/.exec(s))) return p[m[1]] === (n - 1) / 2;
          if ((m = /^(\w) sits immediately to the left of (\w)/.exec(s))) return p[m[1]] === p[m[2]] - 1;
          if ((m = /^(\w) sits somewhere to the left of (\w)/.exec(s))) return p[m[1]] < p[m[2]] - 1;
          if ((m = /^Exactly one person sits between (\w) and (\w)/.exec(s))) return Math.abs(p[m[1]] - p[m[2]]) === 2;
          if ((m = /^(\w) and (\w) sit next to each other/.exec(s))) return Math.abs(p[m[1]] - p[m[2]]) === 1;
          throw new Error(`Unparsed clue: ${s}`);
        });
      const sols = perms(names).filter((arr) => ok(Object.fromEntries(arr.map((x, i) => [x, i]))));
      expect(sols).toHaveLength(1);
      const arr = sols[0];
      const a = q.ask!;
      let expected: string | undefined;
      let m: RegExpExecArray | null;
      if (a.includes('extreme left')) expected = arr[0];
      else if (a.includes('extreme right')) expected = arr[n - 1];
      else if (a.includes('second from the right')) expected = arr[n - 2];
      else if (a.includes('middle')) expected = arr[(n - 1) / 2];
      else if ((m = /between (\w) and (\w)/.exec(a))) expected = arr[(arr.indexOf(m[1]) + arr.indexOf(m[2])) / 2];
      else if ((m = /right of (\w)/.exec(a))) expected = arr[arr.indexOf(m[1]) + 1];
      expect(q.options[q.answer]).toBe(expected);
    }
  });

  it('direction distances are whole numbers that match the walk', () => {
    const V: Record<string, [number, number]> = { North: [0, 1], East: [1, 0], South: [0, -1], West: [-1, 0] };
    const order = ['North', 'East', 'South', 'West'];
    for (const seed of SEEDS) {
      const q = generate('dir', seed);
      const first = /walks (\d+) km towards (\w+)/.exec(q.question)!;
      let h = order.indexOf(first[2]);
      let x = V[first[2]][0] * Number(first[1]);
      let y = V[first[2]][1] * Number(first[1]);
      for (const m of q.question.matchAll(/turns (right|left) and walks (\d+) km/g)) {
        h = (h + (m[1] === 'right' ? 1 : 3)) % 4;
        x += V[order[h]][0] * Number(m[2]);
        y += V[order[h]][1] * Number(m[2]);
      }
      const dist = Math.hypot(x, y);
      expect(q.options[q.answer].startsWith(`${dist} km`)).toBe(true);
    }
  });
});
