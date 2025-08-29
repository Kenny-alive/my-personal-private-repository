import React from 'react';
import type { Country } from './CountryList';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const latestData = country.data[country.data.length - 1];

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">
        {country.name} ({country.iso_code})
      </h2>
      <p>
        <strong>Year:</strong> {latestData.year}
      </p>
      {latestData.population && (
        <p>
          <strong>Population:</strong> {latestData.population.toLocaleString()}
        </p>
      )}
      {latestData.cement_co2 !== undefined && (
        <p>
          <strong>Cement CO2:</strong> {latestData.cement_co2} Mt
        </p>
      )}
      {latestData.total_ghg !== undefined && (
        <p>
          <strong>Total GHG:</strong> {latestData.total_ghg} MtCO₂e
        </p>
      )}
    </div>
  );
};

export default CountryCard;
