import { Icon } from "@iconify/react";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { appWindow } from "@tauri-apps/api/window";
import React, { useContext, useEffect, useState } from "react";
import { useTemporaryState } from "../hooks/useTemporaryState";
import { SocketContext } from "./SocketProvider";
import { TARGET_LANGS } from "./Welcome";

export interface CaptionsParams {
  onGoBack: () => void;
}

const STEP = 0.1;
const DEFAULT_FONT_SIZE = 3;

const FIRST_LINERS = [
  "It was a bright cold day in April, and the clocks were striking thirteen. [test]",
  "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.  [test]",
  "I write this sitting in the kitchen sink. [test]",
  "Ships at a distance have every man’s wish on board. [test]",
  "The story so far: in the beginning, the universe was created. This has made a lot of people very angry and been widely regarded as a bad move. [test]",
];

export const Captions = React.memo(
  function Captions({ onGoBack }: CaptionsParams) {
    const [isWindowHover, setIsWindowHover] = useState(false);
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    const { socket, roomId, targetLang, isReady } = useContext(SocketContext);

    const pickLiner = Math.floor(Math.random() * FIRST_LINERS.length);

    // const [translation, setTranslation] = useState(FIRST_LINERS[pickLiner]);

    const [translation, setTranslation] = useTemporaryState<string>(
      FIRST_LINERS[pickLiner],
      "...",
      10000
    );

    appWindow.listen("tauri://focus", () => {
      setIsWindowHover(true);
    });

    appWindow.listen("tauri://blur", () => {
      setIsWindowHover(false);
    });

    useHotkeys([
      ["mod+ArrowUp", () => setFontSize((old) => old + STEP)],
      ["mod+ArrowDown", () => setFontSize((old) => old - STEP)],
      ["mod+=", () => setFontSize((old) => old + STEP)],
      ["mod+-", () => setFontSize((old) => old - STEP)],
      ["mod+0", () => setFontSize(DEFAULT_FONT_SIZE)],
    ]);

    useEffect(() => {
      const onTranslate = (translation: { text: string }) => {
        setTranslation(translation.text);
      };
      socket?.on("translation", onTranslate);
      return () => {
        socket?.off("translation", onTranslate);
      };
    }, [setTranslation, socket]);

    const language = TARGET_LANGS.find((l) => l.value === targetLang);

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
          style={{ height: "100%" }}
          data-tauri-drag-region
        >
          <Group
            sx={{
              opacity: isWindowHover ? 1 : 0,
              transition: "opacity 0.5s ease",
              alignSelf: "flex-end",
            }}
            spacing={5}
            data-tauri-drag-region
          >
            <Text size="sm">
              {roomId} &middot; {language?.flag} — {isReady ? "ready" : "not"}
            </Text>
            <Icon icon="tabler:drag-drop" width="18" data-tauri-drag-region />
            <ActionIcon onClick={onGoBack}>
              <Icon icon="bi:arrow-left" />
            </ActionIcon>

            <ActionIcon onClick={() => appWindow.close()}>
              <Icon icon="tabler:x" width="18" />
            </ActionIcon>
          </Group>
          <Box
            style={
              {
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "stretch",
                // justifyContent: "flex-end",
                // flexGrow: 1,
              }
            }
            px="lg"
            pb="lg"
            data-tauri-drag-region
          >
            <Text
              component="span"
              sx={(theme) => ({
                display: "inline",
                fontSize: `${fontSize}vw`,
                fontWeight: "bold",
                lineHeight: "110%",
                backgroundColor: theme.colors.gray[9],
                boxShadow: `0.2em 0 0 ${theme.colors.gray[9]},-0.2em 0 0 ${theme.colors.gray[9]}`,
                color: isWindowHover ? "inherit" : "white",
                transition: "color 0.5s ease",
                // borderRadius: theme.radius.md,
              })}
              data-tauri-drag-region
            >
              {translation}
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    console.log(prevProps, nextProps);
    return false;
  }
);
