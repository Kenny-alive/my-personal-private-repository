import { Component } from 'react';
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

export default class CardList extends Component<CardListProps> {
  render() {
    const { books } = this.props;

    return (
      <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-50 min-h-screen">
        {books.map((book) => (
          <Card key={book.uid} {...book} />
        ))}
      </div>
    );
  }
}
