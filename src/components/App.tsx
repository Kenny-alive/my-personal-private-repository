import TopSection from './TopSection';
import BottomSection from './BottomSection';
import ErrorButton from './ErrorButton';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router';
import BookDetails from './BookDetails';

export interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

export default function App() {
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<BookBase[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get('page');
  const page = Number(rawPage);
  const safePage = Number.isInteger(page) && page > 0 ? page : 1;

  const lastSearchRef = useRef<string>('');

  const [selectedBookUid, setSelectedBookUid] = useState<string | null>(null);
  const [bookDetails, setBookDetails] = useState<BookBase | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const onSelectBook = useCallback(
    (uid: string) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('details', uid);
        return params;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    const uid = searchParams.get('details');
    if (uid) {
      setSelectedBookUid(uid);
      setDetailsLoading(true);
      setDetailsError(null);

      fetch(`https://stapi.co/api/v1/rest/book?uid=${uid}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setBookDetails(data.book);
          setDetailsLoading(false);
        })
        .catch((err) => {
          setDetailsError(err.message);
          setDetailsLoading(false);
        });
    } else {
      setSelectedBookUid(null);
      setBookDetails(null);
      setDetailsError(null);
    }
  }, [searchParams]);

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (searchTerm !== lastSearchRef.current) {
        setSearchParams({ page: '1' });
        lastSearchRef.current = searchTerm;
        return;
      }

      setLoading(true);
      setError(null);
      setBooks([]);

      try {
        const body = new URLSearchParams();
        if (searchTerm) body.append('title', searchTerm);

        const response = await fetch(
          `https://stapi.co/api/v1/rest/book/search?pageNumber=${safePage - 1}&pageSize=20`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          }
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        const fetchedBooks: BookBase[] = data.books || [];
        setBooks(fetchedBooks);
        setLastPage(data.lastPage || false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [safePage, setSearchParams]
  );

  useEffect(() => {
    const uid = searchParams.get('details');
    if (uid && uid !== selectedBookUid) {
      onSelectBook(uid);
    } else if (!uid) {
      setSelectedBookUid(null);
      setBookDetails(null);
      setDetailsError(null);
    }
  }, [searchParams, onSelectBook, selectedBookUid]);

  useEffect(() => {
    handleSearch(lastSearchRef.current);
  }, [handleSearch]);

  const toPage = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(newPage));
      params.delete('details');
      return params;
    });
  };

  const closeDetails = () => {
    setSelectedBookUid(null);
    setBookDetails(null);
    setDetailsError(null);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete('details');
      return params;
    });
  };

  return (
    <>
      <TopSection onSearch={handleSearch} />

      <div className="flex min-h-[70vh]">
        <div className="flex-1 pr-4">
          <BottomSection
            books={books}
            loading={loading}
            error={error}
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
            <span className="px-4 py-2 text-lg font-semibold">
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

        {selectedBookUid && (
          <div className="w-1/3 border-l border-gray-300 p-4 bg-white">
            <BookDetails
              book={bookDetails}
              loading={detailsLoading}
              error={detailsError}
              onClose={closeDetails}
            />
          </div>
        )}
      </div>

      <ErrorButton />
    </>
  );
}
