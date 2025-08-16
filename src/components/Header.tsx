import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';

function Header() {
  const { theme, toggleTheme } = useTheme();

  const [headerText, setHeaderText] = useState('Rendering on server');

  useEffect(() => {
    setHeaderText('React hydration, rendering on client');
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-6 shadow-md flex justify-between items-center px-8">
      <h1 className="text-3xl font-extrabold tracking-wide text-orange-400 animate-[pulse_1.5s_ease-in-out_infinite]">
        {headerText}
      </h1>
      <nav className="flex gap-4 items-center">
        <Link
          href="/about"
          className="text-indigo-100 dark:text-white text-lg font-bold rounded-md px-5 py-2 border-2 border-indigo-100 dark:border-white shadow hover:bg-white hover:text-indigo-700 transition duration-300 ease-in-out active:scale-95"
        >
          About
        </Link>
        <button
          onClick={toggleTheme}
          className="text-indigo-100 dark:text-white text-lg font-bold rounded-md px-5 py-2 border-2 border-indigo-100 dark:border-white shadow hover:bg-white hover:text-indigo-700 transition duration-300 ease-in-out active:scale-95"
          type="button"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
