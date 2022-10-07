import { useListState } from "@mantine/hooks";
import difference from "lodash/difference";
import { useCallback, useEffect } from "react";
import { Translation } from "../components/Captions";
import { useTemporaryState } from "./useTemporaryState";

// export const useLines = (
//   initialLine?: string,
//   resetTime = 10 * 1000
// ): [string[], (line: string) => void] => {
//   const defaultLine = "";
//   const [lines, setLines] = useTemporaryState<string[]>(
//     [initialLine || defaultLine],
//     [defaultLine],
//     resetTime
//   );

//   const addLine = useCallback(
//     (line: string) => {
//       setLines((lines) => [...lines, line]);
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [
//       /* setLines */
//     ]
//   );

//   return [lines, addLine];
// };

type LineType = {
  text: string;
  timestamp: number;
};

export const useLines = (
  resetTime = 10 * 1000
): [LineType[], (line: Translation) => void] => {
  const [lines, linesHandlers] = useListState<LineType>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const removable = lines.filter((l) => now - l.timestamp >= resetTime);

      linesHandlers.setState(difference(lines, removable));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lines, linesHandlers, resetTime]);

  const addLine = useCallback(
    (line: Translation) => {
      linesHandlers.append({
        timestamp: Date.now(),
        text: line.text,
      });
    },
    [linesHandlers]
  );

  return [lines, addLine];
};
