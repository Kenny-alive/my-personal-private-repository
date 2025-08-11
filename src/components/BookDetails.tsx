import type { BookBase } from './App';

interface Author {
  name: string;
}

interface Publisher {
  name: string;
}

interface DetailedBook extends BookBase {
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  numberOfPages?: number;
  authors?: Author[];
  publishers?: Publisher[];
}

interface BookDetailsProps {
  book: DetailedBook | null;
  loading: boolean;
  fetching?: boolean;
  error: string | null;
  onClose: () => void;
}

export default function BookDetails({
  book,
  loading,
  fetching,
  error,
  onClose,
}: BookDetailsProps) {
  if (loading) {
    return (
      <div
        className="p-4 text-blue-600 font-semibold"
        style={{ color: 'var(--link-color)' }}
      >
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 text-red-600 font-semibold"
        style={{
          color: 'var(--text-color)',
          backgroundColor: 'var(--bg-color)',
        }}
      >
        Error: {error}
      </div>
    );
  }

  if (!book) {
    return null;
  }

  const publishDate = book.publishedYear
    ? `${book.publishedYear}${book.publishedMonth ? '-' + String(book.publishedMonth).padStart(2, '0') : ''}${book.publishedDay ? '-' + String(book.publishedDay).padStart(2, '0') : ''}`
    : 'Unknown';

  const authors = book.authors?.map((a) => a.name).join(', ') || 'Unknown';

  const publishers =
    book.publishers?.map((p) => p.name).join(', ') || 'Unknown';

  return (
    <div
      className="p-4 min-h-screen"
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        borderColor: 'var(--border-color)',
      }}
    >
      {fetching && !loading && (
        <p className="mb-2 text-sm text-indigo-600 font-semibold">
          Updating book details...
        </p>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <button
          className="text-sm px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 dark:text-gray-900"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <p
        className="text-gray-800 mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        Published Date: {publishDate}
      </p>
      <p
        className="text-gray-800 mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        Pages: {book.numberOfPages ?? 'Unknown'}
      </p>
      <p
        className="text-gray-800 mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        Type: {book.novel ? 'Novel' : 'Other'}
      </p>
      <p
        className="text-gray-800 mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        Authors: {authors}
      </p>
      <p
        className="text-gray-800 mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        Publishers: {publishers}
      </p>
    </div>
  );
}
