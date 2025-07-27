import { render, screen, fireEvent } from '@testing-library/react';
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
  default: ({ title, onClick }: { title: string; onClick: () => void }) => (
    <div data-testid="card" onClick={onClick}>
      {title}
    </div>
  ),
}));

describe('CardList', () => {
  const mockBooks: BookBase[] = [
    { uid: '1', title: 'Book One' },
    { uid: '2', title: 'Book Two' },
  ];

  test('renders list of Card components based on books prop', () => {
    const mockOnSelectBook = jest.fn();
    render(<CardList books={mockBooks} onSelectBook={mockOnSelectBook} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockBooks.length);
    expect(cards[0]).toHaveTextContent('Book One');
    expect(cards[1]).toHaveTextContent('Book Two');
  });

  test('renders empty when books prop is empty', () => {
    const mockOnSelectBook = jest.fn();
    render(<CardList books={[]} onSelectBook={mockOnSelectBook} />);
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  test('calls onSelectBook with correct uid when card is clicked', () => {
    const mockOnSelectBook = jest.fn();
    render(<CardList books={mockBooks} onSelectBook={mockOnSelectBook} />);

    const firstCard = screen.getAllByTestId('card')[0];
    fireEvent.click(firstCard);

    expect(mockOnSelectBook).toHaveBeenCalledTimes(1);
    expect(mockOnSelectBook).toHaveBeenCalledWith('1');
  });
});
