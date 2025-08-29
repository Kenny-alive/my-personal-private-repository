import React from 'react';
import type { Country } from '../utils/fetchCountries';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const latestData = country.data[country.data.length - 1];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-blue-50">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🌍 {country.name}{' '}
        <span className="text-gray-500 text-base">
          ({country.iso_code ?? 'N/A'})
        </span>
      </h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="bg-gray-100 rounded px-3 py-1 text-sm font-medium">
          <strong>Year:</strong> {latestData.year}
        </div>
        <div className="bg-gray-100 rounded px-3 py-1 text-sm font-medium">
          <strong>Population:</strong>{' '}
          {latestData.population?.toLocaleString() ?? 'N/A'}
        </div>
        <div className="bg-gray-100 rounded px-3 py-1 text-sm font-medium">
          <strong>CO₂:</strong> {latestData.co2?.toLocaleString() ?? 'N/A'} Mt
        </div>
        <div className="bg-gray-100 rounded px-3 py-1 text-sm font-medium">
          <strong>CO₂ per capita:</strong>{' '}
          {latestData.co2_per_capita?.toLocaleString() ?? 'N/A'} Mt
        </div>
      </div>

      {Object.entries(latestData)
        .filter(
          ([key]) =>
            !['year', 'population', 'co2', 'co2_per_capita'].includes(key)
        )
        .map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded px-3 py-1 mb-1 text-sm">
            <strong>{key.replace(/_/g, ' ')}:</strong> {value ?? 'N/A'}
          </div>
        ))}
    </div>
  );
};

export default CountryCard;
