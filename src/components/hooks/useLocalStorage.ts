import { useState, useEffect } from 'react';
export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(err);
    }
  }, [key, value]);
  return [value, setValue] as const;
}
