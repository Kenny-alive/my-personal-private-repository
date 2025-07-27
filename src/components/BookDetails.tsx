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
  error: string | null;
  onClose: () => void;
}

export default function BookDetails({
  book,
  loading,
  error,
  onClose,
}: BookDetailsProps) {
  if (loading) {
    return (
      <div className="p-4 text-blue-600 font-semibold">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 font-semibold">Error: {error}</div>;
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
    <div className="p-4 border-l border-gray-300 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <button
          className="text-sm px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <p className="text-gray-800 mb-2">Published Date: {publishDate}</p>
      <p className="text-gray-800 mb-2">
        Pages: {book.numberOfPages ?? 'Unknown'}
      </p>
      <p className="text-gray-800 mb-2">
        Type: {book.novel ? 'Novel' : 'Other'}
      </p>
      <p className="text-gray-800 mb-2">Authors: {authors}</p>
      <p className="text-gray-800 mb-2">Publishers: {publishers}</p>
    </div>
  );
}
