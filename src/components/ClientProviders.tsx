'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../libs/queryClient';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
