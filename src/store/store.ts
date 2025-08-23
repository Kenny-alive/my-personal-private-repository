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
  countries: string[];
  addEntry: (entry: FormEntry) => void;
};

export const useStore = create<Store>((set) => ({
  entries: [],
  countries: [
    'Westeros',
    'Narnia',
    'Hogwarts',
    'Oz',
    'Rivendell',
    'Hyrule',
    'Gondor',
    'Neverland',
    'Mordor',
    'Atlantis',
  ],
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
}));
