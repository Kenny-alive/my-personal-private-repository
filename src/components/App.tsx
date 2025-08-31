import React, { Suspense, useMemo } from 'react';
import { countriesResource } from '../utils/countryResource';
import LoadingFallback from './LoadingFallback';
import YearSelector from './YearSelector';
import CountryList from './CountryList';

const App: React.FC = () => {
  const countries = countriesResource.read();
  const allYears = useMemo(
    () =>
      Array.from(
        new Set(countries.flatMap((c) => c.data.map((d) => d.year)))
      ).sort((a, b) => b - a),
    [countries]
  );
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
