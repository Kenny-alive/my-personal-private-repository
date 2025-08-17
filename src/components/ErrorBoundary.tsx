'use client';

import { Component, ReactNode } from 'react';
import ThemeContext from './ThemeProvider';
import { ReloadButton } from './ReloadButton';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;
  state: ErrorBoundaryState = { hasError: false, error: null };

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
    const { theme } = this.context || { theme: 'light' };

    if (this.state.hasError && this.state.error) {
      return (
        <div
          className={`flex flex-col items-center justify-center h-screen text-center p-6 ${
            theme === 'dark'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <img
            src="/images/Error.gif"
            alt="Error illustration"
            className="w-60 h-auto mb-6"
          />
          <p
            className={`text-lg mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            {this.state.error.message}
          </p>

          <ReloadButton onReload={this.handleReload} />
        </div>
      );
    }

    return this.props.children;
  }
}
