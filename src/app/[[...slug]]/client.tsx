'use client';

import dynamic from 'next/dynamic';
import '../../main.css';

const App = dynamic(() => import('../../components/App'), { ssr: false });

export function ClientOnly() {
  return <App />;
}
