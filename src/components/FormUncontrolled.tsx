import React from 'react';

const FormUncontrolled: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: string };
    };
    const data = {
      name: target.name.value,
      age: target.age.value,
    };
    console.log('Uncontrolled form data:', data);
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
