import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useTemporaryState } from "../hooks/useTemporaryState";

export const Monitor = () => {
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();
  const [translation, setTranslation] = useTemporaryState("", 5000);

  useEffect(() => {
    if (router.query.lang && router.query.room) {
      const socket = io(
        `http://localhost:4554?targetLang=${
          router.query.lang as string
        }&roomName=${router.query.room as string}`
      );
      socket.once("connect", () => {
        setIsConnected(true);
        socket.on("translation", (translation) => {
          setTranslation(translation.text);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.lang, router.query.room]);

  return (
    <div>
      <p>{isConnected ? "connected" : "disconnected"}</p>
      <p>{translation}</p>
    </div>
  );
};
