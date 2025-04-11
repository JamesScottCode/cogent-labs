import { useState, useEffect } from 'react';

export function useDelayedToggle(
  initialValue: boolean,
  delay: number,
): boolean {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => setValue(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return value;
}
