'use client';

import TopSection from './TopSection';
import BottomSection from './BottomSection';
import ErrorButton from './ErrorButton';
import BookFetchStatus from './BookFetchStatus';
import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BookDetails from './BookDetails';
import { useStore } from '../store/useStore';
import SelectedItemsFlyout from './SelectedItemFlyout';
import { useBooks } from './hooks/useBooks';
import { useBookDetails } from './hooks/useBookDetails';
import { DehydratedState } from '@tanstack/react-query';
import ClientProviders from './ClientProviders';
import { useTranslations } from 'next-intl';

export interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

interface AppProps {
  safePage: number;
  initialSearchTerm: string;
  selectedDetailUidFromServer: string | null;
  dehydratedState?: DehydratedState;
}

export default function App({
  safePage: safePageFromServer,
  initialSearchTerm,
  selectedDetailUidFromServer,
  dehydratedState,
}: AppProps) {
  const t = useTranslations('App');
  const searchParams = useSearchParams();
  const router = useRouter();

  const lastSearchRef = useRef<string>(initialSearchTerm);

  const selectedDetailUid = useStore(
    (state) => state.selectedDetailUid ?? selectedDetailUidFromServer
  );
  const setSelectedDetailUid = useStore((state) => state.setSelectedDetailUid);

  const {
    data: booksData,
    isLoading: booksLoading,
    isFetching: booksFetching,
    isError: booksErrorFlag,
    error: booksError,
    refetch,
  } = useBooks(lastSearchRef.current, safePageFromServer);

  const {
    data: detailData,
    isLoading: detailsLoading,
    isFetching: detailsFetching,
    isError: detailsErrorFlag,
    error: detailsError,
  } = useBookDetails(selectedDetailUid);

  useEffect(() => {
    const detailsUid = searchParams.get('details');
    if (detailsUid) setSelectedDetailUid(detailsUid);
  }, [searchParams, setSelectedDetailUid]);

  const onSelectBook = useCallback(
    (uid: string) => {
      setSelectedDetailUid(uid);
      const params = new URLSearchParams(searchParams.toString());
      params.set('details', uid);
      router.push(`/?${params.toString()}`);
    },
    [setSelectedDetailUid, searchParams, router]
  );

  const closeDetails = () => {
    setSelectedDetailUid(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`);
  };

  const handleSearch = useCallback(
    (searchTerm: string) => {
      if (searchTerm !== lastSearchRef.current) {
        lastSearchRef.current = searchTerm;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        router.push(`/?${params.toString()}`);
      }
    },
    [searchParams, router]
  );

  const toPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    params.delete('details');
    router.push(`/?${params.toString()}`);
    setSelectedDetailUid(null);
  };

  const books = booksData?.books ?? [];
  const lastPage = booksData?.lastPage ?? false;

  return (
    <ClientProviders dehydratedState={dehydratedState}>
      <TopSection onSearch={handleSearch} />

      <BookFetchStatus
        loading={booksLoading}
        fetching={booksFetching}
        error={booksErrorFlag ? (booksError as Error) : null}
        onRefetch={() => {
          refetch().catch((err) => console.error('Refetch error', err));
        }}
      />

      <div className="flex min-h-[70vh] pb-28">
        <div className="flex-1 pr-4">
          <BottomSection
            books={books}
            loading={booksLoading || booksFetching}
            error={booksErrorFlag ? (booksError as Error).message : null}
            onSelectBook={onSelectBook}
          />

          <div className="flex justify-center gap-4 py-6">
            <button
              onClick={() => toPage(safePageFromServer - 1)}
              disabled={safePageFromServer <= 1}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {t('previous')}
            </button>

            <span className="px-4 py-2 text-lg font-semibold">
              {t('page', { page: safePageFromServer })}
            </span>

            <button
              onClick={() => toPage(safePageFromServer + 1)}
              disabled={lastPage || books.length === 0}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {t('next')}
            </button>
          </div>
        </div>

        {selectedDetailUid && (
          <div className="w-1/3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <BookDetails
              book={detailData?.book ?? null}
              loading={detailsLoading}
              fetching={detailsFetching}
              error={detailsErrorFlag ? (detailsError as Error).message : null}
              onClose={closeDetails}
            />
          </div>
        )}
      </div>

      <ErrorButton />
      <SelectedItemsFlyout />
    </ClientProviders>
  );
}
