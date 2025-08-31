import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import type { Country } from '../utils/fetchCountries';
import CountryTable from './CountryTable';
import ColumnSelectorModal from './Modal';
import { useColumnStore, useYearStore } from '../store/store';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const [showTable, setShowTable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showMonster, setShowMonster] = useState(false);
  const selectedColumns = useColumnStore((state) => state.selectedColumns);
  const monsterImages = useMemo(
    () => ['/cat.jpg', '/cat2.jpg', '/cat3.jpg'],
    []
  );
  const [currentImage, setCurrentImage] = useState<string>(monsterImages[0]);
  const { selectedYear } = useYearStore();
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  const getFieldClass = useCallback(
    (field: string) =>
      highlightedFields.includes(field)
        ? 'bg-yellow-200 animate-pulse transition-colors duration-700 rounded px-3 py-1 text-sm font-medium'
        : 'bg-gray-100 rounded px-3 py-1 text-sm font-medium',
    [highlightedFields]
  );

  const latestData = useMemo(() => {
    if (selectedYear !== null) {
      return (
        country.data.find((d) => d.year === selectedYear) ||
        country.data[country.data.length - 1]
      );
    }
    return country.data[country.data.length - 1];
  }, [country.data, selectedYear]);

  const prevDataRef = useRef(latestData);

  useEffect(() => {
    const changed: string[] = [];

    if (prevDataRef.current.population !== latestData.population)
      changed.push('population');
    if (prevDataRef.current.co2 !== latestData.co2) changed.push('co2');
    if (prevDataRef.current.co2_per_capita !== latestData.co2_per_capita)
      changed.push('co2_per_capita');
    if (prevDataRef.current.year !== latestData.year) changed.push('year');

    if (changed.length > 0) {
      setHighlightedFields(changed);
      setTimeout(() => setHighlightedFields([]), 5000);
    }

    prevDataRef.current = latestData;
  }, [latestData]);

  const toggleMonster = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * monsterImages.length);
    setCurrentImage(monsterImages[randomIndex]);
    setShowMonster(true);
  }, [monsterImages]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-blue-50">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🌍 {country.name}{' '}
        <span className="text-gray-500 text-base">
          ({country.iso_code ?? 'N/A'})
        </span>
      </h2>

      <div
        key={latestData.year}
        className="flex flex-wrap gap-3 mb-4 transition duration-500 ease-in-out "
      >
        <div className={getFieldClass('year')}>
          <strong>Year:</strong> {latestData.year}
        </div>
        <div className={getFieldClass('population')}>
          <strong>Population:</strong>{' '}
          {latestData.population?.toLocaleString() ?? 'N/A'}
        </div>
        <div className={getFieldClass('co2')}>
          <strong>CO₂:</strong> {latestData.co2?.toLocaleString() ?? 'N/A'} Mt
        </div>
        <div className={getFieldClass('co2_per_capita')}>
          <strong>CO₂ per capita:</strong>{' '}
          {latestData.co2_per_capita?.toLocaleString() ?? 'N/A'} Mt
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => {
            setShowTable((prev) => !prev);
            toggleMonster();
          }}
          className="
      px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md
      hover:shadow-xl hover:bg-blue-600
      active:scale-95 active:bg-blue-700
      transition-transform transition-colors duration-150 ease-out
      w-48 h-10 flex justify-center items-center cursor-pointer
    "
        >
          {showTable ? 'Release the beast' : 'Hide this monster '}
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="
      px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md
      hover:shadow-xl hover:bg-green-600
      active:scale-95 active:bg-green-700
      transition-transform transition-colors duration-150 ease-out
      w-48 h-10 flex justify-center items-center cursor-pointer
    "
        >
          Select columns
        </button>
      </div>

      {showTable && (
        <CountryTable data={[latestData]} extraColumns={selectedColumns} />
      )}

      {showModal && (
        <ColumnSelectorModal
          allColumns={['methane', 'oil_co2', 'temperature_change_from_co2']}
          onClose={() => setShowModal(false)}
        />
      )}

      {showMonster && !showTable && (
        <div className="mt-4 flex justify-center">
          <img
            src={currentImage}
            alt="Monster"
            className="w-full h-64 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(CountryCard);
