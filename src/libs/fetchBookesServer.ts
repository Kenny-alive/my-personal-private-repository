import type { BookBase } from '../components/App';

export interface BooksResponse {
  books: BookBase[];
  lastPage: boolean;
}

export async function fetchBooksServer(
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
      cache: 'no-store',
    }
  );

  if (!res.ok) throw new Error(`Error fetching books: ${res.status}`);
  return res.json();
}
