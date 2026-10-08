import { buildOptions, fmt, frac, gcd, lcm, numericOptions, Rng } from './rng';
import type { Generator, GenOut } from './types';

const rs = (n: number) => `₹${fmt(n)}`;
const pct = (n: number) => `${fmt(n)}%`;

function seriesQuestion(rng: Rng): GenOut {
  const kind = rng.int(0, 5);
  const t: number[] = [];
  let rule = '';
  switch (kind) {
    case 0: {
      const a = rng.int(2, 40);
      const d = rng.int(3, 19);
      for (let i = 0; i < 6; i++) t.push(a + i * d);
      rule = `Each term increases by ${d}.`;
      break;
    }
    case 1: {
      const a = rng.int(1, 6);
      const r = rng.int(2, 3);
      for (let i = 0; i < 6; i++) t.push(a * r ** i);
      rule = `Each term is multiplied by ${r}.`;
      break;
    }
    case 2: {
      const a = rng.int(1, 20);
      const d = rng.int(1, 6);
      const k = rng.int(1, 4);
      t.push(a);
      for (let i = 0; i < 5; i++) t.push(t[i] + d + i * k);
      rule = `The differences are ${[0, 1, 2, 3, 4].map((i) => d + i * k).join(', ')}: they grow by ${k} each time.`;
      break;
    }
    case 3: {
      const start = rng.int(2, 8);
      const c = rng.pick([-1, 1, 2, 3]);
      const p = rng.pick([2, 3]);
      for (let n = start; n < start + 6; n++) t.push(n ** p + c);
      const sign = c > 0 ? `+ ${c}` : `- ${-c}`;
      rule = `Terms are n${p === 2 ? '²' : '³'} ${sign} for n = ${start}, ${start + 1}, ${start + 2}, ...`;
      break;
    }
    case 4: {
      const a = rng.int(1, 9);
      const m = rng.int(2, 3);
      const k = rng.int(1, 9);
      t.push(a);
      for (let i = 0; i < 5; i++) t.push(i % 2 === 0 ? t[i] * m : t[i] + k);
      rule = `The operations alternate: ×${m}, +${k}, ×${m}, +${k}, ...`;
      break;
    }
    default: {
      const a = rng.int(1, 9);
      const b = rng.int(1, 9);
      t.push(a, b);
      for (let i = 2; i < 6; i++) t.push(t[i - 1] + t[i - 2]);
      rule = 'Each term is the sum of the two terms before it.';
    }
  }
  const shown = t.slice(0, 5);
  const ans = t[5];
  const lastDiff = t[4] - t[3];
  const { options, answer } = numericOptions(rng, ans, [ans + 1, ans - 1, t[4] + lastDiff, ans + lastDiff, ans - 2]);
  return {
    question: `What comes next in the series: ${shown.join(', ')}, ?`,
    options,
    answer,
    explanation: `${rule} So the next term is ${fmt(ans)}.`,
    difficulty: kind >= 2 ? 2 : 1,
  };
}

function percentChange(rng: Rng): GenOut {
  const vals = [10, 20, 25, 30, 40, 50];
  const a = rng.pick(vals);
  const b = rng.pick(vals);
  const describe = (n: number) => (Math.abs(n) < 1e-9 ? 'No change' : `${fmt(Math.abs(n))}% ${n > 0 ? 'increase' : 'decrease'}`);
  if (rng.chance(0.5)) {
    const net = a - b - (a * b) / 100;
    const { options, answer } = buildOptions(
      rng,
      describe(net),
      [describe(a - b), describe(-net), describe(a - b + (a * b) / 100), describe(net - 5)],
      () => describe(net + rng.int(-9, 9)),
    );
    return {
      question: `The price of a commodity is first increased by ${a}% and then decreased by ${b}%. What is the net percentage change in its price?`,
      options,
      answer,
      explanation: `Net change = a − b − ab/100 = ${a} − ${b} − (${a}×${b})/100 = ${fmt(net)}%. So it is a ${describe(net).toLowerCase()}.`,
      difficulty: 2,
    };
  }
  const net = a + b + (a * b) / 100;
  const { options, answer } = numericOptions(rng, net, [a + b, net + 5, net - (a * b) / 200, a * b / 10], pct);
  return {
    question: `The population of a town grows by ${a}% in the first year and by ${b}% in the second year. By what percentage has it grown over the two years?`,
    options,
    answer,
    explanation: `Successive increases combine as a + b + ab/100 = ${a} + ${b} + ${(a * b) / 100} = ${fmt(net)}%.`,
    difficulty: 1,
  };
}

