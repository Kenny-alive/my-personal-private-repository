import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('renders children inside modal', () => {
    render(
      <Modal onClose={onCloseMock}>
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when clicking outside', () => {
    render(
      <Modal onClose={onCloseMock}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText('Content').parentElement!.parentElement!);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside', () => {
    render(
      <Modal onClose={onCloseMock}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText('Content'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('closes modal on Escape key', () => {
    render(
      <Modal onClose={onCloseMock}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('traps focus inside modal', () => {
    render(
      <Modal onClose={onCloseMock}>
        <button>First</button>
        <button>Second</button>
      </Modal>
    );

    const firstBtn = screen.getByText('First');
    const modal = firstBtn.closest('div[tabindex="-1"]')!;

    firstBtn.focus();
    expect(document.activeElement).toBe(firstBtn);

    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(modal.contains(document.activeElement)).toBe(true);

    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });
    expect(modal.contains(document.activeElement)).toBe(true);

    fireEvent.keyDown(document, { key: 'Tab', code: 'Tab', shiftKey: true });
    expect(modal.contains(document.activeElement)).toBe(true);
  });
});
