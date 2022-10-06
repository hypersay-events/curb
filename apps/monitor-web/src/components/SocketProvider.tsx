import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<{
  socket: Socket | null;
  roomId?: string;
  targetLang?: string;
  isReady?: boolean;
}>({
  socket: null,
});

export const SocketProvider: React.FC<{
  children: ReactNode;
  roomId: string;
  targetLang: string;
  endpoint?: string;
}> = ({
  children,
  roomId,
  targetLang,
  endpoint = process.env.VITE_CAPTIONS_ENDPOINT || "http://localhost:4554",
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const socket = io(
      `${endpoint}/?targetLang=${targetLang}&roomName=${roomId}`
    );
    socket.once("connect", () => {
      setSocket(socket);
      setIsReady(true);
    });

    const onConnect = () => setIsReady(true);
    const onDisconnect = () => setIsReady(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [endpoint, roomId, targetLang]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomId,
        targetLang,
        isReady,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
