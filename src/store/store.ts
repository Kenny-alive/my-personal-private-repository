import { create } from 'zustand';

interface ColumnStore {
  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;
}

interface YearStore {
  selectedYear: number | null;
  setSelectedYear: (year: number) => void;
}

export const useColumnStore = create<ColumnStore>((set) => ({
  selectedColumns: [],
  setSelectedColumns: (cols) => set({ selectedColumns: cols }),
}));

export const useYearStore = create<YearStore>((set) => ({
  selectedYear: null,
  setSelectedYear: (year) => set({ selectedYear: year }),
}));
