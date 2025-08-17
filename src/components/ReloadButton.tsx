'use client';

import { useTranslations } from 'next-intl';

interface ReloadButtonProps {
  onReload: () => void;
}

export function ReloadButton({ onReload }: ReloadButtonProps) {
  const t = useTranslations('ErrorBoundary');

  return (
    <button
      onClick={onReload}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
    >
      {t('reload')}
    </button>
  );
}