function profitLoss(rng: Rng): GenOut {
  if (rng.chance(0.5)) {
    const cp = rng.int(2, 20) * 100;
    const p = rng.pick([5, 10, 12, 15, 20, 25, 30, 40]);
    const gain = rng.chance(0.5);
    const sp = gain ? cp * (1 + p / 100) : cp * (1 - p / 100);
    const wrong = gain ? sp * (1 - p / 100) : sp * (1 + p / 100);
    const { options, answer } = numericOptions(rng, cp, [Math.round(wrong), cp + 100, cp - 100, sp], rs);
    return {
      question: `An article is sold for ${rs(sp)} at a ${gain ? 'profit' : 'loss'} of ${p}%. What is its cost price?`,
      options,
      answer,
      explanation: `SP = CP × (1 ${gain ? '+' : '−'} ${p}/100), so CP = ${fmt(sp)} ÷ ${gain ? 1 + p / 100 : 1 - p / 100} = ${rs(cp)}. Taking ${p}% of the selling price instead of the cost price is the usual trap.`,
      difficulty: 1,
    };
  }
  const m = rng.pick([20, 25, 30, 40, 50, 60]);
  const d = rng.pick([10, 15, 20, 25]);
  const net = ((1 + m / 100) * (1 - d / 100) - 1) * 100;
  const describe = (n: number) => (Math.abs(n) < 1e-9 ? 'No profit, no loss' : `${fmt(Math.abs(n))}% ${n > 0 ? 'profit' : 'loss'}`);
  const { options, answer } = buildOptions(
    rng,
    describe(net),
    [describe(m - d), describe(net + 2.5), describe(m - d - (m * d) / 200), describe(-net)],
    () => describe(net + rng.int(-6, 6)),
  );
  return {
    question: `A shopkeeper marks an article ${m}% above its cost price and then allows a discount of ${d}% on the marked price. What is the profit or loss percentage?`,
    options,
    answer,
    explanation: `Take CP = 100. Marked price = ${100 + m}. Selling price = ${100 + m} × ${(100 - d) / 100} = ${fmt(100 + net)}. Result: ${describe(net)}.`,
    difficulty: 2,
  };
}

function interest(rng: Rng): GenOut {
  const v = rng.int(0, 2);
  if (v === 0) {
    const p = rng.int(2, 40) * 500;
    const r = rng.int(4, 15);
    const t = rng.int(2, 6);
    const si = (p * r * t) / 100;
    const { options, answer } = numericOptions(rng, si, [p + si, (p * r) / 100, si + (p * r) / 100, si - (p * r) / 100], rs);
    return {
      question: `What is the simple interest on ${rs(p)} at ${r}% per annum for ${t} years?`,
      options,
      answer,
      explanation: `SI = P × R × T / 100 = ${fmt(p)} × ${r} × ${t} / 100 = ${rs(si)}.`,
      difficulty: 1,
    };
  }
  if (v === 1) {
    const [r, t, unit] = rng.pick([
      [10, 2, 1000],
      [10, 3, 1000],
      [20, 2, 1000],
      [20, 3, 1000],
      [5, 2, 2000],
    ] as const);
    const p = unit * rng.int(1, 10);
    const ci = Math.round(p * ((1 + r / 100) ** t - 1) * 100) / 100;
    const si = (p * r * t) / 100;
    const ciShort = Math.round(p * ((1 + r / 100) ** (t - 1) - 1) * 100) / 100;
    const { options, answer } = numericOptions(rng, ci, [si, ci + p, ciShort, ci + 10], rs);
    return {
      question: `What is the compound interest on ${rs(p)} at ${r}% per annum for ${t} years, compounded annually?`,
      options,
      answer,
      explanation: `Amount = P(1 + R/100)^T = ${fmt(p)} × ${(1 + r / 100).toFixed(2)}^${t} = ${rs(p + ci)}. CI = Amount − P = ${rs(ci)}.`,
      difficulty: 2,
    };
  }
  const r = rng.pick([5, 10, 20]);
  const p = (r === 5 ? 400 : 100) * rng.int(2, 25);
  const diff = (p * r * r) / 10000;
  const { options, answer } = numericOptions(rng, diff, [(p * r) / 100, diff * 2, diff / 2, diff + r], rs);
  return {
    question: `What is the difference between compound interest and simple interest on ${rs(p)} for 2 years at ${r}% per annum?`,
    options,
    answer,
    explanation: `For 2 years, CI − SI = P(R/100)² = ${fmt(p)} × (${r}/100)² = ${rs(diff)}.`,
    difficulty: 2,
  };
}

