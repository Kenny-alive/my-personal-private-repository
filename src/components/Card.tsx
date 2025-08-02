import { useStore } from '../store/useStore';
interface CardProps {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
  onClick?: () => void;
}

export default function Card({
  title,
  description,
  publishedYearFrom,
  novel,
  onClick,
  uid,
}: CardProps) {
  const selectedItems = useStore((state) => state.selectedItems);
  const selectItem = useStore((state) => state.selectItem);
  const unselectItem = useStore((state) => state.unselectItem);
  const selectedDetailUid = useStore((state) => state.selectedDetailUid);
  const setSelectedDetailUid = useStore((state) => state.setSelectedDetailUid);

  const isSelected = Boolean(selectedItems[uid]);
  const toggleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isSelected) {
      unselectItem(uid);
      if (selectedDetailUid === uid) {
        setSelectedDetailUid(null);
      }
    } else {
      selectItem({ uid, title, description, publishedYearFrom, novel });
    }
  };
  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('input[type="checkbox"]')) return;
        onClick?.();
      }}
      className="relative rounded-lg shadow-md cursor-pointer max-w-xs w-full p-4 flex flex-col
    bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
    text-white hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800
    transition-colors duration-300"
      style={{ height: '160px' }}
    >
      <label className="absolute bottom-2 right-2 w-5 h-5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelection}
          className="w-full h-full"
          aria-label={`Select book ${title}`}
          onClick={(e) => e.stopPropagation()}
        />
      </label>

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
