import { Component } from 'react';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
import ErrorButton from './ErrorButton';

interface BookBase {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

interface AppState {
  books: BookBase[];
  loading: boolean;
  error: string | null;
}

export default class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    books: [],
    loading: false,
    error: null,
  };

  handleSearch = async (searchTerm: string) => {
    this.setState({ loading: true, error: null, books: [] });

    try {
      const body = new URLSearchParams();
      if (searchTerm) body.append('title', searchTerm);

      const response = await fetch(
        `https://stapi.co/api/v1/rest/book/search?pageNumber=0&pageSize=20`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const books: BookBase[] = data.books || [];

      this.setState({ books, loading: false, error: null });
    } catch (err) {
      this.setState({
        loading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  render() {
    const { books, loading, error } = this.state;

    return (
      <>
        <TopSection onSearch={this.handleSearch} />
        <BottomSection books={books} loading={loading} error={error} />
        <ErrorButton />
      </>
    );
  }
}
