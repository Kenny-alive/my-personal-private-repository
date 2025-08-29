import React from 'react';
import CountryCard from './CountryCard';
import { countryList } from './CountryList';

const App: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {countryList.map((country) => (
        <CountryCard key={country.iso_code} country={country} />
      ))}
    </div>
  );
};

export default App;
