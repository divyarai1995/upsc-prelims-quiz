import { buildOptions, numericOptions, Rng } from './rng';
import type { Generator, GenOut } from './types';

const PEOPLE = ['Asha', 'Ravi', 'Meena', 'Arjun', 'Kavya', 'Imran', 'Neha', 'Rohan', 'Priya', 'Vikram', 'Sana', 'Kiran'];
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function directions(rng: Rng): GenOut {
  const NAMES = ['North', 'East', 'South', 'West'];
  const VEC = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  for (let guard = 0; guard < 2000; guard++) {
    let h = rng.int(0, 3);
    const moves = rng.int(3, 4);
    let x = 0;
    let y = 0;
    const d0 = rng.int(2, 12);
    x += VEC[h][0] * d0;
    y += VEC[h][1] * d0;
    const parts = [`walks ${d0} km towards ${NAMES[h]}`];
    for (let i = 1; i < moves; i++) {
      const right = rng.chance(0.5);
      h = (h + (right ? 1 : 3)) % 4;
      const d = rng.int(2, 12);
      x += VEC[h][0] * d;
      y += VEC[h][1] * d;
      parts.push(`turns ${right ? 'right' : 'left'} and walks ${d} km`);
    }
    const dist = Math.sqrt(x * x + y * y);
    if (dist === 0 || !Number.isInteger(dist)) continue;
    const dirOf = (dx: number, dy: number) => {
      if (dx === 0) return dy > 0 ? 'North' : 'South';
      if (dy === 0) return dx > 0 ? 'East' : 'West';
      return `${dy > 0 ? 'North' : 'South'}-${dx > 0 ? 'East' : 'West'}`;
    };
    const dir = dirOf(x, y);
    const opp = dirOf(-x, -y);
    const manhattan = Math.abs(x) + Math.abs(y);
    const who = rng.pick(PEOPLE);
    const route = parts.slice(0, -1).join(', ') + ', and finally ' + parts[parts.length - 1];
    const stem = `${who} starts from point P, ${route}.`;
    const askDist = rng.chance(0.4);
    if (askDist) {
      const { options, answer } = numericOptions(rng, dist, [manhattan, dist + 2, Math.abs(dist - 3)], (n) => `${n} km`);
      return {
        question: `${stem} How far is ${who} from point P?`,
        options,
        answer,
        explanation: `Net displacement: ${Math.abs(x)} km ${x >= 0 ? 'East' : 'West'} and ${Math.abs(y)} km ${y >= 0 ? 'North' : 'South'}. Distance = √(${x}² + ${y}²) = ${dist} km.`,
        difficulty: 2,
      };
    }
    const label = (d: number, dr: string) => `${d} km, ${dr}`;
    const { options, answer } = buildOptions(
      rng,
      label(dist, dir),
      [label(dist, opp), label(manhattan, dir), label(manhattan, opp)],
      () => label(dist + rng.int(1, 4), rng.pick(NAMES)),
    );
    return {
      question: `${stem} How far and in which direction is ${who} from point P?`,
      options,
      answer,
      explanation: `Track the position on axes. Net displacement: ${Math.abs(x)} km ${x >= 0 ? 'East' : 'West'} and ${Math.abs(y)} km ${y >= 0 ? 'North' : 'South'}. Straight-line distance = ${dist} km towards the ${dir}.`,
      difficulty: 2,
    };
  }
  return directions(new Rng(99));
}

