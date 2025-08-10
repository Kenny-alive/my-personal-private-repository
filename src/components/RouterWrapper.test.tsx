import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RouterWrapper from './RouterWrapper';

jest.mock('./App', () => () => <div data-testid="app">App Component</div>);
jest.mock('./About', () => () => <div>About Page</div>);

describe('RouterWrapper', () => {
  test('renders App component at root path "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RouterWrapper />
      </MemoryRouter>
    );

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  test('renders About component at path "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <RouterWrapper />
      </MemoryRouter>
    );

    expect(screen.getByText(/about page/i)).toBeInTheDocument();
  });

  test('renders NotFound component for unknown paths', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <RouterWrapper />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 — page not found/i)).toBeInTheDocument();
  });
});
