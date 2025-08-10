import { useStore } from './useStore';

describe('useStore Zustand store', () => {
  beforeEach(() => {
    useStore.setState({
      selectedItems: {},
      selectedDetailUid: null,
    });
  });

  test('selectItem adds an item to selectedItems', () => {
    const item = { uid: '1', title: 'Test Book' };
    useStore.getState().selectItem(item);

    const state = useStore.getState();
    expect(state.selectedItems['1']).toEqual(item);
  });

  test('unselectItem removes an item from selectedItems', () => {
    const item = { uid: '1', title: 'Test Book' };
    useStore.setState({ selectedItems: { '1': item } });
    useStore.getState().unselectItem('1');

    const state = useStore.getState();
    expect(state.selectedItems['1']).toBeUndefined();
  });

  test('unselectAll clears all selected items', () => {
    const items = {
      '1': { uid: '1', title: 'Book 1' },
      '2': { uid: '2', title: 'Book 2' },
    };
    useStore.setState({ selectedItems: items });
    useStore.getState().unselectAll();

    const state = useStore.getState();
    expect(state.selectedItems).toEqual({});
  });

  test('setSelectedDetailUid sets selectedDetailUid correctly', () => {
    useStore.getState().setSelectedDetailUid('42');

    const state = useStore.getState();
    expect(state.selectedDetailUid).toBe('42');
  });

  test('setSelectedDetailUid can reset selectedDetailUid to null', () => {
    useStore.setState({ selectedDetailUid: '42' });
    useStore.getState().setSelectedDetailUid(null);

    const state = useStore.getState();
    expect(state.selectedDetailUid).toBeNull();
  });
});
