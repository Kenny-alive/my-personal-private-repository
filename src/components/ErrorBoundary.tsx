import { Component } from 'react';
import type { ReactElement } from 'react';

interface ErrorBoundaryProps {
  children: ReactElement;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught an error:', error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
          <img
            src="/images/Error.gif"
            alt="Error illustration"
            className="w-60 h-auto mb-6"
          />
          <p className="text-lg text-gray-800 mb-6">
            {this.state.error.message}
          </p>
          <button
            onClick={this.handleReload}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
