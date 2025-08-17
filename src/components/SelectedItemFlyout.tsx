'use client';

import { useStore } from '../store/useStore';
import { DownloadCSV } from './DownloadCSV';
import { GenerateCSVServer } from './GenerateCSVServer';
import { useTranslations } from 'next-intl';

export default function SelectedItemsFlyout() {
  const selectedItems = useStore((state) => state.selectedItems);
  const unselectAll = useStore((state) => state.unselectAll);
  const selectedCount = Object.keys(selectedItems).length;

  const t = useTranslations('SelectedItemsFlyout');

  if (selectedCount === 0) return null;

  const filename = String(t('filename', { count: selectedCount }));

  return (
    <GenerateCSVServer items={selectedItems}>
      {(csv) => (
        <div
          className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <div>
            {t('selectedCount', {
              count: selectedCount,
            })}
          </div>
          <div className="flex gap-4">
            <button
              onClick={unselectAll}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              {t('unselectAll')}
            </button>
            <DownloadCSV csv={csv} filename={filename} />
          </div>
        </div>
      )}
    </GenerateCSVServer>
  );
}
