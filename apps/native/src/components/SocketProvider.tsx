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
}> = ({ children, roomId, targetLang }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("Connecting...", roomId, targetLang);
    const socket = io(
      `http://localhost:4554?targetLang=${targetLang}&roomName=${roomId}`
    );
    socket.once("connect", () => {
      setSocket(socket);
      setIsReady(true);
    });

    socket.on("connect", () => {
      setIsReady(true);
    });

    socket.on("disconnect", () => {
      setIsReady(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, targetLang]);

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
