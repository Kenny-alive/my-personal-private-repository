import TopSection from './TopSection';
import BottomSection from './BottomSection';
import ErrorButton from './ErrorButton';
import { useEffect, useState, useCallback } from 'react';

interface BookBase {
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

  const handleSearch = useCallback(async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      const body = new URLSearchParams();
      if (searchTerm) body.append('title', searchTerm);

      const response = await fetch(
        'https://stapi.co/api/v1/rest/book/search?pageNumber=0&pageSize=20',
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSearch('');
  }, [handleSearch]);

  return (
    <>
      <TopSection onSearch={handleSearch} />
      <BottomSection books={books} loading={loading} error={error} />
      <ErrorButton />
    </>
  );
}
