import React, { useState } from 'react';
import { useColumnStore } from '../store/store';

interface ColumnSelectorModalProps {
  allColumns: string[];
  onClose: () => void;
}

const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({
  allColumns,
  onClose,
}) => {
  const { selectedColumns, setSelectedColumns } = useColumnStore();
  const [tempSelection, setTempSelection] = useState<string[]>([
    ...selectedColumns,
  ]);

  const toggleColumn = (col: string) => {
    setTempSelection((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const save = () => {
    setSelectedColumns(tempSelection);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Select columns to display</h2>
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-4">
          {allColumns.map((col) => (
            <label key={col} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={tempSelection.includes(col)}
                onChange={() => toggleColumn(col)}
              />
              {col.replace(/_/g, ' ')}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="
      px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md
      hover:bg-gray-400 hover:shadow-lg
      active:scale-95 active:translate-y-0.5 active:shadow-inner
      transition-all duration-150 ease-out
      cursor-pointer
    "
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="
      px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md
      hover:bg-blue-600 hover:shadow-lg
      active:scale-95 active:translate-y-0.5 active:shadow-inner
      transition-all duration-150 ease-out
      cursor-pointer
    "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelectorModal;
