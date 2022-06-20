import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useLines } from "../hooks/useCaptionLines";
import { appWindow, WebviewWindow } from "@tauri-apps/api/window";
import {
  DEFAULT_BG_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_COLOR,
  STEP,
} from "./Settings";
import { SocketContext } from "./SocketProvider";
import { TARGET_LANGS } from "./Welcome";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CaptionLine from "./CaptionLine";

export interface CaptionsParams {
  onGoBack: () => void;
}

export const FIRST_LINERS = [
  "It was a bright cold day in April, and the clocks were striking thirteen. [test]",
  "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.  [test]",
  "I write this sitting in the kitchen sink. [test]",
  "Ships at a distance have every man’s wish on board. [test]",
  "The story so far: in the beginning, the universe was created. This has made a lot of people very angry and been widely regarded as a bad move. [test]",
];

export const Captions = function Captions({ onGoBack }: CaptionsParams) {
  const [isWindowHover, setIsWindowHover] = useState(false);
  const { socket, roomId, targetLang, isReady } = useContext(SocketContext);
  const [showExampleLine, setShowExampleLine] = useState(true);
  const exampleLine = useMemo(
    () => FIRST_LINERS[Math.floor(Math.random() * FIRST_LINERS.length)],
    []
  );

  // const pickLiner = Math.floor(Math.random() * FIRST_LINERS.length);
  const [parentRef] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const [lines, addLine] = useLines();

  useEffect(() => {
    appWindow.listen("tauri://focus", () => {
      setIsWindowHover(true);
    });

    appWindow.listen("tauri://blur", () => {
      setIsWindowHover(false);
    });
  }, []);

  useHotkeys([
    ["mod+ArrowUp", () => setFontSize((old) => old + STEP)],
    ["mod+ArrowDown", () => setFontSize((old) => old - STEP)],
    ["mod+=", () => setFontSize((old) => old + STEP)],
    ["mod+-", () => setFontSize((old) => old - STEP)],
    ["mod+0", () => setFontSize(DEFAULT_FONT_SIZE)],
  ]);

  useEffect(() => {
    const onTranslate = (translation: { text: string }) => {
      addLine(translation.text);
      setShowExampleLine(false);
    };
    socket?.on("translation", onTranslate);
    return () => {
      socket?.off("translation", onTranslate);
    };
  }, [addLine, socket]);

  const language = TARGET_LANGS.find((l) => l.value === targetLang);

  const [fontSize, setFontSize] = useLocalStorage({
    key: "font-size",
    defaultValue: DEFAULT_FONT_SIZE,
  });

  const [bgColor] = useLocalStorage({
    key: "background-color",
    defaultValue: DEFAULT_BG_COLOR,
  });

  const [textColor] = useLocalStorage({
    key: "text-color",
    defaultValue: DEFAULT_TEXT_COLOR,
  });

  const openSettingsWindow = useCallback(() => {
    console.log("called");
    const webview = new WebviewWindow("settings", {
      url: "settings.html",
      title: "Settings",
      height: 500,
      width: 600,
    });
    webview.once("tauri://created", function () {
      console.log("view window successfully created");
    });
    webview.once("tauri://error", function (e) {
      console.log(e);
    });
  }, []);

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        backgroundColor: isWindowHover ? theme.colors.gray[9] : "transparent",
        backdropFilter: "blur(5px)",
        transition: "background-color 0.5s ease",
        height: "100vh",
        borderRadius: theme.radius.lg,
        overflow: "hidden",
      })}
      data-tauri-drag-region
    >
      <Stack
        align="stretch"
        sx={(theme) => ({
          height: "100%",
          position: "relative",
          backgroundColor: theme.colors.gray[9],
          zIndex: 1,
        })}
        data-tauri-drag-region
      >
        {/* Menu */}
        <Group
          sx={{
            opacity: isWindowHover ? 1 : 0,
            transition: "opacity 0.5s ease",
            alignSelf: "flex-end",
          }}
          spacing={5}
          data-tauri-drag-region
        >
          <ActionIcon onClick={openSettingsWindow}>
            <Icon icon="tabler:settings" width="18" />
          </ActionIcon>

          <Text size="sm">
            {roomId} &middot; {language?.flag} — {isReady ? "ready" : "not"}
          </Text>
          <Icon icon="tabler:drag-drop" width="18" data-tauri-drag-region />
          <ActionIcon onClick={openSettingsWindow}>
            <Icon icon="tabler:settings" />
          </ActionIcon>

          <ActionIcon onClick={onGoBack}>
            <Icon icon="bi:arrow-left" />
          </ActionIcon>

          <ActionIcon onClick={() => appWindow.close()}>
            <Icon icon="tabler:x" width="18" />
          </ActionIcon>
        </Group>
        <Box
          style={{
            position: "absolute",
            bottom: 0,
          }}
          px="lg"
          pb="lg"
          data-tauri-drag-region
          ref={parentRef}
        >
          {showExampleLine ? (
            <Box>
              <CaptionLine fontSize={fontSize} text={exampleLine} />
            </Box>
          ) : null}
          {lines.map((line) => (
            <Box key={line}>
              <CaptionLine fontSize={fontSize} text={line} />
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
