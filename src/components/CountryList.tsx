import React, { useState, useMemo, useCallback } from 'react';
import CountryCard from './CountryCard';
import { countriesResource } from '../utils/countryResource';

const CountryList: React.FC = () => {
  const countries = countriesResource.read();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedCountries = useMemo(() => {
    return [...countries]
      .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === 'population') {
          const aPop = a.data[a.data.length - 1].population || 0;
          const bPop = b.data[b.data.length - 1].population || 0;
          return sortOrder === 'asc' ? aPop - bPop : bPop - aPop;
        }
        return 0;
      });
  }, [countries, searchTerm, sortBy, sortOrder]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    []
  );

  const handleSortByChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSortBy(e.target.value as 'name' | 'population'),
    []
  );

  const handleSortOrderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSortOrder(e.target.value as 'asc' | 'desc'),
    []
  );

  return (
    <div>
      <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded">
        <input
          type="text"
          placeholder="Search by country name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border px-2 py-1 rounded w-1/3"
        />

        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="border px-2 py-1 rounded"
        >
          <option value="name">Name</option>
          <option value="population">Population</option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="border px-2 py-1 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredAndSortedCountries.map((country) => (
          <CountryCard
            key={country.iso_code || country.name}
            country={country}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CountryList);