function timeWork(rng: Rng): GenOut {
  for (let guard = 0; guard < 500; guard++) {
    const T = rng.int(2, 12);
    const v = rng.int(0, 2);
    if (v < 2) {
      const a = rng.int(T + 1, 4 * T);
      const b = (a * T) / (a - T);
      if (!Number.isInteger(b) || b > 90 || b === a) continue;
      if (v === 0) {
        const { options, answer } = numericOptions(rng, T, [(a + b) / 2, Math.abs(a - b), T + 1, T - 1, T + 2], (n) => `${fmt(n)} days`);
        return {
          question: `A can finish a piece of work in ${a} days and B can finish it in ${b} days. In how many days can they finish it working together?`,
          options,
          answer,
          explanation: `Together they do 1/${a} + 1/${b} = ${frac(a + b, a * b)} of the work per day, so they need ${a}×${b}/(${a}+${b}) = ${T} days.`,
          difficulty: 1,
        };
      }
      const { options, answer } = numericOptions(rng, b, [a - T, a + T, b + T, b - 2], (n) => `${fmt(n)} days`);
      return {
        question: `A and B together can finish a work in ${T} days. A alone can finish it in ${a} days. In how many days can B alone finish it?`,
        options,
        answer,
        explanation: `B's one-day work = 1/${T} − 1/${a} = ${frac(a - T, a * T)}, so B needs ${a}×${T}/(${a}−${T}) = ${b} days.`,
        difficulty: 2,
      };
    }
    const a = rng.int(2, T - 1 > 2 ? T - 1 : 2);
    if (a >= T) continue;
    const b = (a * T) / (T - a);
    if (!Number.isInteger(b) || b > 60 || b === a) continue;
    const { options, answer } = numericOptions(rng, T, [(a * b) / (a + b), b - a, T + 2, T - 1], (n) => `${fmt(n)} hours`);
    return {
      question: `Pipe A can fill a tank in ${a} hours and pipe B can empty the full tank in ${b} hours. If both are opened together on an empty tank, how long will it take to fill it?`,
      options,
      answer,
      explanation: `Net filling per hour = 1/${a} − 1/${b} = ${frac(b - a, a * b)}. Time = ${a}×${b}/(${b}−${a}) = ${T} hours.`,
      difficulty: 2,
    };
  }
  return timeWork(new Rng(42));
}

