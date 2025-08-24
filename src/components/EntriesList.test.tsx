import { render, screen, act } from '@testing-library/react';
import { useStore, type Store } from '../store/store';
import { EntriesList } from '../components/EntriesList';

jest.mock('../store/store');
const mockedUseStore = useStore as jest.MockedFunction<typeof useStore>;

describe('EntriesList', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders entries and highlights last entry temporarily', () => {
    const fakeEntries: Store['entries'] = [
      {
        id: '1',
        name: 'Alice',
        age: 25,
        email: 'alice@example.com',
        gender: 'female',
        country: 'USA',
      },
      {
        id: '2',
        name: 'Bob',
        age: 30,
        email: 'bob@example.com',
        gender: 'male',
        country: 'Canada',
      },
    ];

    mockedUseStore.mockImplementation((selector) =>
      selector({ entries: fakeEntries, countries: [], addEntry: jest.fn() })
    );

    render(<EntriesList />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();

    const bobCard = screen.getByText('Bob').closest('div')!;
    expect(bobCard).toHaveClass('bg-green-200');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(bobCard).not.toHaveClass('bg-green-200');
  });
});
