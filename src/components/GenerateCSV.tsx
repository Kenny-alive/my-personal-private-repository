import { useEffect, useState } from 'react';
import type { BookBase } from './App';

interface GenerateCSVProps {
  items: Record<string, BookBase>;
  children: (csv: string) => React.ReactNode;
}

function escapeCSVValue(val: unknown): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'string') {
    const needsQuotes = ['"', ',', '\n'].some((ch) => val.includes(ch));
    const escaped = val.split('"').join('""');
    return needsQuotes ? `"${escaped}"` : escaped;
  }
  return String(val);
}

export function GenerateCSV({ items, children }: GenerateCSVProps) {
  const [csv, setCsv] = useState('');
  useEffect(() => {
    const values = Object.values(items);
    if (values.length === 0) {
      setCsv('');
      return;
    }

    const headers: (keyof BookBase)[] = [
      'uid',
      'title',
      'description',
      'publishedYearFrom',
      'novel',
    ];

    const csvRows = [
      headers.join(','),
      ...values.map((item) =>
        headers.map((header) => escapeCSVValue(item[header])).join(',')
      ),
    ];

    setCsv(csvRows.join('\n'));
  }, [items]);

  return <>{children(csv)}</>;
}
