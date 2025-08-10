import { render, screen, fireEvent } from '@testing-library/react';
import { DownloadCSV } from './DownloadCSV';

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'blob:url');
  global.URL.revokeObjectURL = jest.fn(() => {});
});

describe('DownloadCSV', () => {
  test('button is disabled when csv is empty', () => {
    render(<DownloadCSV csv="" filename="test.csv" />);
    const button = screen.getByRole('button', { name: /download/i });
    expect(button).toBeDisabled();
  });

  test('button is enabled when csv is provided and triggers download on click', () => {
    render(<DownloadCSV csv="some,csv,data" filename="test.csv" />);
    const button = screen.getByRole('button', { name: /download/i });
    expect(button).toBeEnabled();

    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    fireEvent.click(button);

    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
