import type { CountryData } from '../utils/fetchCountries';

interface CountryTableProps {
  data: CountryData[];
}

const CountryTable: React.FC<CountryTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Year</th>
            <th className="px-3 py-2 border">Population</th>
            <th className="px-3 py-2 border">CO₂</th>
            <th className="px-3 py-2 border">CO₂ per capita</th>
          </tr>
        </thead>
        <tbody>
          {data.map((yearRow) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryTable;