function coding(rng: Rng): GenOut {
  const WORDS = ['MANGO', 'TIGER', 'PLANT', 'RIVER', 'CLOUD', 'BRAIN', 'HOUSE', 'LIGHT', 'STORM', 'WATER', 'EARTH', 'SMILE', 'QUIET', 'FLAME', 'GRAPE', 'NORTH', 'BREAD', 'CHAIR', 'DREAM', 'OCEAN'];
  const [w1, w2] = rng.sample(WORDS, 2);
  const shiftCh = (c: string, k: number) => ALPHA[(((ALPHA.indexOf(c) + k) % 26) + 26) % 26];
  const kind = rng.int(0, 3);
  let enc: (w: string) => string;
  let rule: string;
  const alt: ((w: string) => string)[] = [];
  if (kind === 0) {
    const k = rng.pick([1, 2, 3, -1, -2]);
    enc = (w) => [...w].map((c) => shiftCh(c, k)).join('');
    rule = `each letter is shifted ${Math.abs(k)} place(s) ${k > 0 ? 'forward' : 'backward'} in the alphabet`;
    alt.push((w) => [...w].map((c) => shiftCh(c, -k)).join(''), (w) => [...w].map((c) => shiftCh(c, k + 1)).join(''), (w) => [...w].reverse().map((c) => shiftCh(c, k)).join(''));
  } else if (kind === 1) {
    enc = (w) => [...w].map((c) => ALPHA[25 - ALPHA.indexOf(c)]).join('');
    rule = 'each letter is replaced by its opposite letter (A↔Z, B↔Y, C↔X, ...)';
    alt.push((w) => [...w].map((c) => shiftCh(c, 1)).join(''), (w) => [...w].reverse().map((c) => ALPHA[25 - ALPHA.indexOf(c)]).join(''), (w) => [...w].map((c) => ALPHA[24 - ALPHA.indexOf(c) < 0 ? 25 : 24 - ALPHA.indexOf(c)]).join(''));
  } else if (kind === 2) {
    enc = (w) => [...w].map((c, i) => shiftCh(c, i + 1)).join('');
    rule = 'the 1st letter moves 1 place forward, the 2nd moves 2 places, the 3rd moves 3, and so on';
    alt.push((w) => [...w].map((c) => shiftCh(c, 1)).join(''), (w) => [...w].map((c, i) => shiftCh(c, -(i + 1))).join(''), (w) => [...w].map((c, i) => shiftCh(c, i)).join(''));
  } else {
    enc = (w) => [...w].reverse().map((c) => shiftCh(c, 1)).join('');
    rule = 'the word is written in reverse and then each letter moves 1 place forward';
    alt.push((w) => [...w].reverse().join(''), (w) => [...w].map((c) => shiftCh(c, 1)).join(''), (w) => [...w].reverse().map((c) => shiftCh(c, -1)).join(''));
  }
  const ans = enc(w2);
  const { options, answer } = buildOptions(rng, ans, alt.map((f) => f(w2)), () => [...ans].map((c, i) => (i === rng.int(0, 4) ? shiftCh(c, 1) : c)).join(''));
  return {
    question: `In a certain code language, ${w1} is written as ${enc(w1)}. How is ${w2} written in that code?`,
    options,
    answer,
    explanation: `In the example, ${rule}. Applying the same rule to ${w2} gives ${ans}.`,
    difficulty: kind >= 2 ? 2 : 1,
  };
}

function alphabet(rng: Rng): GenOut {
  for (let g = 0; g < 200; g++) {
    const m = rng.int(3, 24);
    const fromLeft = rng.chance(0.5);
    const n = rng.int(2, 12);
    const toRight = rng.chance(0.5);
    const base = fromLeft ? m : 27 - m;
    const pos = toRight ? base + n : base - n;
    if (pos < 1 || pos > 26) continue;
    const ans = ALPHA[pos - 1];
    const wrongBase = fromLeft ? 27 - m : m;
    const wrongPos = toRight ? wrongBase + n : wrongBase - n;
    const cands = [pos + 1, pos - 1, 27 - pos, wrongPos, toRight ? base - n : base + n].filter((p) => p >= 1 && p <= 26).map((p) => ALPHA[p - 1]);
    const { options, answer } = buildOptions(rng, ans, cands, () => ALPHA[rng.int(0, 25)]);
    const ord = (k: number) => `${k}${k % 10 === 1 && k !== 11 ? 'st' : k % 10 === 2 && k !== 12 ? 'nd' : k % 10 === 3 && k !== 13 ? 'rd' : 'th'}`;
    return {
      question: `In the English alphabet, which letter is ${ord(n)} to the ${toRight ? 'right' : 'left'} of the ${ord(m)} letter from the ${fromLeft ? 'left' : 'right'}?`,
      options,
      answer,
      explanation: `The ${ord(m)} letter from the ${fromLeft ? 'left' : 'right'} is ${ALPHA[base - 1]} (position ${base} from the left). Moving ${n} to the ${toRight ? 'right' : 'left'} gives position ${pos}, which is ${ans}.`,
      difficulty: 1,
    };
  }
  return alphabet(new Rng(5));
}

