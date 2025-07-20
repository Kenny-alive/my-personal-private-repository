import { render, screen, fireEvent } from '@testing-library/react';
import TopSection from './TopSection';

jest.mock('./Header', () => () => <div data-testid="header" />);

jest.mock('./SearchBar', () => {
  interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
  }

  return (props: SearchBarProps) => (
    <div>
      <input
        data-testid="search-input"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <button data-testid="search-button" onClick={props.onSearch}>
        Search
      </button>
    </div>
  );
});

describe('TopSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Header and SearchBar', () => {
    const mockSearch = jest.fn();
    render(<TopSection onSearch={mockSearch} />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  test('loads searchTerm from localStorage and triggers search on mount', () => {
    localStorage.setItem('searchTerm', 'enterprise');
    const mockSearch = jest.fn();

    render(<TopSection onSearch={mockSearch} />);

    expect(screen.getByTestId('search-input')).toHaveValue('enterprise');
    expect(mockSearch).toHaveBeenCalledWith('enterprise');
  });

  test('updates input value on change', () => {
    const mockSearch = jest.fn();
    render(<TopSection onSearch={mockSearch} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'spock' } });

    expect(input).toHaveValue('spock');
  });

  test('trims and searches on search button click', () => {
    const mockSearch = jest.fn();
    render(<TopSection onSearch={mockSearch} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: '  kirk  ' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('kirk');
    expect(localStorage.getItem('searchTerm')).toBe('kirk');
    expect(input).toHaveValue('kirk');
  });
});
