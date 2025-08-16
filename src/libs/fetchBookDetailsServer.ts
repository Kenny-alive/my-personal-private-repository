import type { DetailedBook } from '../components/BookDetails';

export async function fetchBookDetailsServer(
  uid: string
): Promise<{ book: DetailedBook }> {
  const res = await fetch(`https://stapi.co/api/v1/rest/book?uid=${uid}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Error fetching book details: ${res.status}`);
  return res.json();
}
