import Card from './Card';

interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

interface CardListProps {
  books: BookBase[];
}

function CardList(props: CardListProps) {
  const { books } = props;

  return (
    <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-50 min-h-screen">
      {books.map((book) => (
        <Card key={book.uid} {...book} />
      ))}
    </div>
  );
}

export default CardList;
