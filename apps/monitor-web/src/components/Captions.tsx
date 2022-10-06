import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { useLines } from "../hooks/useCaptionLines";
import { SocketContext } from "./SocketProvider";
import { TARGET_LANGS } from "../utils/languages";
import CaptionLine from "./CaptionLine";
import { storedThemeAtom } from "../atoms/theme";
import { useAtom } from "jotai";

// import llamaBase64 from "./llama.json";

export interface CaptionsParams {
  onGoBack?: () => void;
}

export const Captions = function Captions({ onGoBack }: CaptionsParams) {
  const { socket, roomId, targetLang, isReady } = useContext(SocketContext);
  const [showExampleLine, setShowExampleLine] = useState(true);
  const [exampleLine, setExampleLine] = useState("");

  useEffect(() => {
    const firstLiners =
      TARGET_LANGS.find((l) => l.value === (targetLang || "en"))?.firstLiners ||
      [];
    setExampleLine(firstLiners[Math.floor(Math.random() * firstLiners.length)]);
  }, [targetLang]);

  const [captionsTheme /* , setCaptionsTheme */] = useAtom(storedThemeAtom);
  // const { captionsTheme, setFontSize } = useCaptionsTheme();

  // const pickLiner = Math.floor(Math.random() * firstLiners.length);
  // const [parentRef] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const linesTimeout = captionsTheme.Mode === "cc" ? 10 * 1000 : 60 * 60 * 1000;

  const [lines, addLine] = useLines("", linesTimeout);

  // useHotkeys([
  //   [
  //     "mod+ArrowUp",
  //     () =>
  //       setCaptionsTheme({
  //         ...captionsTheme,
  //         FontSize: captionsTheme.FontSize + STEP,
  //       }),
  //   ],
  //   [
  //     "mod+ArrowDown",
  //     () =>
  //       setCaptionsTheme({
  //         ...captionsTheme,
  //         FontSize: captionsTheme.FontSize - STEP,
  //       }),
  //   ],
  //   [
  //     "mod+=",
  //     () =>
  //       setCaptionsTheme({
  //         ...captionsTheme,
  //         FontSize: captionsTheme.FontSize + STEP,
  //       }),
  //   ],
  //   [
  //     "mod+-",
  //     () =>
  //       setCaptionsTheme({
  //         ...captionsTheme,
  //         FontSize: captionsTheme.FontSize - STEP,
  //       }),
  //   ],
  //   [
  //     "mod+0",
  //     () =>
  //       setCaptionsTheme({
  //         ...captionsTheme,
  //         FontSize: DEFAULT.FontSize,
  //       }),
  //   ],
  //   [
  //     "mod+L",
  //     () =>
  //       addLine(
  //         `<img src="${llamaBase64}" style="height: 3em; transform: scaleX(-1)"/>`
  //       ),
  //   ],
  // ]);

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

  return (
    <Box
      sx={(theme) => ({
        // position: "relative",
        // backgroundColor: isWindowHover
        //   ? theme.colors.gray[9]
        //   : `rgba(0,0,0,${captionsTheme.WindowOpacity})`,
        // backdropFilter: "blur(5px)",
        // transition: "background-color 0.5s ease",
        // height: "100vh",
        // borderRadius: theme.radius.lg,
        // overflow: "hidden",
      })}
    >
      <Stack
        align="stretch"
        style={{
          height: "100%",
          position: "relative",
        }}
      >
        {/* Menu */}
        <Group
          sx={(theme) => ({
            // opacity: isWindowHover ? 1 : 0,
            // transition: "opacity 0.5s ease",
            alignSelf: "flex-end",
            // backgroundColor: theme.colors.gray[9],
            zIndex: 1,
            justifyContent: "space-between",
            width: "100%",
          })}
          pl="sm"
          spacing={5}
        >
          <Group spacing={5}>
            <ActionIcon onClick={onGoBack}>
              <Icon icon="bi:arrow-left" />
            </ActionIcon>
            <Text size="sm">
              {roomId} {language?.flag} {isReady ? "ready" : "not ready"}
            </Text>
          </Group>
        </Group>
        <Box
          style={{
            // position: "absolute",
            // bottom: 0,
            width: "100%",
          }}
          px="lg"
          pb="lg"
          // ref={parentRef}
          dir={language?.dir === "rtl" ? "rtl" : "ltr"}
        >
          {showExampleLine ? (
            <Box>
              <CaptionLine text={exampleLine} />
            </Box>
          ) : null}
          {lines.map((line, idx) => (
            <Box key={idx}>
              <CaptionLine text={line} />
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
