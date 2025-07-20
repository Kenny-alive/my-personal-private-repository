import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  test('renders with correct text and classes', () => {
    render(<Header />);

    expect(
      screen.getByText('React project setup. Class components. Error boundary.')
    ).toBeInTheDocument();

    const header = screen
      .getByText('React project setup. Class components. Error boundary.')
      .closest('header');

    expect(header).toHaveClass(
      'bg-gradient-to-r',
      'from-purple-600',
      'to-indigo-700',
      'text-white',
      'py-6',
      'shadow-md',
      'text-center'
    );
  });
});
