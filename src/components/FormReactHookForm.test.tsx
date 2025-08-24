import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormReactHookForm from '../components/FormReactHookForm';
import { useStore, type Store } from '../store/store';
import * as passwordUtils from '../utils/passwordStrength';

jest.mock('../store/store');
const mockedUseStore = useStore as jest.MockedFunction<typeof useStore>;

describe('FormReactHookForm', () => {
  const addEntryMock = jest.fn();
  const fakeCountries = ['USA', 'Canada'];

  beforeEach(() => {
    addEntryMock.mockClear();

    const fakeState: Store = {
      entries: [],
      addEntry: addEntryMock,
      countries: fakeCountries,
    };

    mockedUseStore.mockImplementation((selector) => selector(fakeState));

    class MockFileReader {
      public result: string | null = null;
      public onload: ((ev: ProgressEvent<FileReader>) => void) | null = null;
      public onerror: ((ev: ProgressEvent<FileReader>) => void) | null = null;

      readAsDataURL(_file: Blob) {
        void _file;
        setTimeout(() => {
          this.result = 'data:image/png;base64,AAA';
          this.onload?.(new ProgressEvent('load') as ProgressEvent<FileReader>);
        }, 0);
      }
    }

    Object.defineProperty(global, 'FileReader', {
      writable: true,
      configurable: true,
      value: MockFileReader,
    });
  });

  it('renders all required fields', () => {
    render(<FormReactHookForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('Decepticon')).toBeInTheDocument();
  });

  it('shows validation errors on invalid submit', async () => {
    render(<FormReactHookForm />);

    const form = screen.getByTestId('form');

    fireEvent.submit(form);

    expect(
      await screen.findByText(/Invalid input: expected number/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password must be at least 8 characters/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/You must accept T&C/i)).toBeInTheDocument();
    expect(await screen.findByText(/Country is required/i)).toBeInTheDocument();
  });

  it('calculates password strength', async () => {
    const passwordSpy = jest
      .spyOn(passwordUtils, 'getPasswordStrength')
      .mockReturnValue(3);

    render(<FormReactHookForm />);
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'Abc123!' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(passwordSpy).toHaveBeenCalledWith('Abc123!');
      expect(screen.getByText(/Strength:/i)).toHaveTextContent(
        'Strength: Strong'
      );
    });

    passwordSpy.mockRestore();
  });

  it('submits valid form and resets', async () => {
    render(<FormReactHookForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Abc12345!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Abc12345!' },
    });
    fireEvent.click(screen.getByLabelText(/Accept Terms/i));
    fireEvent.click(screen.getByLabelText('Male'));
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'USA' },
    });

    const avatarInput = screen.getByLabelText('Avatar') as HTMLInputElement;
    const mockFile = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    Object.defineProperty(avatarInput, 'files', { value: [mockFile] });
    fireEvent.change(avatarInput);

    const submitBtn = screen.getByRole('button', { name: /submit/i });

    await waitFor(() => expect(submitBtn).not.toBeDisabled());

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(addEntryMock).toHaveBeenCalledTimes(1);
      const submitted = addEntryMock.mock.calls[0][0];
      expect(submitted.name).toBe('John');
      expect(submitted.age).toBe(30);
      expect(submitted.email).toBe('john@example.com');
      expect(submitted.country).toBe('USA');
      expect(submitted.gender).toBe('male');
      expect(submitted.avatar).toMatch(/^data:image\/png;base64,/);
    });
  });
});
