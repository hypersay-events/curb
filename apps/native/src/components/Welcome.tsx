import { appWindow } from "@tauri-apps/api/window";
import { Icon } from "@iconify/react";
import React, { useCallback, useState } from "react";

type onSubmitEventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.FormEvent<HTMLFormElement>;

export interface WelcomeParams {
  setRoomIdAndLanguage: (roomId: string, targetLang: string) => void;
}

function Welcome({ setRoomIdAndLanguage }: WelcomeParams) {
  const [roomId, setRoomId] = useState("");
  const [targetLang, setTargetLang] = useState("uk");

  const onRoomIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRoomId(e.target.value);
    },
    []
  );

  const onTargetLangChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTargetLang(e.target.value);
    },
    []
  );

  const submitDisabled = roomId.length < 2;

  const onSubmit = useCallback(
    (e: onSubmitEventType) => {
      e.preventDefault();
      if (!submitDisabled) setRoomIdAndLanguage(roomId, targetLang);
    },
    [submitDisabled, setRoomIdAndLanguage, roomId, targetLang]
  );

  return (
    <div className="group bg-slate-900 text-white block relative overflow-hidden rounded-xl">
      <button
        type="button"
        onClick={() => appWindow.close()}
        className="absolute top-0 right-0 m-2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"
      >
        <Icon icon="mdi:close" />
      </button>
      <main className="h-screen flex items-center" data-tauri-drag-region>
        <img
          data-tauri-drag-region
          className="h-12 m-10 flex-none"
          src="https://hypersay.events/img/hse-logo-negative.svg"
          alt="Hypersay Logo"
        />
        <div className="grow">
          <form
            onSubmit={onSubmit}
            className="flex items-center justify-items-center space-x-4"
            data-tauri-drag-region
          >
            <div className="grow"></div>
            <input
              type="text"
              size={12}
              name="room"
              className="rounded text-pink-800 text-bold text-2xl  text-center h-12"
              placeholder="EventCode"
              onChange={onRoomIdChange}
              value={roomId}
            />
            <select
              className="rounded text-pink-800 text-bold text-xl px-3 text-center h-12"
              value={targetLang}
              onChange={onTargetLangChange}
            >
              <option value="en">English</option>
              <option value="ro">Romanian</option>
              <option value="uk">Ukrainian</option>
            </select>
            <button type="button" onClick={onSubmit} disabled={submitDisabled}>
              <Icon
                icon="bi:arrow-right-circle"
                height={32}
                className={
                  submitDisabled
                    ? "transition ease-in-out opacity-20"
                    : "transition ease-in-out opacity-100"
                }
              />
            </button>
            <div className="grow"></div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Welcome;
