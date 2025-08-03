import { create } from 'zustand';

interface Item {
  uid: string;
  title: string;
  description?: string;
  publishedYearFrom?: number;
  novel?: boolean;
}

interface StoreState {
  selectedItems: Record<string, Item>;
  selectItem: (item: Item) => void;
  unselectItem: (uid: string) => void;
  unselectAll: () => void;
  selectedDetailUid: string | null;
  setSelectedDetailUid: (uid: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedItems: {},
  selectItem: (item) =>
    set((state) => ({
      selectedItems: { ...state.selectedItems, [item.uid]: item },
    })),

  unselectItem: (uid) =>
    set((state) => {
      const newItems = { ...state.selectedItems };
      delete newItems[uid];
      return { selectedItems: newItems };
    }),

  unselectAll: () => set({ selectedItems: {} }),
  selectedDetailUid: null,
  setSelectedDetailUid: (uid) => set({ selectedDetailUid: uid }),
}));
