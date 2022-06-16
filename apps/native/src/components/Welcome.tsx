import { appWindow } from "@tauri-apps/api/window";
import { Icon } from "@iconify/react";
import React, { useCallback, useState } from "react";
import {
  ActionIcon,
  Group,
  Paper,
  Box,
  TextInput,
  NativeSelect,
  Center,
} from "@mantine/core";
import imgUrl from "./hypersay-events-live-subtitles.svg";

type onSubmitEventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.FormEvent<HTMLFormElement>;

export interface WelcomeParams {
  setRoomIdAndLanguage: (roomId: string, targetLang: string) => void;
}

export const TARGET_LANGS = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "ro", label: "Romanian", flag: "🇷🇴" },
  { value: "it", label: "Italian", flag: "🇮🇹" },
  { value: "uk", label: "Ukrainian", flag: "🇺🇦" },
];

function Welcome({ setRoomIdAndLanguage }: WelcomeParams) {
  const [roomId, setRoomId] = useState("");
  const [targetLang, setTargetLang] = useState("");

  const onRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const onTargetLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLang(e.target.value);
  };

  const submitDisabled = roomId.length < 2;

  const onSubmit = (e: onSubmitEventType) => {
    e.preventDefault();
    if (!submitDisabled) setRoomIdAndLanguage(roomId, targetLang);
  };

  return (
    <Paper
      style={{ position: "relative", height: "100vh" }}
      p="md"
      data-tauri-drag-region
    >
      <Group
        sx={{
          position: "absolute",
          top: 2,
          right: 2,
          opacity: 0.2,
          "&:hover": { opacity: 1 },
        }}
        spacing={3}
      >
        <Icon icon="tabler:drag-drop" width="18" data-tauri-drag-region />

        <ActionIcon onClick={() => appWindow.close()}>
          <Icon icon="tabler:x" width="18" />
        </ActionIcon>
      </Group>
      <Center style={{ height: "100%" }}>
        <Group data-tauri-drag-region align="center">
          <Box style={{ width: 250 }}>
            <img
              src={imgUrl}
              alt="Hypersay Live Captions Logo"
              draggable={false}
              data-tauri-drag-region
            />
          </Box>
          <form onSubmit={onSubmit} data-tauri-drag-region>
            <Group style={{ width: 500 }}>
              <TextInput
                required
                name="room"
                placeholder="EventCode"
                onChange={onRoomIdChange}
                value={roomId}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                style={{ maxWidth: 200 }}
                variant="filled"
                autoFocus
              />
              <NativeSelect
                placeholder="search language..."
                value={targetLang}
                data={TARGET_LANGS}
                onChange={onTargetLangChange}
                autoCorrect="off"
                autoCapitalize="off"
                style={{ maxWidth: 200 }}
                variant="filled"
              />
              <ActionIcon
                onClick={onSubmit}
                disabled={submitDisabled}
                variant="transparent"
                size={40}
                sx={{
                  ":disabled": {
                    background: "none",
                    border: "none",
                    opacity: 0.5,
                  },
                }}
              >
                <Icon
                  icon="tabler:arrow-down-right-circle"
                  height={50}
                  style={{ transform: "rotate(-45deg)" }}
                />
              </ActionIcon>
            </Group>
          </form>
        </Group>
      </Center>
    </Paper>
  );
}

export default Welcome;
