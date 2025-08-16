'use client';

import dynamic from 'next/dynamic';
import '../../main.css';
import type { BookBase } from '../components/App';
import type { DetailedBook } from '../components/BookDetails';

export interface ClientOnlyProps {
  booksData: { books: BookBase[]; lastPage: boolean };
  detailData: { book: DetailedBook } | null;
  safePage: number;
  searchTerm: string;
  selectedDetailUid: string | null;
}

interface AppProps {
  serverBooksData: { books: BookBase[]; lastPage: boolean };
  serverDetailData: { book: DetailedBook } | null;
  safePage: number;
  initialSearchTerm: string;
  selectedDetailUidFromServer: string | null;
}

const App = dynamic<AppProps>(() => import('../components/App'), {
  ssr: false,
});

export function ClientOnly({
  booksData,
  detailData,
  safePage,
  searchTerm,
  selectedDetailUid,
}: ClientOnlyProps) {
  return (
    <App
      serverBooksData={booksData}
      serverDetailData={detailData}
      safePage={safePage}
      initialSearchTerm={searchTerm}
      selectedDetailUidFromServer={selectedDetailUid}
    />
  );
}
