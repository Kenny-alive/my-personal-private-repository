import '../../main.css';
import { ClientOnly } from './client';

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return [{ slug: [] }, { slug: ['about'] }];
}

export default function Page() {
  return <ClientOnly />;
}
