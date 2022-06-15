import { SetStateAction, useEffect, useState } from "react";

/**
 * Like useState, but the new value is kept temporarily. After `time` the initial value is set back
 * @param initialValue
 * @param time
 * @returns
 */
export const useTemporaryState = <T>(
  initialValue: T | (() => T),
  time: number
): [T, (newValue: SetStateAction<T>) => void] => {
  const [value, setValue] = useState<T>(initialValue);

  const set: (newValue: SetStateAction<T>) => void = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setValue(initialValue);
    }, time);

    return () => {
      clearTimeout(interval);
    };
  }, [initialValue, time, value]);

  return [value, set];
};
