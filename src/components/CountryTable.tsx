import React, { useMemo } from 'react';
import type { CountryData, ExtraData } from '../utils/fetchCountries';

type ExtraColumn = keyof ExtraData;

interface CountryTableProps {
  data: CountryData[];
  extraColumns?: ExtraColumn[];
}

const CountryTable: React.FC<CountryTableProps> = ({
  data,
  extraColumns = [],
}) => {
  const tableRows = useMemo(
    () =>
      data.map((yearRow) => (
        <tr key={yearRow.year} className="hover:bg-blue-50">
          <td className="px-3 py-2 border">{yearRow.year}</td>
          <td className="px-3 py-2 border">
            {yearRow.population?.toLocaleString() ?? 'N/A'}
          </td>
          <td className="px-3 py-2 border">
            {yearRow.co2?.toLocaleString() ?? 'N/A'}
          </td>
          <td className="px-3 py-2 border">
            {yearRow.co2_per_capita?.toLocaleString() ?? 'N/A'}
          </td>
          {extraColumns.map((col) => {
            const value = yearRow[col as keyof typeof yearRow];
            return (
              <td key={col} className="px-3 py-2 border">
                {typeof value === 'number' ? value.toLocaleString() : 'N/A'}
              </td>
            );
          })}
        </tr>
      )),
    [data, extraColumns]
  );

  return (
    <div className="overflow-x-auto mt-4 border rounded">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Year</th>
            <th className="px-3 py-2 border">Population</th>
            <th className="px-3 py-2 border">CO₂</th>
            <th className="px-3 py-2 border">CO₂ per capita</th>
            {extraColumns.map((col) => (
              <th key={col} className="px-3 py-2 border">
                {col.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default React.memo(CountryTable);
