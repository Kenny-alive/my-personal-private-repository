import '../main.css';
import { ReactNode } from 'react';
import ClientProviders from '../components/ClientProviders';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>RSC: Really Slow Components</title>
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
