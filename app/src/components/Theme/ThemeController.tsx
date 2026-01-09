import { useEffect } from 'react';
import { useStore } from '../../store';

export default function ThemeController() {
  const { theme } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t: 'light' | 'dark' | 'system') => {
      let resolvedTheme = t;
      if (t === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      root.setAttribute('data-theme', resolvedTheme);
      localStorage.setItem('theme', t);
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return null;
}
