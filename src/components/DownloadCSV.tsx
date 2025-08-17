'use client';

import { useTranslations } from 'next-intl';

interface DownloadCSVProps {
  csv: string;
  filename: string;
}

export function DownloadCSV({ csv, filename }: DownloadCSVProps) {
  const t = useTranslations('DownloadCSV');

  const handleDownload = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!csv}
      className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
    >
      {t('download')}
    </button>
  );
}
