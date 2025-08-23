import React from 'react';
import { useStore } from '../store/store';

interface FormUncontrolledProps {
  onClose?: () => void;
}

const FormUncontrolled: React.FC<FormUncontrolledProps> = ({ onClose }) => {
  const addEntry = useStore((state) => state.addEntry);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: string };
      email: { value: string };
    };

    const entry = {
      id: crypto.randomUUID(),
      name: target.name.value,
      age: Number(target.age.value),
      email: target.email.value,
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
