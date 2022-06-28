import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useLines } from "../hooks/useCaptionLines";
import { appWindow, WebviewWindow } from "@tauri-apps/api/window";
import { STEP } from "./Settings";
import { SocketContext } from "./SocketProvider";
import { TARGET_LANGS } from "./Welcome";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CaptionLine from "./CaptionLine";
import { DEFAULT, storedThemeAtom } from "../hooks/useCaptionsTheme";
import { useAtom } from "jotai";

import llamaBase64 from "./llama.json";

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

  const [captionsTheme, setCaptionsTheme] = useAtom(storedThemeAtom);
  // const { captionsTheme, setFontSize } = useCaptionsTheme();

  // const pickLiner = Math.floor(Math.random() * FIRST_LINERS.length);
  const [parentRef] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const linesTimeout = captionsTheme.Mode === "cc" ? 10 * 1000 : 60 * 60 * 1000;

  const [lines, addLine] = useLines("", linesTimeout);

  useEffect(() => {
    appWindow.listen("tauri://focus", () => {
      setIsWindowHover(true);
    });

    appWindow.listen("tauri://blur", () => {
      setIsWindowHover(false);
    });
  }, []);

  useHotkeys([
    [
      "mod+ArrowUp",
      () =>
        setCaptionsTheme({
          ...captionsTheme,
          FontSize: captionsTheme.FontSize + STEP,
        }),
    ],
    [
      "mod+ArrowDown",
      () =>
        setCaptionsTheme({
          ...captionsTheme,
          FontSize: captionsTheme.FontSize - STEP,
        }),
    ],
    [
      "mod+=",
      () =>
        setCaptionsTheme({
          ...captionsTheme,
          FontSize: captionsTheme.FontSize + STEP,
        }),
    ],
    [
      "mod+-",
      () =>
        setCaptionsTheme({
          ...captionsTheme,
          FontSize: captionsTheme.FontSize - STEP,
        }),
    ],
    [
      "mod+0",
      () =>
        setCaptionsTheme({
          ...captionsTheme,
          FontSize: DEFAULT.FontSize,
        }),
    ],
    [
      "mod+L",
      () =>
        addLine(
          `<img src="${llamaBase64}" style="height: 3em; transform: scaleX(-1)"/>`
        ),
    ],
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

  const openSettingsWindow = useCallback(() => {
    console.log("called");
    const webview = new WebviewWindow("settings", {
      url: "settings.html",
      title: "Settings",
      width: 800,
      height: 600,
    });
    webview.once("tauri://created", function () {
      console.log("view window successfully created");
    });
    webview.once("tauri://error", function (e) {
      console.log(e);
    });
    webview.setFocus();
  }, []);

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        backgroundColor: isWindowHover
          ? theme.colors.gray[9]
          : `rgba(0,0,0,${captionsTheme.WindowOpacity})`,
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
        style={{
          height: "100%",
          position: "relative",
        }}
        data-tauri-drag-region
      >
        {/* Menu */}
        <Group
          sx={(theme) => ({
            opacity: isWindowHover ? 1 : 0,
            transition: "opacity 0.5s ease",
            alignSelf: "flex-end",
            backgroundColor: theme.colors.gray[9],
            zIndex: 1,
            justifyContent: "space-between",
            width: "100%",
          })}
          pl="sm"
          spacing={5}
          data-tauri-drag-region
        >
          <Group spacing={5}>
            <ActionIcon onClick={onGoBack}>
              <Icon icon="bi:arrow-left" />
            </ActionIcon>
            <Text size="sm">
              {roomId} &middot; {language?.flag} — {isReady ? "ready" : "not"}
            </Text>
          </Group>
          <Group spacing={5}>
            <ActionIcon onClick={openSettingsWindow}>
              <Icon icon="tabler:settings" />
            </ActionIcon>

            <Icon icon="tabler:drag-drop" width="18" data-tauri-drag-region />

            <ActionIcon onClick={() => appWindow.close()}>
              <Icon icon="tabler:x" width="18" />
            </ActionIcon>
          </Group>
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
              <CaptionLine text={exampleLine} />
            </Box>
          ) : null}
          {lines.map((line) => (
            <Box key={line}>
              <CaptionLine text={line} />
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
