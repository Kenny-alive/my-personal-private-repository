import { render, screen } from '@testing-library/react';
import BottomSection from '../components/BottomSection';

type BookBase = {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
};

describe('BottomSection', () => {
  const sampleBooks: BookBase[] = [
    { uid: '1', title: 'Book One' },
    { uid: '2', title: 'Book Two' },
  ];

  test('renders loading indicator when loading is true', () => {
    render(<BottomSection books={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error message when error is present', () => {
    render(
      <BottomSection books={[]} loading={false} error="Something went wrong" />
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('renders empty state when no books', () => {
    render(<BottomSection books={[]} loading={false} error={null} />);
    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
  });

  test('renders list of books when data is present', () => {
    render(<BottomSection books={sampleBooks} loading={false} error={null} />);
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });
});
