import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import RouterWrapper from './components/RouterWrapper';
import './main.css';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <RouterWrapper />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
