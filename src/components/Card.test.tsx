import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  test('renders title only (minimal required props)', () => {
    render(<Card uid="1" title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders publishedYearFrom when provided', () => {
    render(<Card uid="2" title="Book Title" publishedYearFrom={1999} />);

    expect(screen.getByText(/Published: 1999/)).toBeInTheDocument();
  });

  test('renders novel type as "Novel"', () => {
    render(<Card uid="3" title="Novel Book" novel={true} />);

    expect(screen.getByText(/Type: Novel/)).toBeInTheDocument();
  });

  test('renders novel type as "Other"', () => {
    render(<Card uid="4" title="Other Book" novel={false} />);

    expect(screen.getByText(/Type: Other/)).toBeInTheDocument();
  });

  test('renders description when provided', () => {
    render(
      <Card
        uid="5"
        title="Desc Book"
        description="This is a book description."
      />
    );

    expect(screen.getByText(/This is a book description/)).toBeInTheDocument();
  });
});
