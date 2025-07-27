import { useState } from 'react';

export default function ErrorButton() {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Test error thrown from ErrorButton!');
  }
  return (
    <button
      onClick={() => setThrowError(true)}
      className="fixed bottom-4 right-4 px-4 py-2 bg-red-600 text-white rounded shadow-md
                   transition duration-300 hover:bg-red-700 hover:scale-105 cursor-pointer"
    >
      Error Button
    </button>
  );
}
