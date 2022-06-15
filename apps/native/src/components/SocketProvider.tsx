import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<{
  socket: Socket | null;
  roomId?: string;
  targetLang?: string;
}>({
  socket: null,
});

export const SocketProvider: React.FC<{
  children: ReactNode;
  roomId: string;
  targetLang: string;
}> = ({ children, roomId, targetLang }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("Connecting...", roomId, targetLang);
    const socket = io(
      `http://localhost:4554?targetLang=${targetLang}&roomName=${roomId}`
    );
    socket.once("connect", () => {
      setSocket(socket);
      setReady(true);
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
      }}
    >
      {ready ? children : <>Loading...</>}
    </SocketContext.Provider>
  );
};
