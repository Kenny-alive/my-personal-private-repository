import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading component', () => {
  test('renders loading text', () => {
    render(<Loading />);
    const text = screen.getByText(/loading/i);
    expect(text).toBeInTheDocument();
  });

  test('renders spinner div', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
