import { useMemo } from 'react';
import { HomeIcon, NewsIcon, PracticeIcon, ReviewIcon, SettingsIcon, StatsIcon } from './components/Icons';
import { streakFrom } from './lib/dates';
import { dueCards } from './lib/progress';
import CurrentAffairs from './pages/CurrentAffairs';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Review from './pages/Review';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import { useRoute } from './router';
import { useStore } from './store';

const PAGES: Record<string, () => JSX.Element> = {
  '/': Home,
  '/practice': Practice,
  '/quiz': Quiz,
  '/results': Results,
  '/review': Review,
  '/ca': CurrentAffairs,
  '/stats': Stats,
  '/settings': Settings,
};

export default function App() {
  const { path } = useRoute();
  const { progress } = useStore();
  const due = useMemo(() => dueCards(progress).length, [progress]);
  const streak = streakFrom(progress.daily);
  const Page = PAGES[path] ?? Home;
  const inQuiz = path === '/quiz';

  const tabs = [
    { to: '/', label: 'Home', icon: <HomeIcon /> },
    { to: '/practice', label: 'Practice', icon: <PracticeIcon /> },
    { to: '/review', label: 'Review', icon: <ReviewIcon />, badge: due },
    { to: '/ca', label: 'News', icon: <NewsIcon /> },
    { to: '/stats', label: 'Stats', icon: <StatsIcon /> },
    { to: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#/">
            <span className="brand-mark">IAS</span>
            <span>Prelims Practice</span>
          </a>
          {streak > 0 && <span className="chip-streak">🔥 {streak} day{streak > 1 ? 's' : ''}</span>}
        </div>
      </header>
      {!inQuiz && (
        <nav className="nav" aria-label="Main">
          {tabs.map((t) => (
            <a key={t.to} href={`#${t.to}`} className={path === t.to ? 'active' : ''} aria-current={path === t.to ? 'page' : undefined}>
              {t.icon}
              <span>{t.label}</span>
              {!!t.badge && <span className="badge">{t.badge > 99 ? '99+' : t.badge}</span>}
            </a>
          ))}
        </nav>
      )}
      <main className="container">
        <Page />
      </main>
    </div>
  );
}
