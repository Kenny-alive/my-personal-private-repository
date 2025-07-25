import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
import CardList from './CardList';

export interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

interface BottomSectionProps {
  books: BookBase[];
  loading: boolean;
  error: string | null;
}

export default function BottomSection({
  books,
  loading,
  error,
}: BottomSectionProps) {
  const booksToRender = books.slice(0, 20);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (books.length === 0) return <EmptyState />;

  return <CardList books={booksToRender} />;
}