function ranking(rng: Rng): GenOut {
  const v = rng.int(0, 2);
  if (v === 0) {
    const L = rng.int(5, 30);
    const R = rng.int(5, 30);
    const N = L + R - 1;
    const who = rng.pick(PEOPLE);
    const { options, answer } = numericOptions(rng, N, [L + R, L + R - 2, L + R + 1]);
    return {
      question: `In a row of students, ${who} is ${L}th from the left end and ${R}th from the right end. How many students are there in the row?`,
      options,
      answer,
      explanation: `Total = left position + right position − 1 = ${L} + ${R} − 1 = ${N}. ${who} is counted twice otherwise.`,
      difficulty: 1,
    };
  }
  if (v === 1) {
    const N = rng.int(30, 60);
    const k = rng.int(5, N - 5);
    const ans = N - k + 1;
    const who = rng.pick(PEOPLE);
    const { options, answer } = numericOptions(rng, ans, [N - k, N - k + 2, k]);
    return {
      question: `In a class of ${N} students, ${who} ranks ${k}th from the top. What is ${who}'s rank from the bottom?`,
      options,
      answer,
      explanation: `Rank from bottom = total − rank from top + 1 = ${N} − ${k} + 1 = ${ans}.`,
      difficulty: 1,
    };
  }
  const [a, b] = rng.sample(PEOPLE, 2);
  const p = rng.int(4, 15);
  const q = rng.int(4, 15);
  const r = p + rng.int(3, 12);
  const N = r + q - 1;
  const { options, answer } = numericOptions(rng, N, [p + q - 1, r + q, r + p - 1]);
  return {
    question: `In a row, ${a} is ${p}th from the left and ${b} is ${q}th from the right. When they interchange their positions, ${a} becomes ${r}th from the left. How many people are in the row?`,
    options,
    answer,
    explanation: `After the swap, ${a} stands where ${b} stood: ${q}th from the right and ${r}th from the left. Total = ${r} + ${q} − 1 = ${N}.`,
    difficulty: 2,
  };
}

function permutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr.slice()];
  const out: T[][] = [];
  arr.forEach((x, i) => {
    for (const p of permutations([...arr.slice(0, i), ...arr.slice(i + 1)])) out.push([x, ...p]);
  });
  return out;
}

interface Clue {
  text: string;
  test: (pos: Record<string, number>) => boolean;
}

