"use client";

import * as React from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Hook to persist state in localStorage
 * @param key - The localStorage key
 * @param initialValue - Initial value if no stored value exists
 * @returns [storedValue, setValue] tuple
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Get stored value or initial value
  const readValue = React.useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = React.useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue: SetValue<T> = React.useCallback(
    (value) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key "${key}" but window is undefined`
        );
        return;
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch custom event so other useLocalStorage hooks can sync
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Listen for changes in other tabs/windows
  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    // Listen for changes from other tabs
    window.addEventListener("storage", handleStorageChange);

    // Listen for changes from same tab (custom event)
    const handleLocalChange = () => {
      setStoredValue(readValue());
    };
    window.addEventListener("local-storage", handleLocalChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleLocalChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}

/**
 * Hook to remove a value from localStorage
 * @param key - The localStorage key to remove
 * @returns Function to remove the value
 */
export function useRemoveLocalStorage(key: string): () => void {
  return React.useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);
}
