import { create } from 'zustand';

type FormEntry = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender?: string;
  country?: string;
  avatar?: string;
};

type Store = {
  entries: FormEntry[];
  addEntry: (entry: FormEntry) => void;
};

export const useStore = create<Store>((set) => ({
  entries: [],
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
}));
