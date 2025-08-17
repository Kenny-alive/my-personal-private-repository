import { ReactNode } from 'react';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from './navigation';
import ClientAppWrapper from '../../components/ClientAppWrapper';

type Locale = (typeof locales)[number];

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <ClientAppWrapper locale={locale} messages={messages}>
      {children}
    </ClientAppWrapper>
  );
}
