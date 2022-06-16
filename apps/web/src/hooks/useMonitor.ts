import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useTemporaryState } from "../hooks/useTemporaryState";

export const useMonitor = <T>(roomName: string, language?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [translation, setTranslation] = useTemporaryState("", 5000);

  useEffect(() => {
    if (roomName) {
      const socket = io(
        `http://localhost:4554?targetLang=${language}&roomName=${roomName}`
      );
      socket.once("connect", () => {
        setIsConnected(true);
        socket.on("translation", (translation) => {
          setTranslation(translation.text);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, roomName /* , setTranslation */]);

  return { isConnected, translation };
};
