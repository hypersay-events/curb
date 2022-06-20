import { SetStateAction, useEffect, useState } from "react";

/**
 * Like useState, but the new value is kept temporarily. After `time` the initial value is set back
 * @param initialValue
 * @param defaultValue
 * @param time
 * @returns
 */
export const useTemporaryState = <T>(
  initialValue: T | (() => T),
  defaultValue: T | (() => T),
  time: number
): [T, (newValue: SetStateAction<T>) => void] => {
  const [value, setValue] = useState<T>(initialValue);

  const set: (newValue: SetStateAction<T>) => void = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setValue(defaultValue);
    }, time);

    return () => {
      clearTimeout(interval);
    };
  }, [defaultValue, initialValue, time, value]);

  return [value, set];
};
