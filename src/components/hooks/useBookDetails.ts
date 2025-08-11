import { useQuery } from '@tanstack/react-query';

interface DetailedBook {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
  publishedYear?: number;
  publishedMonth?: number;
  publishedDay?: number;
  numberOfPages?: number;
  authors?: { name: string }[];
  publishers?: { name: string }[];
}

async function fetchBookDetails(uid: string): Promise<{ book: DetailedBook }> {
  const res = await fetch(`https://stapi.co/api/v1/rest/book?uid=${uid}`);
  if (!res.ok) {
    throw new Error(`Error fetching book details: ${res.status}`);
  }
  return res.json();
}

export function useBookDetails(uid: string | null) {
  return useQuery({
    queryKey: ['bookDetails', uid],
    queryFn: () => {
      if (!uid) return Promise.reject('No UID');
      return fetchBookDetails(uid);
    },
    enabled: !!uid,
    staleTime: 3 * 60 * 1000,
  });
}
