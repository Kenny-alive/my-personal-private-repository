import { useYearStore } from '../store/store';

const YearSelector: React.FC<{ years: number[] }> = ({ years }) => {
  const { selectedYear, setSelectedYear } = useYearStore();

  return (
    <div className="flex items-center gap-2 mb-6">
      <label className="font-medium">Select year:</label>
      <select
        value={selectedYear ?? ''}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="">Latest</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
