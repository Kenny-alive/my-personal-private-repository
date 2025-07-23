interface CardProps {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

export default function Card({
  title,
  description,
  publishedYearFrom,
  novel,
}: CardProps) {
  return (
    <div
      className="rounded-lg shadow-md cursor-pointer max-w-xs w-full p-4 flex flex-col
          bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
          text-white hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800
          transition-colors duration-300"
      style={{ height: '160px' }}
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {publishedYearFrom && (
        <p className="text-xs font-medium mb-1 opacity-80">
          Published: {publishedYearFrom}
        </p>
      )}
      {novel !== undefined && (
        <p className="text-xs font-medium mb-2 opacity-80">
          Type: {novel ? 'Novel' : 'Other'}
        </p>
      )}
      {description && (
        <p className="text-white text-sm line-clamp-3 opacity-90 overflow-hidden">
          {description}
        </p>
      )}
    </div>
  );
}
