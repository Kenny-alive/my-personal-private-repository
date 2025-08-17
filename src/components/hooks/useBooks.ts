import { useQuery } from '@tanstack/react-query';

export interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

interface BooksResponse {
  books: BookBase[];
  lastPage: boolean;
}

async function fetchBooks(
  searchTerm: string,
  page: number
): Promise<BooksResponse> {
  const body = new URLSearchParams();
  if (searchTerm) body.append('title', searchTerm);

  const res = await fetch(
    `https://stapi.co/api/v1/rest/book/search?pageNumber=${page - 1}&pageSize=20`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching books: ${res.status}`);
  }

  return res.json();
}

export function useBooks(searchTerm: string, page: number) {
  return useQuery({
    queryKey: ['books', { searchTerm, page }],
    queryFn: () => fetchBooks(searchTerm, page),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: true,
    refetchOnMount: true,
  });
}
export async function fetchBooksServer(searchTerm: string, page: number) {
  const body = new URLSearchParams();
  if (searchTerm) body.append('title', searchTerm);

  const res = await fetch(
    `https://stapi.co/api/v1/rest/book/search?pageNumber=${page - 1}&pageSize=20`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching books: ${res.status}`);
  }

  return res.json();
}
