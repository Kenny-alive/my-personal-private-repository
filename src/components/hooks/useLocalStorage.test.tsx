import { render, screen } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

function TestComponent() {
  const [value] = useLocalStorage('myKey', 'initial');
  return <div data-testid="value">{value}</div>;
}

test('useLocalStorage returns initial value when localStorage is empty', () => {
  localStorage.clear();
  render(<TestComponent />);
  expect(screen.getByTestId('value').textContent).toBe('initial');
});

test('useLocalStorage returns value from localStorage if present', () => {
  localStorage.setItem('myKey', 'stored');
  render(<TestComponent />);
  expect(screen.getByTestId('value').textContent).toBe('stored');
});
