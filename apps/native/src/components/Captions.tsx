import { appWindow } from "@tauri-apps/api/window";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";

type onSubmitEventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.FormEvent<HTMLFormElement>;

export interface CaptionsParams {
  roomId: string;
  targetLang: string;
  onGoBack: () => void;
}

function Captions({ roomId, targetLang, onGoBack }: CaptionsParams) {
  const [isConnected, setIsConnected] = useState(false);
  const [translation, setTranslation] = useState<string>("...");

  useEffect(() => {
    console.log("Connecting...");
    const socket = io(
      `http://localhost:4554?targetLang=${targetLang}&roomName=${roomId}`
    );
    socket.once("connect", () => {
      console.log("Connected");
      setIsConnected(true);
      socket.on("translation", (translation) => {
        setTranslation(translation.text);
      });
    });

    // FIXME: disconnect on unmount
  }, [roomId, targetLang]);

  return (
    <div className="bg-black/25 text-white block relative overflow-hidden rounded-xl hover:bg-black group transition duration-700 ease-in-out">
      <button
        type="button"
        onClick={onGoBack}
        className="absolute top-0 left-0 m-2 opacity-0 group-hover:opacity-100"
      >
        <Icon icon="bi:arrow-left" />
      </button>
      <main className="h-screen flex items-center" data-tauri-drag-region>
        <p className="text-lg">{isConnected ? "Connected" : "Disconnected"}</p>
        <p className="text-lg">{translation}</p>
        <p className="text-lg">{roomId}</p>
        <p className="text-lg">{targetLang}</p>
      </main>
    </div>
  );
}

export default Captions;
