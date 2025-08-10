import { useEffect } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import { useLocalStorage } from './hooks/useLocalStorage';

interface TopSectionProps {
  onSearch: (searchTerm: string) => void;
}

export default function TopSection({ onSearch }: TopSectionProps) {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim());
    }
  }, [onSearch, searchTerm]);
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };
  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    setSearchTerm(trimmed);
    onSearch(trimmed);
  };
  return (
    <>
      <Header />
      <SearchBar
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
    </>
  );
}
