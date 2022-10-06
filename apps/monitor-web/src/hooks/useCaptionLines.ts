import { useCallback } from "react";
import { useTemporaryState } from "./useTemporaryState";

export const useLines = (
  initialLine?: string,
  resetTime = 10 * 1000
): [string[], (line: string) => void] => {
  const defaultLine = "";
  const [lines, setLines] = useTemporaryState<string[]>(
    [initialLine || defaultLine],
    [defaultLine],
    resetTime
  );

  const addLine = useCallback(
    (line: string) => {
      setLines((lines) => [...lines, line]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /* setLines */
    ]
  );

  return [lines, addLine];
};
