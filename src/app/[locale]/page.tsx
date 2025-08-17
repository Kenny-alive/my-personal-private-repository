import { fetchBooksServer } from '../../components/hooks/useBooks';
import { fetchBookDetailsServer } from '../../components/hooks/useBookDetails';
import App from '../../components/App';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return [{}];
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] }>;
}) {
  const paramsObj = searchParams ? await searchParams : {};

  const getFirst = (param?: string | string[]): string | null =>
    param == null ? null : Array.isArray(param) ? param[0] : param;

  const rawPage = getFirst(paramsObj?.page) ?? '1';
  const safePage = Number(rawPage) > 0 ? Number(rawPage) : 1;

  const searchTerm = getFirst(paramsObj?.q) ?? '';
  const selectedDetailUid = getFirst(paramsObj?.details) ?? null;

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

  return (
    <App
      dehydratedState={dehydratedState}
      safePage={safePage}
      initialSearchTerm={searchTerm}
      selectedDetailUidFromServer={selectedDetailUid}
    />
  );
}
