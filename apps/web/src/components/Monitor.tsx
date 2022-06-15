import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useTemporaryState } from "../hooks/useTemporaryState";

interface MonitorProps {
  roomName: string;
  language?: string;
}

export const Monitor: React.FC<MonitorProps> = ({
  roomName,
  language = "original",
}) => {
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

  return (
    <div>
      <p>{isConnected ? "connected" : "disconnected"}</p>
      <p>{translation}</p>
    </div>
  );
};
