import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary - without console.error output', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test('renders children without errors', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('shows error message when child throws error', () => {
    const ProblemChild = () => {
      throw new Error('Error inside child');
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error inside child')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reload app/i })
    ).toBeInTheDocument();
  });
});
