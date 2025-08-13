import { ReactNode } from 'react';
import ClientProviders from '../components/ClientProviders';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <title>Functional Components</title>
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
