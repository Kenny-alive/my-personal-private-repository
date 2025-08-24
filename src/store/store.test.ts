import { act } from 'react';
import { useStore } from './store';

describe('Zustand store', () => {
  beforeEach(() => {
    const { entries } = useStore.getState();
    entries.length = 0;
  });

  it('initializes with empty entries and predefined countries', () => {
    const state = useStore.getState();
    expect(state.entries).toEqual([]);
    expect(state.countries).toContain('Westeros');
    expect(state.countries).toContain('Narnia');
  });

  it('adds a new entry correctly', () => {
    const newEntry = {
      id: '1',
      name: 'John Doe',
      age: 25,
      email: 'john@example.com',
      gender: 'male',
      country: 'Westeros',
      avatar: 'base64string',
    };

    act(() => {
      useStore.getState().addEntry(newEntry);
    });

    const state = useStore.getState();
    expect(state.entries).toHaveLength(1);
    expect(state.entries[0]).toEqual(newEntry);
  });

  it('adds multiple entries correctly', () => {
    const entries = [
      { id: '1', name: 'Alice', age: 20, email: 'alice@example.com' },
      { id: '2', name: 'Bob', age: 30, email: 'bob@example.com' },
    ];

    act(() => {
      entries.forEach((e) => useStore.getState().addEntry(e));
    });

    const state = useStore.getState();
    expect(state.entries).toHaveLength(2);
    expect(state.entries).toEqual(entries);
  });

  it('countries list does not change when adding entries', () => {
    act(() => {
      useStore.getState().addEntry({
        id: '1',
        name: 'John',
        age: 25,
        email: 'john@example.com',
      });
    });

    const state = useStore.getState();
    expect(state.countries).toContain('Hogwarts');
    expect(state.countries).toHaveLength(10);
  });
});
