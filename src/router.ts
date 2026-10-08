import { useEffect, useState } from 'react';

/** Hash routing keeps deep links working on GitHub Pages without a 404 fallback. */
export function currentRoute(): { path: string; params: URLSearchParams } {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = raw.split('?');
  return { path: path || '/', params: new URLSearchParams(query) };
}

export function navigate(to: string) {
  if (window.location.hash !== `#${to}`) window.location.hash = to;
  window.scrollTo(0, 0);
}

export function useRoute() {
  const [route, setRoute] = useState(currentRoute);
  useEffect(() => {
    const on = () => setRoute(currentRoute());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