function seating(rng: Rng): GenOut {
  const n = rng.pick([5, 5, 6]);
  const names = rng.sample(['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'], n).sort();
  const all = permutations(names);
  const posOf = (arr: string[]) => Object.fromEntries(arr.map((x, i) => [x, i])) as Record<string, number>;
  for (let attempt = 0; attempt < 40; attempt++) {
    const arr = rng.shuffle(names);
    const pos = posOf(arr);
    const clues: Clue[] = [];
    for (const x of names) {
      if (pos[x] === 0 || pos[x] === n - 1) clues.push({ text: `${x} sits at one of the ends of the row.`, test: (p) => p[x] === 0 || p[x] === n - 1 });
      else clues.push({ text: `${x} does not sit at either end of the row.`, test: (p) => p[x] !== 0 && p[x] !== n - 1 });
      if (pos[x] === 1) clues.push({ text: `${x} is second from the left end.`, test: (p) => p[x] === 1 });
      if (pos[x] === n - 2) clues.push({ text: `${x} is second from the right end.`, test: (p) => p[x] === n - 2 });
      if (n % 2 === 1 && pos[x] === (n - 1) / 2) clues.push({ text: `${x} sits exactly in the middle of the row.`, test: (p) => p[x] === (n - 1) / 2 });
      for (const y of names) {
        if (x === y) continue;
        if (pos[x] === pos[y] - 1) clues.push({ text: `${x} sits immediately to the left of ${y}.`, test: (p) => p[x] === p[y] - 1 });
        if (pos[x] < pos[y] - 1) clues.push({ text: `${x} sits somewhere to the left of ${y}, but not next to ${y}.`, test: (p) => p[x] < p[y] - 1 });
        if (x < y && Math.abs(pos[x] - pos[y]) === 2) clues.push({ text: `Exactly one person sits between ${x} and ${y}.`, test: (p) => Math.abs(p[x] - p[y]) === 2 });
        if (x < y && Math.abs(pos[x] - pos[y]) === 1 && rng.chance(0.5)) clues.push({ text: `${x} and ${y} sit next to each other.`, test: (p) => Math.abs(p[x] - p[y]) === 1 });
      }
    }
    let cands = all.map(posOf);
    const chosen: Clue[] = [];
    for (const c of rng.shuffle(clues)) {
      const next = cands.filter(c.test);
      if (next.length < cands.length) {
        chosen.push(c);
        cands = next;
        if (cands.length === 1) break;
      }
    }
    // Drop clues that are no longer needed once the others are in place.
    for (let i = chosen.length - 1; i >= 0; i--) {
      const rest = chosen.filter((_, j) => j !== i);
      if (all.map(posOf).filter((p) => rest.every((c) => c.test(p))).length === 1) chosen.splice(i, 1);
    }
    if (chosen.length > 6) continue;

    type Ask = { q: string; a: string };
    const asks: Ask[] = [
      { q: 'Who sits at the extreme left end?', a: arr[0] },
      { q: 'Who sits at the extreme right end?', a: arr[n - 1] },
      { q: 'Who sits second from the right end?', a: arr[n - 2] },
    ];
    const i = rng.int(1, n - 2);
    asks.push({ q: `Who sits exactly between ${arr[i - 1]} and ${arr[i + 1]}?`, a: arr[i] });
    const j = rng.int(0, n - 2);
    asks.push({ q: `Who sits immediately to the right of ${arr[j]}?`, a: arr[j + 1] });
    if (n % 2 === 1) asks.push({ q: 'Who sits in the middle of the row?', a: arr[(n - 1) / 2] });
    const stated = chosen.map((c) => c.text).join(' ');
    const fresh = asks.filter((k) => !stated.includes(`${k.a} sits exactly in the middle`) && !stated.includes(`${k.a} is second from`));
    const ask = rng.pick(fresh.length ? fresh : asks);
    const { options, answer } = buildOptions(rng, ask.a, rng.shuffle(names.filter((x) => x !== ask.a)), () => rng.pick(names));
    return {
      question: `${['', '', '', '', '', 'Five', 'Six'][n]} people ${names.slice(0, -1).join(', ')} and ${names[n - 1]} sit in a straight row facing north.`,
      statements: chosen.map((c) => c.text),
      ask: ask.q,
      options,
      answer,
      explanation: `The clues allow exactly one arrangement, left to right: ${arr.join(' – ')}. So the answer is ${ask.a}.`,
      difficulty: 3,
    };
  }
  return seating(new Rng(rng.int(1, 1e6)));
}

