import { Icon } from "@iconify/react";
import { io, Socket } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useTemporaryState } from "../hooks/useTemporaryState";

export interface CaptionsParams {
  roomId: string;
  targetLang: string;
  onGoBack: () => void;
}

export const Captions = React.memo(function Captions({
  roomId,
  targetLang,
  onGoBack,
}: CaptionsParams) {
  const [isConnected, setIsConnected] = useState(false);
  const [translation, setTranslation] = useTemporaryState<string>("", 5000);

  useEffect(() => {
    console.log("Connecting...", roomId, targetLang);
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

    return () => {
      socket.disconnect();
    };

    // FIXME: disconnect on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div>
          <p className="text-lg">
            {isConnected ? "Connected" : "Disconnected"} to{" "}
            <strong>{roomId}</strong>, for lang <strong>{targetLang}</strong>
          </p>
        </div>
        <br />
        <div>
          <p className="text-lg">{translation}</p>
        </div>
      </main>
    </div>
  );
});
