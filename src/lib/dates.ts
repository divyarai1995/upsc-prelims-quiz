export const DAY_MS = 86_400_000;

/** Local calendar date as YYYY-MM-DD. */
export function dayKey(d: Date | number = Date.now()): string {
  const x = typeof d === 'number' ? new Date(d) : d;
  const m = String(x.getMonth() + 1).padStart(2, '0');
  const day = String(x.getDate()).padStart(2, '0');
  return `${x.getFullYear()}-${m}-${day}`;
}

export function daysAgo(n: number): string {
  return dayKey(Date.now() - n * DAY_MS);
}

export function streakFrom(daily: Record<string, number>): number {
  let n = 0;
  let i = daily[dayKey()] ? 0 : 1;
  while (daily[daysAgo(i)]) {
    n++;
    i++;
  }
  return n;
}

export function prettyDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h) return `${h}h ${String(m).padStart(2, '0')}m`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
