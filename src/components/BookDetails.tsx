import type { BookBase } from './App';

interface Author {
  name: string;
}

interface Publisher {
  name: string;
}

export interface DetailedBook extends BookBase {
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
      <div className="p-4 text-blue-600 dark:text-blue-400 font-semibold">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 dark:text-red-400 font-semibold">
        Error: {error}
      </div>
    );
  }

  if (!book) return null;

  const publishDate = book.publishedYear
    ? `${book.publishedYear}${book.publishedMonth ? '-' + String(book.publishedMonth).padStart(2, '0') : ''}${book.publishedDay ? '-' + String(book.publishedDay).padStart(2, '0') : ''}`
    : 'Unknown';

  const authors = book.authors?.map((a) => a.name).join(', ') || 'Unknown';
  const publishers =
    book.publishers?.map((p) => p.name).join(', ') || 'Unknown';

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
      {fetching && !loading && (
        <p className="mb-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
          Updating book details...
        </p>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <button
          className="text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <p className="mb-2 text-gray-600 dark:text-gray-400">
        Published Date: {publishDate}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-400">
        Pages: {book.numberOfPages ?? 'Unknown'}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-400">
        Type: {book.novel ? 'Novel' : 'Other'}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-400">
        Authors: {authors}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-400">
        Publishers: {publishers}
      </p>
    </div>
  );
}
