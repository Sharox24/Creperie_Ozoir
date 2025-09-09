import React, { useEffect, useState } from 'react';
import { useLanguage } from '#shared/contexts/LanguageContext';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('creperie-theme') || 'light';
  });
  const { t } = useLanguage();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('creperie-theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <button
      onClick={toggle}
      className="text-gray-600 hover:text-anthracite transition-colors text-sm border rounded px-2 py-1 bg-white/70 dark:bg-gray-800 dark:text-gray-200"
      aria-label={t('toggleTheme')}
      title={t('toggleTheme')}
    >
      {theme === 'dark' ? t('themeLight') : t('themeDark')}
    </button>
  );
};

export default ThemeToggle;