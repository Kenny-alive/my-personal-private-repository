'use client';

import { Link } from './navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">{t('pageNotFound')}</p>
      <Link
        href="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition"
      >
        {t('goHome')}
      </Link>
    </div>
  );
}
