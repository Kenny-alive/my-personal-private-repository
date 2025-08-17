'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import {
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';
import { queryClient } from '../libs/queryClient';
import ErrorBoundary from './ErrorBoundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface ClientProvidersProps {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}

export default function ClientProviders({
  children,
  dehydratedState,
}: ClientProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ThemeProvider>
          <ErrorBoundary>
            {children}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </ErrorBoundary>
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
