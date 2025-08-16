import '../main.css';
import { fetchBooksServer } from '../components/hooks/useBooks';
import { fetchBookDetailsServer } from '../components/hooks/useBookDetails';
import App from '../components/App';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return [{}];
}

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  // console.log('Rendering on server', typeof window === 'undefined');
  const params = await searchParams;
  const getFirst = (param?: string | string[]): string | null =>
    param == null ? null : Array.isArray(param) ? param[0] : param;

  const rawPage = getFirst(params?.page) ?? '1';
  const safePage = Number(rawPage) > 0 ? Number(rawPage) : 1;

  const searchTerm = getFirst(params?.q) ?? '';
  const selectedDetailUid = getFirst(params?.details) ?? null;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['books', { searchTerm, page: safePage }],
    queryFn: () => fetchBooksServer(searchTerm, safePage),
  });

  if (selectedDetailUid) {
    await queryClient.prefetchQuery({
      queryKey: ['bookDetails', selectedDetailUid],
      queryFn: () => fetchBookDetailsServer(selectedDetailUid),
    });
  }

  const dehydratedState: DehydratedState = dehydrate(queryClient);
  // console.log('Dehydrated state', JSON.stringify(dehydratedState));
  return (
    <App
      dehydratedState={dehydratedState}
      safePage={safePage}
      initialSearchTerm={searchTerm}
      selectedDetailUidFromServer={selectedDetailUid}
    />
  );
}