function speed(rng: Rng): GenOut {
  const v = rng.int(0, 3);
  if (v === 0) {
    const kmh = rng.pick([36, 54, 72, 90, 108, 126]);
    const mps = (kmh * 5) / 18;
    const t = rng.int(6, 30);
    const L = mps * t;
    const { options, answer } = numericOptions(rng, kmh, [mps, kmh + 18, kmh - 18, (L / t) * 3.6 + 9], (n) => `${fmt(n)} km/h`);
    return {
      question: `A train ${L} m long passes a signal pole in ${t} seconds. What is its speed in km/h?`,
      options,
      answer,
      explanation: `Speed = ${L}/${t} = ${mps} m/s. Converting: ${mps} × 18/5 = ${kmh} km/h.`,
      difficulty: 1,
    };
  }
  if (v === 1) {
    for (let g = 0; g < 200; g++) {
      const kmh = rng.pick([36, 54, 72, 90, 108]);
      const mps = (kmh * 5) / 18;
      const time = rng.int(15, 45);
      const L = rng.int(10, 30) * 10;
      const P = mps * time - L;
      if (P < 60) continue;
      const { options, answer } = numericOptions(rng, time, [Math.round(L / mps), Math.round(P / mps), time + 5, time - 3], (n) => `${fmt(n)} seconds`);
      return {
        question: `A train ${L} m long runs at ${kmh} km/h. How long will it take to cross a platform ${P} m long?`,
        options,
        answer,
        explanation: `Distance to cover = train + platform = ${L} + ${P} = ${L + P} m. Speed = ${kmh} × 5/18 = ${mps} m/s. Time = ${L + P}/${mps} = ${time} s.`,
        difficulty: 1,
      };
    }
  }
  if (v === 2) {
    for (let g = 0; g < 500; g++) {
      const x = rng.int(4, 18) * 5;
      const y = rng.int(4, 18) * 5;
      if (x === y) continue;
      const avg = (2 * x * y) / (x + y);
      if (!Number.isInteger(avg)) continue;
      const { options, answer } = numericOptions(rng, avg, [(x + y) / 2, avg + 2, avg - 3], (n) => `${fmt(n)} km/h`);
      return {
        question: `A person travels from town P to town Q at ${x} km/h and returns along the same route at ${y} km/h. What is the average speed for the whole journey?`,
        options,
        answer,
        explanation: `For equal distances, average speed = 2xy/(x + y) = 2×${x}×${y}/${x + y} = ${avg} km/h. The simple average ${fmt((x + y) / 2)} is a trap.`,
        difficulty: 2,
      };
    }
  }
  const rel = rng.pick([54, 72, 90, 108, 126, 144]);
  const u = rng.int(2, rel / 9 - 2) * 9;
  const w = rel - u;
  const mps = (rel * 5) / 18;
  const t = rng.int(8, 20);
  const total = mps * t;
  const l1 = Math.round((total * rng.int(35, 65)) / 100);
  const l2 = total - l1;
  const diffSpeed = Math.abs(u - w);
  const wrong = diffSpeed > 0 ? total / ((diffSpeed * 5) / 18) : t * 2;
  const { options, answer } = numericOptions(rng, t, [Math.round(wrong * 10) / 10, t + 4, t - 2, Math.round((l1 / mps) * 10) / 10], (n) => `${fmt(n)} seconds`);
  return {
    question: `Two trains ${l1} m and ${l2} m long run on parallel tracks towards each other at ${u} km/h and ${w} km/h. How long will they take to cross each other completely?`,
    options,
    answer,
    explanation: `Moving towards each other, relative speed = ${u} + ${w} = ${rel} km/h = ${mps} m/s. Distance = ${l1} + ${l2} = ${total} m. Time = ${total}/${mps} = ${t} s.`,
    difficulty: 2,
  };
}

function ratio(rng: Rng): GenOut {
  if (rng.chance(0.5)) {
    const [a, b, c] = [rng.int(1, 9), rng.int(1, 9), rng.int(1, 9)];
    const unit = rng.int(5, 50) * 10;
    const total = unit * (a + b + c);
    const { options, answer } = numericOptions(rng, unit * b, [unit * a, unit * c, Math.round(total / 3), unit * (b + 1)], rs);
    return {
      question: `${rs(total)} is divided among A, B and C in the ratio ${a} : ${b} : ${c}. What is B's share?`,
      options,
      answer,
      explanation: `Total parts = ${a + b + c}. One part = ${fmt(total)}/${a + b + c} = ${fmt(unit)}. B's share = ${b} × ${fmt(unit)} = ${rs(unit * b)}.`,
      difficulty: 1,
    };
  }
  const x = rng.int(2, 9) * 5000;
  const y = rng.int(2, 9) * 5000;
  const months = rng.pick([4, 6, 8, 9]);
  let r1 = x * 12;
  let r2 = y * months;
  const g = gcd(r1, r2);
  r1 /= g;
  r2 /= g;
  const unit = rng.int(2, 20) * 100;
  const profit = unit * (r1 + r2);
  const { options, answer } = numericOptions(rng, unit * r2, [unit * r1, Math.round((profit * y) / (x + y)), profit / 2], rs);
  return {
    question: `A starts a business with ${rs(x)}. After ${12 - months} months, B joins with ${rs(y)}. At the end of the year the profit is ${rs(profit)}. What is B's share?`,
    options,
    answer,
    explanation: `Profit is shared in the ratio of capital × time: A = ${fmt(x)}×12, B = ${fmt(y)}×${months}, i.e. ${r1} : ${r2}. B's share = ${fmt(profit)} × ${r2}/${r1 + r2} = ${rs(unit * r2)}.`,
    difficulty: 2,
  };
}

