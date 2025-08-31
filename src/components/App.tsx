import React, { Suspense } from 'react';
import { countriesResource } from '../utils/countryResource';
import LoadingFallback from './LoadingFallback';
import YearSelector from './YearSelector';
import CountryList from './CountryList';

// const CountryList: React.FC = () => {
//   const countries = countriesResource.read();
//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//       {countries.map((country) => (
//         <CountryCard key={country.iso_code || country.name} country={country} />
//       ))}
//     </div>
//   );
// };

const App: React.FC = () => {
  const countries = countriesResource.read();
  const allYears = Array.from(
    new Set(countries.flatMap((c) => c.data.map((d) => d.year)))
  ).sort((a, b) => b - a);
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="p-6">
        <YearSelector years={allYears} />
        <CountryList />
      </div>
    </Suspense>
  );
};

export default App;
