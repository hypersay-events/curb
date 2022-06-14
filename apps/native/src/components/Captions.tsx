import { appWindow } from "@tauri-apps/api/window";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

type onSubmitEventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.FormEvent<HTMLFormElement>;

export interface CaptionsParams {
  roomId: string;
  targetLang: string;
  onGoBack: () => void;
}

function Captions({ roomId, targetLang, onGoBack }: CaptionsParams) {
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
        <span>{roomId}</span>
        <span>{targetLang}</span>
      </main>
    </div>
  );
}

export default Captions;
