import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  test('renders correct message', () => {
    render(<EmptyState />);

    expect(screen.getByText(/No books found/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Try a different search term or clear the input/i)
    ).toBeInTheDocument();
  });

  test('has correct styles applied', () => {
    render(<EmptyState />);

    const title = screen.getByText(/No books found/i);
    expect(title).toHaveClass('text-6xl');
    expect(title).toHaveClass('font-extrabold');
    expect(title).toHaveClass('bg-clip-text');
    expect(title).toHaveClass('text-transparent');

    const container = title.closest('div');
    expect(container).toHaveClass('flex', 'items-center', 'justify-center');
  });
});
