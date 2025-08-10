import { render, screen, fireEvent } from '@testing-library/react';
import SelectedItemsFlyout from './SelectedItemFlyout';
import { useStore } from '../store/useStore';

jest.mock('../store/useStore');

describe('SelectedItemsFlyout', () => {
  const mockedUseStore = useStore as jest.MockedFunction<typeof useStore>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing if no items selected', () => {
    mockedUseStore.mockImplementation((selector) => {
      if (selector.toString().includes('selectedItems')) return {};
      if (selector.toString().includes('unselectAll')) return jest.fn();
      return undefined;
    });

    const { container } = render(<SelectedItemsFlyout />);
    expect(container).toBeEmptyDOMElement();
  });

  test('shows selected count and buttons', () => {
    mockedUseStore.mockImplementation((selector) => {
      if (selector.toString().includes('selectedItems'))
        return { id1: { uid: '1', title: 'Book 1' } };
      if (selector.toString().includes('unselectAll')) return jest.fn();
      return undefined;
    });

    render(<SelectedItemsFlyout />);

    expect(screen.getByText('1 item are selected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  test('calls unselectAll on button click', () => {
    const unselectAllMock = jest.fn();

    mockedUseStore.mockImplementation((selector) => {
      if (selector.toString().includes('selectedItems'))
        return { id1: { uid: '1', title: 'Book 1' } };
      if (selector.toString().includes('unselectAll')) return unselectAllMock;
      return undefined;
    });

    render(<SelectedItemsFlyout />);
    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(unselectAllMock).toHaveBeenCalledTimes(1);
  });
});
