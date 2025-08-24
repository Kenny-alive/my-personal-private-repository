import React from 'react';
import { ModalType } from '../App';

interface TopSectionProps {
  openModal: (type: Exclude<ModalType, null>) => void;
}

const TopSection: React.FC<TopSectionProps> = ({ openModal }) => {
  return (
    <div className="space-x-4 mb-6">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => openModal('uncontrolled')}
      >
        Open Uncontrolled Form
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        onClick={() => openModal('rhf')}
      >
        Open React Hook Form
      </button>
    </div>
  );
};

export default TopSection;
