'use client';

import { useTranslations } from 'next-intl';

interface BookFetchStatusProps {
  loading: boolean;
  fetching: boolean;
  error?: Error | null;
  onRefetch: () => void;
}

export default function BookFetchStatus({
  loading,
  fetching,
  error,
  onRefetch,
}: BookFetchStatusProps) {
  const t = useTranslations('App');

  return (
    <div className="flex justify-center items-center my-4 gap-4">
      <button
        onClick={async () => {
          try {
            await onRefetch();
          } catch (err) {
            console.error('Refetch error', err);
          }
        }}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {t('refresh')}
      </button>

      <div className="min-w-[200px]">
        {loading && (
          <span className="flex items-center text-sm text-indigo-600 font-semibold block ml-4">
            {t('fetchingBooks', { default: 'Fetching book list...' })}
          </span>
        )}
        {!loading && fetching && (
          <span className="flex items-center text-sm text-indigo-600 font-semibold block ml-4">
            {t('updatingBooks', { default: 'Updating book list...' })}
          </span>
        )}
        {error && (
          <span className="text-sm text-red-600 font-semibold block ml-4">
            {t('error', { message: error.message || t('defaultError') })}
          </span>
        )}
      </div>
    </div>
  );
}
