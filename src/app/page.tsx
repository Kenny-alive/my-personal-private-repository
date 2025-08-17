import { redirect } from 'next/navigation';
import { defaultLocale } from './[locale]/navigation';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