function averages(rng: Rng): GenOut {
  if (rng.chance(0.5)) {
    const n = rng.int(10, 40);
    const A = rng.int(10, 16);
    const inc = rng.pick([1, 2]);
    const teacher = A + inc * (n + 1);
    const { options, answer } = numericOptions(rng, teacher, [A + inc * n, A + inc, teacher + inc, (A + inc) * 2], (k) => `${fmt(k)} years`);
    return {
      question: `The average age of ${n} students in a class is ${A} years. When the teacher's age is included, the average rises by ${inc} year${inc > 1 ? 's' : ''}. What is the teacher's age?`,
      options,
      answer,
      explanation: `New total = ${A + inc} × ${n + 1} = ${(A + inc) * (n + 1)}. Old total = ${A} × ${n} = ${A * n}. Teacher = ${(A + inc) * (n + 1)} − ${A * n} = ${teacher} years.`,
      difficulty: 1,
    };
  }
  for (let g = 0; g < 200; g++) {
    const n = rng.int(5, 12);
    const X = rng.int(20, 80);
    const Y = X + rng.int(-6, 6);
    const excluded = n * X - (n - 1) * Y;
    if (Y === X || excluded <= 0) continue;
    const { options, answer } = numericOptions(rng, excluded, [X - Y, n * X - n * Y, excluded + n, Math.abs(X - Y) * n]);
    return {
      question: `The average of ${n} numbers is ${X}. If one number is removed, the average of the remaining numbers becomes ${Y}. What number was removed?`,
      options,
      answer,
      explanation: `Removed number = ${n}×${X} − ${n - 1}×${Y} = ${n * X} − ${(n - 1) * Y} = ${excluded}.`,
      difficulty: 1,
    };
  }
  return averages(new Rng(7));
}

function ages(rng: Rng): GenOut {
  for (let g = 0; g < 500; g++) {
    const p = rng.int(1, 6);
    const q = rng.int(p + 1, 9);
    if (gcd(p, q) !== 1) continue;
    const m = rng.int(2, 8);
    const k = rng.int(2, 12);
    const A = p * m;
    const B = q * m;
    let r = A + k;
    let s = B + k;
    const h = gcd(r, s);
    r /= h;
    s /= h;
    if (r > 30 || s > 30 || (r === p && s === q)) continue;
    const { options, answer } = numericOptions(rng, A, [B, A + k, Math.abs(A - k), A + m], (n) => `${fmt(n)} years`);
    return {
      question: `The present ages of A and B are in the ratio ${p} : ${q}. After ${k} years, the ratio of their ages will be ${r} : ${s}. What is A's present age?`,
      options,
      answer,
      explanation: `Let ages be ${p}x and ${q}x. (${p}x + ${k})/(${q}x + ${k}) = ${r}/${s} gives x = ${m}. A's age = ${p} × ${m} = ${A} years.`,
      difficulty: 2,
    };
  }
  return ages(new Rng(3));
}

