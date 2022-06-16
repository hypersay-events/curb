import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useState } from "react";
import { useTemporaryState } from "../hooks/useTemporaryState";
import { SocketContext } from "./SocketProvider";

export interface CaptionsParams {
  onGoBack: () => void;
}

export const Captions = React.memo(
  function Captions({ onGoBack }: CaptionsParams) {
    const { socket, roomId, targetLang, isReady } = useContext(SocketContext);
    const [translation, setTranslation] = useState(
      "Utilities for controlling the leading (line height) of an element."
    ); // useTemporaryState<string>("", 10000);

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
      <div className="bg-black/50 text-white block relative overflow-hidden rounded-xl hover:bg-black group transition duration-700 ease-in-out">
        <div className="absolute top-0 left-0 mx-2 opacity-0 group-hover:opacity-100">
          <button type="button" onClick={onGoBack}>
            <Icon icon="bi:arrow-left" />
          </button>
          <span className="opacity-40 mx-2 p-0 text-xs leading-3">
            {roomId}({targetLang} {isReady ? "ready" : "not"})
          </span>
        </div>
        <div
          className="h-screen flex items-center bg-red p-5"
          data-tauri-drag-region
        >
          <p
            style={{
              fontSize: "4vw",
              fontWeight: "bold",
            }}
          >
            {translation}
          </p>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    console.log(prevProps, nextProps);
    return false;
  }
);
