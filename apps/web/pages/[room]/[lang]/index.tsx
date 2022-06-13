import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Room() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (router.query.lang && router.query.room) {
      const socket = io(
        `http://localhost:4554?targetLang=${
          router.query.lang as string
        }&roomName=${router.query.room as string}`
      );
      socket.once("connect", () => {
        setIsConnected(true);
        socket.on("translation", (...args) => {
          console.log(...args);
        });
      });
    }
  }, [router.query.lang, router.query.room]);

  return (
    <div>
      <p>
        Room {router.query.room}, lang {router.query.lang}
      </p>
      <p>{isConnected ? "connected" : "connecting"}</p>
    </div>
  );
}
