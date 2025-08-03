import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const setup = () => {
    const onChangeMock = jest.fn();
    const onSearchMock = jest.fn();

    render(
      <SearchBar
        value="Enterprise"
        onChange={onChangeMock}
        onSearch={onSearchMock}
      />
    );

    const input = screen.getByPlaceholderText(/search star trek books/i);
    const button = screen.getByRole('button', { name: /search/i });

    return { input, button, onChangeMock, onSearchMock };
  };

  test('renders input with provided value', () => {
    const { input } = setup();
    expect(input).toHaveValue('Enterprise');
  });

  test('calls onChange when input value changes', () => {
    const { input, onChangeMock } = setup();
    fireEvent.change(input, { target: { value: 'Voyager' } });
    expect(onChangeMock).toHaveBeenCalledWith('Voyager');
  });

  test('calls onSearch when Enter key is pressed', () => {
    const { input, onSearchMock } = setup();
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onSearchMock).toHaveBeenCalled();
  });

  test('calls onSearch when search button is clicked', () => {
    const { button, onSearchMock } = setup();
    fireEvent.click(button);
    expect(onSearchMock).toHaveBeenCalled();
  });
});
