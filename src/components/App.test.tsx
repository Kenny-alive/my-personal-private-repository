import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';

jest.mock('./TopSection', () => () => <div data-testid="top-section" />);
jest.mock('./BottomSection', () => () => <div data-testid="bottom-section" />);
jest.mock('./ErrorButton', () => () => (
  <button data-testid="error-button">Error</button>
));

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ books: [] }),
  }) as jest.MockedFunction<typeof fetch>;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders App and fetches data on mount', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByTestId('top-section')).toBeInTheDocument();
  expect(screen.getByTestId('bottom-section')).toBeInTheDocument();
  expect(screen.getByTestId('error-button')).toBeInTheDocument();

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  expect(global.fetch).toHaveBeenCalledWith(
    'https://stapi.co/api/v1/rest/book/search?pageNumber=0&pageSize=20',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: '',
    })
  );
});
