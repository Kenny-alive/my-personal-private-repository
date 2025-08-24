import React from 'react';
import { EntriesList } from './EntriesList';

const BottomSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mt-6 px-4">
      <h2 className="text-xl font-bold mb-4">Submitted Entries</h2>
      <EntriesList />
    </div>
  );
};

export default BottomSection;