function clock(rng: Rng): GenOut {
  const H = rng.int(1, 12);
  const M = rng.int(1, 59);
  const norm = (x: number) => {
    const r = ((x % 360) + 360) % 360;
    return Math.min(r, 360 - r);
  };
  const ang = norm(30 * H - 5.5 * M);
  const naive = norm(30 * H - 6 * M);
  const deg = (n: number) => `${fmt(n)}°`;
  const { options, answer } = buildOptions(
    rng,
    deg(ang),
    [deg(naive), deg(360 - ang), deg(Math.abs(ang - 15)), deg(ang + 30)],
    () => deg(Math.max(0, ang + rng.pick([-1, 1]) * rng.int(1, 20) * 2.5)),
  );
  const mm = String(M).padStart(2, '0');
  return {
    question: `What is the smaller angle between the hour hand and the minute hand of a clock at ${H}:${mm}?`,
    options,
    answer,
    explanation: `Angle = |30H − 5.5M| = |30×${H} − 5.5×${M}| = ${fmt(Math.abs(30 * H - 5.5 * M))}°. The smaller angle is ${deg(ang)}. Forgetting that the hour hand also moves (0.5° per minute) gives ${deg(naive)}.`,
    difficulty: 2,
  };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function calendar(rng: Rng): GenOut {
  const y1 = rng.int(1960, 2040);
  const d1 = new Date(Date.UTC(y1, rng.int(0, 11), rng.int(1, 28)));
  const gap = rng.int(30, 800) * (rng.chance(0.7) ? 1 : -1);
  const d2 = new Date(d1.getTime() + gap * 86400000);
  const show = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  const day1 = DAYS[d1.getUTCDay()];
  const day2 = DAYS[d2.getUTCDay()];
  const days = Math.abs(gap);
  const { options, answer } = buildOptions(
    rng,
    day2,
    [DAYS[(d2.getUTCDay() + 1) % 7], DAYS[(d2.getUTCDay() + 6) % 7], DAYS[(d2.getUTCDay() + 2) % 7]],
    () => rng.pick(DAYS),
  );
  return {
    question: `If ${show(d1)} was a ${day1}, what day of the week was ${show(d2)}?`,
    options,
    answer,
    explanation: `${show(d2)} is ${days} days ${gap > 0 ? 'after' : 'before'} ${show(d1)}. ${days} = 7 × ${Math.floor(days / 7)} + ${days % 7}, so the weekday shifts ${days % 7} day(s) ${gap > 0 ? 'forward' : 'backward'} from ${day1}, giving ${day2}.`,
    difficulty: 2,
  };
}

function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
function nCr(n: number, r: number): number {
  return Math.round(factorial(n) / (factorial(r) * factorial(n - r)));
}

function combinatorics(rng: Rng): GenOut {
  const v = rng.int(0, 2);
  if (v === 0) {
    const word = rng.pick(['PLANT', 'TRAIN', 'MOUSE', 'CHAIR', 'FRIEND', 'GARDEN', 'LEVEL', 'BANANA', 'APPLE', 'COFFEE', 'LETTER', 'SUCCESS', 'BALLOON']);
    const counts: Record<string, number> = {};
    for (const ch of word) counts[ch] = (counts[ch] ?? 0) + 1;
    const reps = Object.entries(counts).filter(([, c]) => c > 1);
    const denom = reps.reduce((acc, [, c]) => acc * factorial(c), 1);
    const ans = factorial(word.length) / denom;
    const { options, answer } = numericOptions(rng, ans, [factorial(word.length), ans * 2, ans / 2, factorial(word.length - 1)]);
    const repText = reps.length ? ` divided by ${reps.map(([ch, c]) => `${c}! (for ${c} ${ch}'s)`).join(' and ')}` : '';
    return {
      question: `In how many different ways can the letters of the word "${word}" be arranged?`,
      options,
      answer,
      explanation: `${word.length} letters give ${word.length}!${repText} = ${fmt(ans)} arrangements.`,
      difficulty: reps.length ? 2 : 1,
    };
  }
  if (v === 1) {
    const n = rng.int(6, 25);
    const ans = (n * (n - 1)) / 2;
    const { options, answer } = numericOptions(rng, ans, [n * (n - 1), (n * n) / 2, ans + n, ans - n]);
    return {
      question: `At a meeting, each of ${n} people shakes hands exactly once with every other person. How many handshakes take place?`,
      options,
      answer,
      explanation: `Each handshake is a pair: C(${n}, 2) = ${n}×${n - 1}/2 = ${ans}.`,
      difficulty: 1,
    };
  }
  const men = rng.int(4, 8);
  const women = rng.int(3, 7);
  const rm = rng.int(2, 3);
  const rw = rng.int(1, 3);
  const ans = nCr(men, rm) * nCr(women, rw);
  const { options, answer } = numericOptions(rng, ans, [nCr(men + women, rm + rw), nCr(men, rm) + nCr(women, rw), ans * 2]);
  return {
    question: `A committee of ${rm} men and ${rw} women is to be formed from ${men} men and ${women} women. In how many ways can this be done?`,
    options,
    answer,
    explanation: `C(${men}, ${rm}) × C(${women}, ${rw}) = ${nCr(men, rm)} × ${nCr(women, rw)} = ${ans}.`,
    difficulty: 2,
  };
}

function probability(rng: Rng): GenOut {
  const v = rng.int(0, 2);
  if (v === 0) {
    const s = rng.int(3, 11);
    const ways = 6 - Math.abs(s - 7);
    const ans = frac(ways, 36);
    const { options, answer } = buildOptions(rng, ans, [frac(ways + 1, 36), frac(Math.max(1, ways - 1), 36), frac(1, 6), frac(ways, 12)], () => frac(rng.int(1, 11), 36));
    return {
      question: `Two fair dice are thrown together. What is the probability that the sum of the numbers shown is ${s}?`,
      options,
      answer,
      explanation: `There are 36 equally likely outcomes. ${ways} of them sum to ${s}, so the probability is ${ways}/36 = ${ans}.`,
      difficulty: 1,
    };
  }
  if (v === 1) {
    const n = rng.int(2, 4);
    const k = rng.int(0, n);
    const ans = frac(nCr(n, k), 2 ** n);
    const { options, answer } = buildOptions(rng, ans, [frac(1, 2 ** n), frac(k || 1, n + 1), frac(1, 2), frac(nCr(n, k) + 1, 2 ** n)], () => frac(rng.int(1, 2 ** n - 1), 2 ** n));
    return {
      question: `A fair coin is tossed ${n} times. What is the probability of getting exactly ${k} head${k === 1 ? '' : 's'}?`,
      options,
      answer,
      explanation: `Favourable outcomes = C(${n}, ${k}) = ${nCr(n, k)} out of 2^${n} = ${2 ** n}. Probability = ${ans}.`,
      difficulty: 1,
    };
  }
  const cards: [string, string][] = [
    ['a king', frac(4, 52)],
    ['a red card', frac(26, 52)],
    ['a face card (J, Q or K)', frac(12, 52)],
    ['a heart', frac(13, 52)],
    ['a red king', frac(2, 52)],
    ['an ace or a king', frac(8, 52)],
    ['a black face card', frac(6, 52)],
  ];
  const [what, ans] = rng.pick(cards);
  const { options, answer } = buildOptions(
    rng,
    ans,
    rng.shuffle(cards.map((c) => c[1])).filter((x) => x !== ans),
    () => frac(rng.int(1, 51), 52),
  );
  return {
    question: `One card is drawn at random from a well-shuffled pack of 52 cards. What is the probability that it is ${what}?`,
    options,
    answer,
    explanation: `Count the favourable cards and divide by 52. The probability of drawing ${what} is ${ans}.`,
    difficulty: 1,
  };
}

function mixture(rng: Rng): GenOut {
  const a = rng.int(20, 60);
  const b = a + rng.int(10, 40);
  const m = rng.int(a + 1, b - 1);
  const show = (x: number, y: number) => {
    const g = gcd(x, y);
    return `${x / g} : ${y / g}`;
  };
  const ans = show(b - m, m - a);
  const { options, answer } = buildOptions(rng, ans, [show(m - a, b - m), show(m - a, b - a), show(b - m, b - a)], () => show(rng.int(1, 9), rng.int(1, 9)));
  return {
    question: `In what ratio must rice costing ₹${a}/kg be mixed with rice costing ₹${b}/kg so that the mixture costs ₹${m}/kg?`,
    options,
    answer,
    explanation: `By alligation, cheaper : dearer = (${b} − ${m}) : (${m} − ${a}) = ${b - m} : ${m - a} = ${ans}.`,
    difficulty: 2,
  };
}

function lcmHcf(rng: Rng): GenOut {
  const v = rng.int(0, 2);
  if (v < 2) {
    const nums = rng.sample([4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 25, 30], 3).sort((x, y) => x - y);
    const L = nums.reduce(lcm);
    if (v === 0) {
      const r = rng.int(1, nums[0] - 1);
      const { options, answer } = numericOptions(rng, L + r, [L, L - r, L + r + nums[0], nums[0] * nums[1] * nums[2] + r]);
      return {
        question: `What is the least number which, when divided by ${nums.join(', ')} leaves a remainder of ${r} in each case?`,
        options,
        answer,
        explanation: `LCM(${nums.join(', ')}) = ${L}. Required number = LCM + remainder = ${L} + ${r} = ${L + r}.`,
        difficulty: 1,
      };
    }
    const { options, answer } = numericOptions(rng, L, [nums[0] * nums[1] * nums[2], L * 2, L / 2, nums[0] + nums[1] + nums[2]], (n) => `${fmt(n)} seconds`);
    return {
      question: `Three bells ring at intervals of ${nums.join(', ')} seconds respectively. They ring together at 9:00 a.m. After how many seconds will they next ring together?`,
      options,
      answer,
      explanation: `They ring together again after LCM(${nums.join(', ')}) = ${L} seconds.`,
      difficulty: 1,
    };
  }
  for (let g = 0; g < 200; g++) {
    const h = rng.int(6, 40);
    const p = rng.int(2, 12);
    const q = rng.int(2, 12);
    if (p === q || gcd(p, q) !== 1) continue;
    const r1 = rng.int(1, Math.min(5, h - 1));
    const r2 = rng.int(1, Math.min(5, h - 1));
    const x = h * p + r1;
    const y = h * q + r2;
    const { options, answer } = numericOptions(rng, h, [gcd(x, y), h * 2, h + r1, Math.max(1, h - 1)]);
    return {
      question: `What is the largest number that divides ${x} and ${y} leaving remainders ${r1} and ${r2} respectively?`,
      options,
      answer,
      explanation: `Subtract the remainders: ${x} − ${r1} = ${x - r1} and ${y} − ${r2} = ${y - r2}. HCF(${x - r1}, ${y - r2}) = ${h}.`,
      difficulty: 2,
    };
  }
  return lcmHcf(new Rng(11));
}

function unitDigit(rng: Rng): GenOut {
  const base = rng.pick([2, 3, 4, 7, 8, 9, 12, 13, 17, 23, 27, 33, 37, 48, 57, 79]);
  const exp = rng.int(21, 250);
  const b = base % 10;
  const cycle: number[] = [];
  let x = b;
  do {
    cycle.push(x);
    x = (x * b) % 10;
  } while (x !== cycle[0]);
  const ans = cycle[(exp - 1) % cycle.length];
  const { options, answer } = buildOptions(
    rng,
    String(ans),
    cycle.filter((c) => c !== ans).map(String).concat([String((ans + 5) % 10)]),
    () => String(rng.int(0, 9)),
  );
  return {
    question: `What is the unit digit of ${base}^${exp}?`,
    options,
    answer,
    explanation: `Unit digits of powers of ${b} repeat in a cycle of ${cycle.length}: ${cycle.join(', ')}. ${exp} mod ${cycle.length} = ${exp % cycle.length}${exp % cycle.length === 0 ? ', and a remainder of 0 means the last digit of the cycle' : `, so take digit number ${exp % cycle.length} of the cycle`}. Answer: ${ans}.`,
    difficulty: 2,
  };
}

export const quantGenerators: Generator[] = [
  { key: 'series', subject: 'quant', topic: 'Number Series', make: seriesQuestion },
  { key: 'percent', subject: 'quant', topic: 'Percentages', make: percentChange },
  { key: 'profit', subject: 'quant', topic: 'Profit & Loss', make: profitLoss },
  { key: 'interest', subject: 'quant', topic: 'Simple & Compound Interest', make: interest },
  { key: 'work', subject: 'quant', topic: 'Time & Work', make: timeWork },
  { key: 'speed', subject: 'quant', topic: 'Speed, Time & Distance', make: speed },
  { key: 'ratio', subject: 'quant', topic: 'Ratio & Partnership', make: ratio },
  { key: 'average', subject: 'quant', topic: 'Averages', make: averages },
  { key: 'ages', subject: 'quant', topic: 'Problems on Ages', make: ages },
  { key: 'clock', subject: 'quant', topic: 'Clocks', make: clock },
  { key: 'calendar', subject: 'quant', topic: 'Calendars', make: calendar },
  { key: 'pnc', subject: 'quant', topic: 'Permutations & Combinations', make: combinatorics },
  { key: 'prob', subject: 'quant', topic: 'Probability', make: probability },
  { key: 'mixture', subject: 'quant', topic: 'Mixtures & Alligation', make: mixture },
  { key: 'lcm', subject: 'quant', topic: 'LCM & HCF', make: lcmHcf },
  { key: 'unit', subject: 'quant', topic: 'Number System', make: unitDigit },
];
