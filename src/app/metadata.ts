import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Next.js SSR App',
  description:
    'Application migrated from Vite to Next.js with SSR, i18n, and server-side rendering.',
  icons: {
    icon: '/vite.svg',
  },
  alternates: {
    canonical: 'http://localhost:3000',
    languages: {
      en: '/en',
      ru: '/ru',
    },
  },
};
