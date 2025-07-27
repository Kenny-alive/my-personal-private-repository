import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { MemoryRouter } from 'react-router';

describe('NotFound component', () => {
  test('renders 404 message and link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /404 — page not found/i
    );

    expect(
      screen.getByText(/the page you are looking for does not exist/i)
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /back to app/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
