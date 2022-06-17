import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useTemporaryState } from "../hooks/useTemporaryState";

const NEXT_PUBLIC_CAPTIONS_ENDPOINT =
  process.env.NEXT_PUBLIC_CAPTIONS_ENDPOINT || "http://localhost:4554";

export const useMonitor = <T>(roomName: string, language?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [translation, setTranslation] = useTemporaryState("", 5000);

  useEffect(() => {
    if (roomName) {
      const socket = io(
        `${NEXT_PUBLIC_CAPTIONS_ENDPOINT}?targetLang=${language}&roomName=${roomName}`
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
