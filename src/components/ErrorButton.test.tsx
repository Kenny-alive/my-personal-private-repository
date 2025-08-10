import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../components/ErrorButton';
import React from 'react';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

class TestErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div data-testid="fallback-ui">Fallback UI</div>;
    }
    return this.props.children;
  }
}

describe('ErrorButton', () => {
  test('renders without crashing initially', () => {
    render(
      <TestErrorBoundary>
        <ErrorButton />
      </TestErrorBoundary>
    );
    expect(
      screen.getByRole('button', { name: /error button/i })
    ).toBeInTheDocument();
  });

  test('throws error when clicked and triggers fallback UI', () => {
    render(
      <TestErrorBoundary>
        <ErrorButton />
      </TestErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /error button/i });
    fireEvent.click(button);

    expect(screen.getByTestId('fallback-ui')).toBeInTheDocument();
  });
});
