'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ErrorButton() {
  const [throwError, setThrowError] = useState(false);
  const t = useTranslations('ErrorButton');

  if (throwError) {
    throw new Error(t('throwMessage'));
  }

  return (
    <button
      onClick={() => setThrowError(true)}
      className="fixed bottom-20 right-4 px-4 py-2 bg-red-600 text-white rounded shadow-md
                 transition duration-300 hover:bg-red-700 hover:scale-105 cursor-pointer"
    >
      {t('buttonLabel')}
    </button>
  );
}
