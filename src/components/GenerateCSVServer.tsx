import type { BookBase } from './App';

interface GenerateCSVServerProps {
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

export function GenerateCSVServer({ items, children }: GenerateCSVServerProps) {
  const values = Object.values(items);

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

  const csv = csvRows.join('\n');

  // console.log('CSV generated on SERVER:', csv);

  return <>{children(csv)}</>;
}
