import { useEffect, useState } from 'react';
import { useStore } from '../store/store';

interface HighlightedEntry {
  id: string;
  timestamp: number;
}

export const EntriesList = () => {
  const entries = useStore((state) => state.entries);
  const [highlighted, setHighlighted] = useState<HighlightedEntry[]>([]);

  useEffect(() => {
    if (entries.length === 0) return;

    const lastEntry = entries[entries.length - 1];
    setHighlighted((prev) => [
      ...prev,
      { id: lastEntry.id, timestamp: Date.now() },
    ]);

    const timeout = setTimeout(() => {
      setHighlighted((prev) => prev.filter((h) => h.id !== lastEntry.id));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [entries]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {entries.map((entry) => {
        const isHighlighted = highlighted.some((h) => h.id === entry.id);
        return (
          <div
            key={entry.id}
            className={`
            p-4 rounded-xl shadow transition-all duration-1000
            ${
              isHighlighted
                ? 'bg-green-200 border-2 border-green-500'
                : 'bg-white border border-transparent'
            }
          `}
          >
            <h3 className="font-semibold text-lg">{entry.name}</h3>
            <p>Age: {entry.age}</p>
            <p>Email: {entry.email}</p>
            <p>Gender: {entry.gender}</p>
            <p>Country: {entry.country}</p>
            <div className="mt-2">
              {entry.avatar && (
                <img
                  src={entry.avatar}
                  alt="avatar"
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
