import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormUncontrolled from '../components/FormUncontrolled';
import { useStore, type Store } from '../store/store';

jest.mock('../store/store');

const mockedUseStore = useStore as jest.MockedFunction<typeof useStore>;

describe('FormUncontrolled', () => {
  const addEntryMock = jest.fn();

  beforeEach(() => {
    addEntryMock.mockClear();

    const fakeState: Store = {
      entries: [],
      addEntry: addEntryMock,
      countries: ['USA', 'Canada'],
    };

    mockedUseStore.mockImplementation((selector) => selector(fakeState));
  });

  it('renders all required fields', () => {
    render(<FormUncontrolled />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('shows validation errors on invalid submit', async () => {
    render(<FormUncontrolled />);

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: 'abc123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'xyz789' } });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(
      await screen.findByText(/Name must start with uppercase/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Age must be positive number/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Passwords do not match/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Password too weak/i)).toBeInTheDocument();
    expect(await screen.findByText(/You must accept T&C/i)).toBeInTheDocument();
  });

  it('calls addEntry on valid submit', async () => {
    render(<FormUncontrolled />);

    const nameInput = screen.getByLabelText('Name');
    const ageInput = screen.getByLabelText('Age');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const termsCheckbox = screen.getByLabelText(
      /Accept Terms/i
    ) as HTMLInputElement;
    const countryInput = screen.getByLabelText('Country');
    const genderInput = screen.getByLabelText('Male') as HTMLInputElement;
    const avatarInput = screen.getByLabelText('Avatar') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Abc123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Abc123!' } });
    fireEvent.change(countryInput, { target: { value: 'USA' } });

    termsCheckbox.checked = true;
    genderInput.checked = true;
    Object.defineProperty(avatarInput, 'files', { value: [] });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(addEntryMock).toHaveBeenCalledTimes(1);
    const submittedData = addEntryMock.mock.calls[0][0];
    expect(submittedData.name).toBe('John');
    expect(submittedData.age).toBe(25);
    expect(submittedData.email).toBe('john@example.com');
    expect(submittedData.country).toBe('USA');
  });
});
