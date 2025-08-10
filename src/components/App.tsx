import TopSection from './TopSection';
import BottomSection from './BottomSection';
import ErrorButton from './ErrorButton';
import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import BookDetails from './BookDetails';
import { useStore } from '../store/useStore';
import SelectedItemsFlyout from './SelectedItemFlyout';

import { useBooks } from './hooks/useBooks';
import { useBookDetails } from './hooks/useBookDetails';

export interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = searchParams.get('page');
  const page = Number(rawPage);
  const safePage = Number.isInteger(page) && page > 0 ? page : 1;

  const lastSearchRef = useRef<string>('');

  const selectedDetailUid = useStore((state) => state.selectedDetailUid);
  const setSelectedDetailUid = useStore((state) => state.setSelectedDetailUid);

  const {
    data: booksData,
    isLoading: booksLoading,
    isFetching: booksFetching,
    isError: booksErrorFlag,
    error: booksError,
    refetch,
  } = useBooks(lastSearchRef.current, safePage);

  const {
    data: detailData,
    isLoading: detailsLoading,
    isFetching: detailsFetching,
    isError: detailsErrorFlag,
    error: detailsError,
  } = useBookDetails(selectedDetailUid);

  useEffect(() => {
    const detailsUid = searchParams.get('details');
    if (detailsUid) {
      setSelectedDetailUid(detailsUid);
    }
  }, [searchParams, setSelectedDetailUid]);

  const onSelectBook = useCallback(
    (uid: string) => {
      setSelectedDetailUid(uid);
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('details', uid);
        return params;
      });
    },
    [setSelectedDetailUid, setSearchParams]
  );

  const closeDetails = () => {
    setSelectedDetailUid(null);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete('details');
      return params;
    });
  };

  const handleSearch = useCallback(
    (searchTerm: string) => {
      if (searchTerm !== lastSearchRef.current) {
        lastSearchRef.current = searchTerm;
        setSearchParams({ page: '1' });
      }
    },
    [setSearchParams]
  );

  const toPage = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(newPage));
      params.delete('details');
      return params;
    });
    setSelectedDetailUid(null);
  };

  const books = booksData?.books ?? [];
  const lastPage = booksData?.lastPage ?? false;

  return (
    <>
      <TopSection onSearch={handleSearch} />

      <div className="flex justify-center items-center my-4 gap-4">
        <button
          onClick={async () => {
            try {
              await refetch({ throwOnError: true });
            } catch (err) {
              console.error('Refetch error', err);
            }
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Refresh Books
        </button>

        <div className="min-w-[200px]">
          {booksLoading && (
            <span className="flex items-center text-sm text-indigo-600 font-semibold block ml-4">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Fetching book list from server...
            </span>
          )}

          {!booksLoading && booksFetching && (
            <span className="flex items-center text-sm text-indigo-600 font-semibold block ml-4">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Updating book list...
            </span>
          )}

          {booksErrorFlag && (
            <span className="text-sm text-red-600 font-semibold block ml-4">
              Error: {(booksError as Error).message}
            </span>
          )}
        </div>
      </div>

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
              onClick={() => toPage(safePage - 1)}
              disabled={safePage <= 1}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span
              className="px-4 py-2 text-lg font-semibold"
              style={{ color: 'var(--text-color)' }}
            >
              Page {safePage}
            </span>
            <button
              onClick={() => toPage(safePage + 1)}
              disabled={lastPage || books.length === 0}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {selectedDetailUid && (
          <div
            className="w-1/3 border-gray-300 p-4 bg-white"
            style={{
              backgroundColor: 'var(--bg-color)',
              color: 'var(--text-color)',
            }}
          >
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
    </>
  );
}
