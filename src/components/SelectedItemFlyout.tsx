import { useStore } from '../store/useStore';
import { GenerateCSV } from './GenerateCSV';
import { DownloadCSV } from './DownloadCSV';

export default function SelectedItemsFlyout() {
  const selectedItems = useStore((state) => state.selectedItems);
  const unselectAll = useStore((state) => state.unselectAll);
  const selectedCount = Object.keys(selectedItems).length;

  if (selectedCount === 0) return null;

  const filename = `${selectedCount}_items.csv`;

  return (
    <GenerateCSV items={selectedItems}>
      {(csv) => (
        <div
          className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <div>
            {selectedCount} item{selectedCount > 1 ? 's' : ''} are selected
          </div>
          <div className="flex gap-4">
            <button
              onClick={unselectAll}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Unselect all
            </button>
            <DownloadCSV csv={csv} filename={filename} />
          </div>
        </div>
      )}
    </GenerateCSV>
  );
}
