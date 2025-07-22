import { useEffect, useMemo, useState } from "react";

const KEY = "persistant_state:";

export function usePersistantState<T>(
  initialValue: T,
  localStorageId: string,
): [T, (new_state: T) => void] {
  const _initialValue = useMemo(() => {
    const localStorageValue = localStorage.getItem(KEY + localStorageId);
    return localStorageValue ? JSON.parse(localStorageValue) : initialValue;
  }, []);

  const [state, setState] = useState(_initialValue);

  useEffect(() => {
    const val = JSON.stringify(state);
    if (val) {
      localStorage.setItem(KEY + localStorageId, val);
    } else {
      localStorage.removeItem(KEY + localStorageId);
    }
  }, [state]);

  return [state, setState];
}