function bloodRelation(rng: Rng): GenOut {
  const [A, B, C, D] = rng.sample(['A', 'B', 'C', 'D', 'M', 'N', 'P', 'Q', 'R', 'S', 'X', 'Y'], 4);
  const templates: { q: string; a: string; d: string[]; e: string }[] = [
    {
      q: `Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?`,
      a: 'Mother',
      d: ['Sister', 'Grandmother', 'Aunt'],
      e: `"The only daughter of my mother" is the woman herself. So she is the man's mother.`,
    },
    {
      q: `Pointing to a girl in a photograph, a man said, "Her father is the only son of my paternal grandfather." How is the girl related to the man?`,
      a: 'Sister',
      d: ['Cousin', 'Daughter', 'Niece'],
      e: `The only son of the man's paternal grandfather is the man's father. The girl's father is the man's father, so she is his sister.`,
    },
    {
      q: `${A} is the brother of ${B}. ${B} is the sister of ${C}. ${C} is the father of ${D}. How is ${A} related to ${D}?`,
      a: 'Uncle',
      d: ['Father', 'Brother', 'Grandfather'],
      e: `${A}, ${B} and ${C} are siblings. ${C} is ${D}'s father, so ${C}'s brother ${A} is ${D}'s uncle.`,
    },
    {
      q: `${A} is the son of ${B}. ${B} is the daughter of ${C}. ${C} is the husband of ${D}. How is ${D} related to ${A}?`,
      a: 'Grandmother',
      d: ['Mother', 'Aunt', 'Sister'],
      e: `${D} is ${C}'s wife, so ${D} is the mother of ${B}. ${B} is ${A}'s mother, so ${D} is ${A}'s grandmother.`,
    },
    {
      q: `${A} is the father of ${B}. ${B} is the brother of ${C}. ${C} is the daughter of ${D}, who is a woman. How is ${D} related to ${A}?`,
      a: 'Wife',
      d: ['Sister', 'Mother', 'Daughter'],
      e: `${B} and ${C} are siblings with father ${A} and mother ${D}. So ${D} is ${A}'s wife.`,
    },
    {
      q: `${A} is the father of ${B}. ${C} is the daughter of ${A}. ${D} is the brother of ${A}. How is ${C} related to ${D}?`,
      a: 'Niece',
      d: ['Daughter', 'Sister', 'Cousin'],
      e: `${C} is the daughter of ${D}'s brother ${A}, so ${C} is ${D}'s niece.`,
    },
    {
      q: `${A} is the husband of ${B}. ${B} is the sister of ${C}. ${C} is the father of ${D}. How is ${A} related to ${D}?`,
      a: 'Uncle',
      d: ['Father', 'Brother-in-law', 'Grandfather'],
      e: `${B} is ${D}'s paternal aunt (father's sister). ${A}, her husband, is therefore ${D}'s uncle.`,
    },
    {
      q: `${A} is the son of ${B}. ${B} is the only son of ${C}, who is a man. How is ${C} related to ${A}?`,
      a: 'Grandfather',
      d: ['Father', 'Uncle', 'Great-grandfather'],
      e: `${C} is the father of ${B}, and ${B} is the father of ${A}. So ${C} is ${A}'s grandfather.`,
    },
    {
      q: `Pointing to a lady, a man said, "The son of her only brother is the brother of my wife." How is the lady related to the man?`,
      a: "Sister of his father-in-law",
      d: ["Mother's sister", 'Grandmother', 'Sister-in-law'],
      e: `The son of her only brother is the brother of the man's wife, so her brother is the man's father-in-law. The lady is his father-in-law's sister.`,
    },
  ];
  const t = rng.pick(templates);
  const { options, answer } = buildOptions(rng, t.a, t.d, () => rng.pick(['Cousin', 'Nephew', 'Son', 'Brother']));
  return { question: t.q, options, answer, explanation: t.e, difficulty: 2 };
}

function oddOneOut(rng: Rng): GenOut {
  const isSquare = (x: number) => Number.isInteger(Math.sqrt(x));
  const isCube = (x: number) => Math.round(Math.cbrt(x)) ** 3 === x;
  const isPrime = (x: number) => {
    if (x < 2) return false;
    for (let i = 2; i * i <= x; i++) if (x % i === 0) return false;
    return true;
  };
  const kinds = [
    { name: 'perfect squares', pool: [9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196], test: isSquare, odd: [24, 50, 63, 80, 99, 120, 143, 48] },
    { name: 'prime numbers', pool: [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97], test: isPrime, odd: [51, 57, 87, 91, 69, 77, 49, 39, 93, 33] },
    { name: 'perfect cubes', pool: [8, 27, 64, 125, 216, 343, 512, 729], test: isCube, odd: [100, 144, 81, 36, 250, 400, 49] },
    { name: 'multiples of 7', pool: [14, 21, 28, 35, 42, 56, 63, 77, 84, 91, 98], test: (x: number) => x % 7 === 0, odd: [22, 36, 45, 57, 65, 74, 87, 95] },
  ];
  const k = rng.pick(kinds);
  const members = rng.sample(k.pool, 3);
  const odd = rng.pick(k.odd.filter((x) => !k.test(x)));
  const { options, answer } = buildOptions(rng, String(odd), members.map(String), () => String(rng.pick(k.pool)));
  return {
    question: `Find the odd one out: ${rng.shuffle([...members, odd]).join(', ')}`,
    options,
    answer,
    explanation: `All the others are ${k.name}. ${odd} is not.`,
    difficulty: 1,
  };
}

export const reasoningGenerators: Generator[] = [
  { key: 'dir', subject: 'reasoning', topic: 'Direction Sense', make: directions },
  { key: 'code', subject: 'reasoning', topic: 'Coding-Decoding', make: coding },
  { key: 'alpha', subject: 'reasoning', topic: 'Alphabet Test', make: alphabet },
  { key: 'rank', subject: 'reasoning', topic: 'Ranking & Order', make: ranking },
  { key: 'seat', subject: 'reasoning', topic: 'Seating Arrangement', make: seating },
  { key: 'blood', subject: 'reasoning', topic: 'Blood Relations', make: bloodRelation },
  { key: 'odd', subject: 'reasoning', topic: 'Classification', make: oddOneOut },
];
