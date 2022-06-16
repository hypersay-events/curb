import { Icon } from "@iconify/react";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { appWindow } from "@tauri-apps/api/window";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketProvider";
import { TARGET_LANGS } from "./Welcome";

export interface CaptionsParams {
  onGoBack: () => void;
}

export const Captions = React.memo(
  function Captions({ onGoBack }: CaptionsParams) {
    const [isWindowHover, setIsWindowHover] = useState(false);
    const { socket, roomId, targetLang, isReady } = useContext(SocketContext);
    const [translation, setTranslation] = useState(
      "Utilities for controlling the leading (line height) of an element. It goes on two lines as well."
    );

    appWindow.listen("tauri://focus", () => {
      setIsWindowHover(true);
    });

    appWindow.listen("tauri://blur", () => {
      setIsWindowHover(false);
    });

    // const [translation, setTranslation] = useTemporaryState<string>(
    //   "[...]",
    //   10000
    // );

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
          transition: "background-color 0.5s ease",
          height: "100vh",
        })}
        data-tauri-drag-region
      >
        <Stack align="stretch" style={{ height: "100%" }}>
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
          >
            <Text
              component="span"
              sx={(theme) => ({
                display: "inline",
                fontSize: "3vw",
                fontWeight: "bold",
                lineHeight: "110%",
                backgroundColor: theme.colors.gray[9],
                boxShadow: `0.2em 0 0 ${theme.colors.gray[9]},-0.2em 0 0 ${theme.colors.gray[9]}`,
                color: isWindowHover ? "inherit" : "white",
                transition: "color 0.5s ease",
                // borderRadius: theme.radius.md,
              })}
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
