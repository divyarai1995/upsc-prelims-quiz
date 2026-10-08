/** Small seeded PRNG (mulberry32) so a generated question can be rebuilt from its id. */
export class Rng {
  private s: number;
  constructor(seed: number) {
    this.s = seed >>> 0;
  }
  next(): number {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  /** Integer in [min, max] inclusive. */
  int(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1));
  }
  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }
  shuffle<T>(arr: readonly T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  sample<T>(arr: readonly T[], n: number): T[] {
    return this.shuffle(arr).slice(0, n);
  }
  chance(p: number): boolean {
    return this.next() < p;
  }
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

export function fmt(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString('en-IN');
  return (Math.round(n * 100) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

export function frac(num: number, den: number): string {
  const g = gcd(num, den) || 1;
  const n = num / g;
  const d = den / g;
  return d === 1 ? String(n) : `${n}/${d}`;
}

export interface Built {
  options: string[];
  answer: number;
}

/**
 * Builds 4 distinct options with the correct one at a random position.
 * Distractors that clash with the answer or each other are dropped, then
 * filled from `fallback` until there are 4.
 */
export function buildOptions(
  rng: Rng,
  correct: string,
  distractors: string[],
  fallback: () => string,
): Built {
  const set = new Set<string>([correct]);
  const out: string[] = [];
  for (const d of distractors) {
    if (out.length >= 3) break;
    if (!set.has(d)) {
      set.add(d);
      out.push(d);
    }
  }
  let guard = 0;
  while (out.length < 3 && guard++ < 200) {
    const d = fallback();
    if (!set.has(d)) {
      set.add(d);
      out.push(d);
    }
  }
  const options = rng.shuffle([correct, ...out]);
  return { options, answer: options.indexOf(correct) };
}

/** Numeric options: distractors are offsets around the answer. */
export function numericOptions(
  rng: Rng,
  correct: number,
  distractors: number[],
  render: (n: number) => string = fmt,
): Built {
  const spread = Math.max(1, Math.round(Math.abs(correct) * 0.15));
  return buildOptions(
    rng,
    render(correct),
    distractors.filter((d) => Number.isFinite(d) && d !== correct && d >= 0).map(render),
    () => render(Math.max(0, correct + rng.pick([-1, 1]) * rng.int(1, spread))),
  );
}
