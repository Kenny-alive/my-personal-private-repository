import React from 'react';
import { useStore } from '../store/store';

interface FormUncontrolledProps {
  onClose?: () => void;
}

const FormUncontrolled: React.FC<FormUncontrolledProps> = ({ onClose }) => {
  const addEntry = useStore((state) => state.addEntry);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: string };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
      gender: { value: string };
      terms: { checked: boolean };
      avatar: { files: FileList };
      country: { value: string };
    };

    const name = target.name.value.trim();
    const age = Number(target.age.value);
    const email = target.email.value.trim();
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;
    const gender = target.gender.value;
    const terms = target.terms.checked;
    const country = target.country.value.trim();
    const avatarFile = target.avatar.files[0];

    if (!name || !/^[A-Z]/.test(name))
      return alert('Name must start with uppercase');
    if (isNaN(age) || age < 0) return alert('Age must be positive number');
    if (!/\S+@\S+\.\S+/.test(email)) return alert('Invalid email');
    if (password !== confirmPassword) return alert('Passwords do not match');
    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      return alert('Password too weak');
    }
    if (!terms) return alert('You must accept T&C');
    if (avatarFile && !['image/png', 'image/jpeg'].includes(avatarFile.type))
      return alert('Only PNG/JPEG allowed');
    if (avatarFile && avatarFile.size > 2 * 1024 * 1024)
      return alert('Max 2MB');

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
    console.log('Uncontrolled form data:', entry);

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          name="name"
          placeholder="Name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <input
          name="age"
          type="number"
          placeholder="Age"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex gap-4">
        <label>
          <input type="radio" {...{ name: 'gender' }} value="male" /> Male
        </label>
        <label>
          <input type="radio" {...{ name: 'gender' }} value="female" /> Female
        </label>
        <label>
          <input type="radio" {...{ name: 'gender' }} value="other" /> Other
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="terms" /> Accept Terms & Conditions
        </label>
      </div>
      <div>
        <input type="file" name="avatar" accept="image/png, image/jpeg" />
      </div>
      <div>
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
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
