import { render, screen } from '@testing-library/react';
import CardList from './CardList';

interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

jest.mock('./Card', () => ({
  __esModule: true,
  default: ({ title }: BookBase) => <div data-testid="card">{title}</div>,
}));

describe('CardList', () => {
  test('renders list of Card components based on books prop', () => {
    const mockBooks: BookBase[] = [
      { uid: '1', title: 'Book One' },
      { uid: '2', title: 'Book Two' },
    ];

    render(<CardList books={mockBooks} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockBooks.length);
    expect(cards[0]).toHaveTextContent('Book One');
    expect(cards[1]).toHaveTextContent('Book Two');
  });

  test('renders empty when books prop is empty', () => {
    render(<CardList books={[]} />);
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });
});
