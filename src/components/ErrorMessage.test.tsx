import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage component', () => {
  test('renders the error message correctly', () => {
    const message = 'Something went wrong';

    render(<ErrorMessage message={message} />);

    expect(screen.getByText(`Error: ${message}`)).toBeInTheDocument();

    const container = screen.getByText(`Error: ${message}`).parentElement;
    expect(container).toHaveClass('text-red-600');
    expect(container).toHaveClass('text-center');
    expect(container).toHaveClass('min-h-[300px]');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
});
