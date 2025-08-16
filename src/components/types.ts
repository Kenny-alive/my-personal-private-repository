export interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

export interface BooksData {
  books: BookBase[];
  lastPage: boolean;
}

export interface BookDetailData {
  book: BookBase;
}
