import { SetStateAction, useCallback, useEffect, useState } from "react";

export const useRecordStartTime = (text: string) => {
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (text.length > 0 && !startTime) {
      setStartTime(new Date());
    }
  }, [startTime, text.length]);

  const resetTimer = useCallback(() => {
    setStartTime(null);
  }, []);

  return {
    startTime,
    resetTimer,
  };
};
