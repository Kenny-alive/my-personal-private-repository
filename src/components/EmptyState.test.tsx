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
});
