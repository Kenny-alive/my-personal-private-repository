import { useState } from 'react';
import { useStore } from '../store/store';
import { getPasswordStrength } from '../utils/passwordStrength';

interface FormUncontrolledProps {
  onClose?: () => void;
}

interface Errors {
  [key: string]: string;
}

const FormUncontrolled: React.FC<FormUncontrolledProps> = ({ onClose }) => {
  const addEntry = useStore((state) => state.addEntry);
  const countries = useStore((state) => state.countries);
  const [errors, setErrors] = useState<Errors>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(getPasswordStrength(password));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = ((formData.get('name') as string) || '').trim();
    const ageValue = ((formData.get('age') as string) || '').trim();
    const age = ageValue ? Number(ageValue) : NaN;
    const email = ((formData.get('email') as string) || '').trim();
    const password = (formData.get('password') as string) || '';
    const confirmPassword = (formData.get('confirmPassword') as string) || '';
    const gender = (formData.get('gender') as string) || '';
    const terms = formData.get('terms') === 'on';
    const country = ((formData.get('country') as string) || '').trim();
    const avatarFile = (form.elements.namedItem('avatar') as HTMLInputElement)
      .files?.[0];

    const newErrors: Errors = {};

    if (!name || !/^[A-Z]/.test(name))
      newErrors.name = 'Name must start with uppercase';
    if (isNaN(age) || age < 0) newErrors.age = 'Age must be positive number';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    )
      newErrors.password = 'Password too weak';
    if (!terms) newErrors.terms = 'You must accept T&C';
    if (avatarFile && !['image/png', 'image/jpeg'].includes(avatarFile.type))
      newErrors.avatar = 'Only PNG/JPEG allowed';
    if (avatarFile && avatarFile.size > 2 * 1024 * 1024)
      newErrors.avatar = 'Max 2MB';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let avatarBase64: string | undefined;
    if (avatarFile) {
      avatarBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(avatarFile);
      });
    }

    const entry = {
      id: crypto.randomUUID(),
      name,
      age,
      email,
      password,
      gender,
      country,
      avatar: avatarBase64,
    };

    addEntry(entry);
    setErrors({});
    setPasswordStrength(0);

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          placeholder="Age"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <div className="mt-1 h-2 w-full bg-gray-200 rounded">
          <div
            className={`h-2 rounded transition-all duration-300 ${
              passwordStrength === 0
                ? 'w-0'
                : passwordStrength === 1
                  ? 'w-1/4 bg-red-500'
                  : passwordStrength === 2
                    ? 'w-1/2 bg-yellow-500'
                    : passwordStrength === 3
                      ? 'w-3/4 bg-green-400'
                      : 'w-full bg-green-600'
            }`}
          />
        </div>
        <p className="text-sm mt-1">
          Strength:{' '}
          {
            ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][
              passwordStrength
            ]
          }
        </p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>
      <span>Gender</span>
      <div className="flex gap-4">
        <label htmlFor="gender-male">
          <input
            id="gender-male"
            type="radio"
            {...{ name: 'gender' }}
            value="male"
          />{' '}
          Male
        </label>
        <label htmlFor="gender-female">
          <input
            id="gender-female"
            type="radio"
            {...{ name: 'gender' }}
            value="female"
          />{' '}
          Female
        </label>
        <label htmlFor="gender-other">
          <input
            id="gender-other"
            type="radio"
            {...{ name: 'gender' }}
            value="other"
          />{' '}
          Transformer
        </label>
      </div>
      <div>
        <label htmlFor="terms">
          <input id="terms" type="checkbox" name="terms" /> Accept Terms &
          Conditions
        </label>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          id="avatar"
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
        />
        {errors.avatar && (
          <p className="text-red-500 text-sm">{errors.avatar}</p>
        )}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          name="country"
          list="country-list"
          placeholder="Country"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <datalist id="country-list">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default FormUncontrolled;
