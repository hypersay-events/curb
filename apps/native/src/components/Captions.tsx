import { Icon } from "@iconify/react";
import React, { useContext, useEffect } from "react";
import { useTemporaryState } from "../hooks/useTemporaryState";
import { SocketContext } from "./SocketProvider";

export interface CaptionsParams {
  onGoBack: () => void;
}

export const Captions = React.memo(
  function Captions({ onGoBack }: CaptionsParams) {
    const { socket, roomId, targetLang } = useContext(SocketContext);
    const [translation, setTranslation] = useTemporaryState<string>("", 5000);

    useEffect(() => {
      console.log("mounted");
    }, []);

    useEffect(() => {
      const onTranslate = (translation: { text: string }) => {
        setTranslation(translation.text);
      };
      socket?.on("translation", onTranslate);
      return () => {
        socket?.off("translation", onTranslate);
      };
    }, [setTranslation, socket]);

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
              Connected to <strong>{roomId}</strong>, for lang{" "}
              <strong>{targetLang}</strong>
            </p>
          </div>
          <br />
          <div>
            <p className="text-lg">{translation}</p>
          </div>
        </main>
      </div>
    );
  },
  (prevProps, nextProps) => {
    console.log(prevProps, nextProps);
    return false;
  }
);
