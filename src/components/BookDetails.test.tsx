import { render, screen, fireEvent } from '@testing-library/react';
import BookDetails from './BookDetails';

describe('BookDetails', () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <BookDetails
        book={null}
        loading={true}
        error={null}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText(/loading book details/i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(
      <BookDetails
        book={null}
        loading={false}
        error="Failed to load"
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
  });

  test('renders nothing if no book and no loading/error', () => {
    const { container } = render(
      <BookDetails
        book={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('renders book details correctly', () => {
    const book = {
      uid: '1',
      title: 'Test Book',
      publishedYear: 2020,
      publishedMonth: 5,
      publishedDay: 15,
      numberOfPages: 123,
      novel: true,
      authors: [{ name: 'Author One' }, { name: 'Author Two' }],
      publishers: [{ name: 'Publisher One' }],
      description: 'Test description',
    };

    render(
      <BookDetails
        book={book}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Test Book'
    );
    expect(screen.getByText(/published date/i)).toHaveTextContent('2020-05-15');
    expect(screen.getByText(/pages/i)).toHaveTextContent('123');
    expect(screen.getByText(/type/i)).toHaveTextContent('Novel');
    expect(screen.getByText(/authors/i)).toHaveTextContent(
      'Author One, Author Two'
    );
    expect(screen.getByText(/publishers/i)).toHaveTextContent('Publisher One');
  });

  test('calls onClose when close button is clicked', () => {
    const book = { uid: '1', title: 'Test Book' };
    render(
      <BookDetails
        book={book}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByText(/close/i));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('shows "Unknown" when optional fields are missing', () => {
    const book = {
      uid: '1',
      title: 'No Details Book',
      novel: false,
      authors: [],
      publishers: [],
    };
    render(
      <BookDetails
        book={book}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/published date/i)).toHaveTextContent('Unknown');
    expect(screen.getByText(/pages/i)).toHaveTextContent('Unknown');
    expect(screen.getByText(/type/i)).toHaveTextContent('Other');
    expect(screen.getByText(/authors/i)).toHaveTextContent('Unknown');
    expect(screen.getByText(/publishers/i)).toHaveTextContent('Unknown');
  });
});
