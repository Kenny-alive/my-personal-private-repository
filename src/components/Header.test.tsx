import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router';

describe('Header component', () => {
  test('renders with correct text and classes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('React: Routing and Hooks')).toBeInTheDocument();

    const header = screen
      .getByText('React: Routing and Hooks')
      .closest('header');

    expect(header).toHaveClass(
      'bg-gradient-to-r',
      'from-purple-600',
      'to-indigo-700',
      'text-white',
      'py-6',
      'shadow-md',
      'flex',
      'justify-between',
      'items-center',
      'px-8'
    );
  });
});
