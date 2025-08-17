'use client';

import { Link } from './../navigation';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
      }}
    >
      <h1
        className="text-5xl font-extrabold mb-6"
        style={{ color: 'var(--link-color)' }}
      >
        {t('title')}
      </h1>

      <p className="text-xl mb-4 max-w-xl">
        {t('createdByBefore')}{' '}
        <a
          href="https://github.com/Kenny-alive"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 font-semibold underline hover:text-indigo-800 transition"
        >
          {t('creatorName')}
        </a>
        {t('createdByAfter')}
      </p>

      <p className="text-lg max-w-lg">
        {t('partOfBefore')}{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline hover:text-indigo-800 transition"
        >
          {t('courseName')}
        </a>
        {t('partOfAfter')}
      </p>

      <Link
        href="/"
        className="
          mt-4
          inline-flex
          items-center
          text-indigo-700
          text-lg
          font-semibold
          px-5
          py-2
          border-2
          border-indigo-700
          rounded-full
          hover:bg-indigo-700
          hover:text-white
          transition
          duration-300
          ease-in-out
          active:scale-95
        "
        style={{ color: 'var(--link-color)', borderColor: 'var(--link-color)' }}
      >
        <span className="mr-2 text-2xl">←</span>
        {t('backToApp')}
      </Link>
    </div>
  );
}
