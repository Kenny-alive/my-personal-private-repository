import { create } from 'zustand';

interface ColumnStore {
  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;
}

export const useColumnStore = create<ColumnStore>((set) => ({
  selectedColumns: [],
  setSelectedColumns: (cols) => set({ selectedColumns: cols }),
}));
