import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import RouterWrapper from './components/RouterWrapper';
import './main.css';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <RouterWrapper />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
