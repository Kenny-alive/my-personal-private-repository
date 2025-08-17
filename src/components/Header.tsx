'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] === 'ru' ? 'ru' : 'en';

  const [headerText, setHeaderText] = useState(t('serverText'));

  useEffect(() => {
    setHeaderText(t('clientText'));
  }, [t]);

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'ru' : 'en';
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'en' || segments[0] === 'ru') {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = '/' + segments.join('/');
    router.push(newPath);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-6 shadow-md flex justify-between items-center px-8">
      <h1 className="text-3xl font-extrabold tracking-wide text-orange-400 animate-[pulse_1.5s_ease-in-out_infinite]">
        {headerText}
      </h1>
      <nav className="flex gap-4 items-center">
        <Link
          href={`/${currentLocale}/about`}
          className="text-indigo-100 dark:text-white text-lg font-bold rounded-md px-5 py-2 border-2 border-indigo-100 dark:border-white shadow hover:bg-white hover:text-indigo-700 transition duration-300 ease-in-out active:scale-95"
        >
          {t('about')}
        </Link>

        <button
          onClick={toggleTheme}
          className="text-indigo-100 dark:text-white text-lg font-bold rounded-md px-5 py-2 border-2 border-indigo-100 dark:border-white shadow hover:bg-white hover:text-indigo-700 transition duration-300 ease-in-out active:scale-95"
        >
          {theme === 'light' ? t('darkMode') : t('lightMode')}
        </button>

        <button
          onClick={switchLocale}
          className="text-indigo-100 dark:text-white text-lg font-bold rounded-md px-5 py-2 border-2 border-indigo-100 dark:border-white shadow hover:bg-white hover:text-indigo-700 transition duration-300 ease-in-out active:scale-95"
        >
          {t('localeButton')}
        </button>
      </nav>
    </header>
  );
}

export default Header;
