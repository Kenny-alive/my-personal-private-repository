import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App, { BookBase } from './App';

jest.mock('./TopSection', () => () => <div data-testid="top-section" />);

jest.mock(
  './BottomSection',
  () =>
    function BottomSectionMock(props: {
      books: BookBase[];
      loading?: boolean;
      error?: string | null;
      onSelectBook: (uid: string) => void;
    }) {
      return (
        <div data-testid="bottom-section">
          {props.books.map((b) => (
            <button key={b.uid} onClick={() => props.onSelectBook(b.uid)}>
              {b.title}
            </button>
          ))}
        </div>
      );
    }
);

jest.mock('./ErrorButton', () => () => (
  <button data-testid="error-button">Error</button>
));

const setSearchParamsMock = jest.fn();
const getSearchParamsMock = jest.fn(() => new URLSearchParams());

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useSearchParams: () => [getSearchParamsMock(), setSearchParamsMock],
}));

beforeEach(() => {
  (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ books: [] }),
  });
  setSearchParamsMock.mockClear();
  getSearchParamsMock.mockClear();
});

afterEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

test('renders App and fetches data on mount', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId('top-section')).toBeInTheDocument();
  expect(screen.getByTestId('bottom-section')).toBeInTheDocument();
  expect(screen.getByTestId('error-button')).toBeInTheDocument();

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/book/search?pageNumber=0&pageSize=20',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: '',
      })
    );
  });
});

test('pagination buttons call setSearchParams correctly', async () => {
  getSearchParamsMock.mockReturnValue(new URLSearchParams('page=2'));

  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      books: [{ uid: '1', title: 'Test Book' }],
      lastPage: false,
    }),
  });

  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  const prevButton = screen.getByText(/Previous/i);
  const nextButton = screen.getByText(/Next/i);

  expect(prevButton).not.toBeDisabled();
  expect(nextButton).not.toBeDisabled();

  await act(async () => {
    fireEvent.click(prevButton);
  });
  expect(setSearchParamsMock).toHaveBeenCalledWith(expect.any(Function));

  await act(async () => {
    fireEvent.click(nextButton);
  });
  expect(setSearchParamsMock).toHaveBeenCalledTimes(2);
});
