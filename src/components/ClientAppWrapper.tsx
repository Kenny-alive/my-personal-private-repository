'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import ClientProviders from './ClientProviders';

type Messages = {
  [key: string]: string | Messages;
};

interface Props {
  children: ReactNode;
  locale: string;
  messages: Messages;
}

export default function ClientAppWrapper({
  children,
  locale,
  messages,
}: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <ClientProviders>{children}</ClientProviders>
    </NextIntlClientProvider>
  );
}
