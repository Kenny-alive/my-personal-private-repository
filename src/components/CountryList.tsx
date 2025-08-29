import React from 'react';
import CountryCard from './CountryCard';

import { countriesResource } from '../utils/countryResource';

const CountryList: React.FC = () => {
  const countries = countriesResource.read();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.iso_code || country.name} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
