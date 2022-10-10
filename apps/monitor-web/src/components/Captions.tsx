import { useContext, useEffect, useState } from "react";
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Group,
  Header,
  MediaQuery,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useLines } from "../hooks/useCaptionLines";
import { SocketContext } from "./SocketProvider";
import { Language, TARGET_LANGS } from "../utils/languages";
import CaptionLine from "./CaptionLine";
import { storedThemeAtom } from "../atoms/theme";
import { useAtom } from "jotai";
import { IconArrowLeft } from "@tabler/icons";
import Settings from "./Settings";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useHotkeys, useMediaQuery } from "@mantine/hooks";

// import llamaBase64 from "./llama.json";

export type Translation = {
  text: string;
  timestampStart: number;
  timestampEnd: number;
  roomName: string;
  targetLang: string;
};

export interface CaptionsParams {
  onGoBack?: () => void;
}

export const Captions = function Captions({ onGoBack }: CaptionsParams) {
  const { socket, roomId, targetLang, isReady } = useContext(SocketContext);
  const [showExampleLine, setShowExampleLine] = useState(true);
  const [exampleLine, setExampleLine] = useState("");
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    const firstLiners =
      TARGET_LANGS.find((l) => l.value === (targetLang || "en"))?.firstLiners ||
      [];
    setExampleLine(firstLiners[Math.floor(Math.random() * firstLiners.length)]);
  }, [targetLang]);

  const [captionsTheme /* , setCaptionsTheme */] = useAtom(storedThemeAtom);

  const linesTimeout = captionsTheme.Mode === "cc" ? 10 * 1000 : 60 * 60 * 1000;

  const [lines, addLine] = useLines(linesTimeout);

  // const [parentRef] = useAutoAnimate<HTMLDivElement>();

  useHotkeys([
    // [
    //   "mod+ArrowUp",
    //   () =>
    //     setCaptionsTheme({
    //       ...captionsTheme,
    //       FontSize: captionsTheme.FontSize + STEP,
    //     }),
    // ],
    // [
    //   "mod+ArrowDown",
    //   () =>
    //     setCaptionsTheme({
    //       ...captionsTheme,
    //       FontSize: captionsTheme.FontSize - STEP,
    //     }),
    // ],
    // [
    //   "mod+=",
    //   () =>
    //     setCaptionsTheme({
    //       ...captionsTheme,
    //       FontSize: captionsTheme.FontSize + STEP,
    //     }),
    // ],
    // [
    //   "mod+-",
    //   () =>
    //     setCaptionsTheme({
    //       ...captionsTheme,
    //       FontSize: captionsTheme.FontSize - STEP,
    //     }),
    // ],
    // [
    //   "mod+0",
    //   () =>
    //     setCaptionsTheme({
    //       ...captionsTheme,
    //       FontSize: DEFAULT.FontSize,
    //     }),
    // ],
    // [
    //   "mod+L",
    //   () =>
    //     addLine(
    //       `Negative. The T-1000's highest probability for success now... will be to copy Sarah Connor and wait for you to make contact with her.`
    //     ),
    // ],
    // ["mod+K", () => addLine(`I write this sitting in the kitchen sink.`)],
  ]);

  useEffect(() => {
    const onTranslate = (translation: Translation) => {
      addLine(translation);
      setShowExampleLine(false);
    };
    socket?.on("translation", onTranslate);
    return () => {
      socket?.off("translation", onTranslate);
    };
  }, [addLine, socket]);

  const language = TARGET_LANGS.find((l) => l.value === targetLang);

  return (
    <AppShell
      // hidden
      styles={{
        root: {
          backgroundColor:
            captionsTheme.ScreenBackground || captionsTheme.TextBackground,
        },
      }}
      header={
        <Header
          height={70}
          p="md"
          sx={{
            opacity: 0.2,
            "&:hover": { opacity: 1 },
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Group sx={{ width: "100%", justifyContent: "space-between" }}>
            <Group>
              <MediaQuery smallerThan={900} styles={{ display: "none" }}>
                <ActionIcon onClick={onGoBack}>
                  <IconArrowLeft />
                </ActionIcon>
              </MediaQuery>
              <Text color="hsOrange">{roomId}</Text>
              {isMobile ? null : (
                <>
                  {language?.flag}
                  <Text>{isReady ? "ready" : "not ready"}</Text>
                </>
              )}
            </Group>
            <Group>
              {isMobile ? (
                TARGET_LANGS.map((l) => (
                  <ActionIcon
                    key={l.value}
                    onClick={() =>
                      router.push(`/${router.query.room}/${l.value}`)
                    }
                    sx={(theme) => ({
                      backgroundColor:
                        router.query.lang === l.value
                          ? theme.colors.hsOrange[7]
                          : "inherit",
                    })}
                    radius="xl"
                    size="lg"
                  >
                    <Text size={25}>{l.flag}</Text>
                  </ActionIcon>
                ))
              ) : (
                <Select
                  placeholder="Pick one"
                  data={TARGET_LANGS.map((l) => ({
                    value: l.value,
                    label: l.label,
                  }))}
                  value={targetLang}
                  onChange={(l) => router.push(`/${router.query.room}/${l}`)}
                />
              )}

              <Settings />
            </Group>
          </Group>
        </Header>
      }
    >
      <Box sx={{ height: "100%" }}>
        <Stack
          align="stretch"
          style={{
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              position: "absolute",
              bottom:
                captionsTheme.TextVerticalAlign === "center"
                  ? "calc(50% - 1em)"
                  : 0,
              width: "100%",
            }}
            p="lg"
            dir={language?.dir === "rtl" ? "rtl" : "ltr"}
          >
            {showExampleLine ? (
              <Box sx={{ textAlign: captionsTheme.TextAlign }}>
                <CaptionLine text={exampleLine} />
              </Box>
            ) : null}
            {lines.map((line, idx) => (
              <Box
                key={line.timestamp}
                sx={{ textAlign: captionsTheme.TextAlign }}
              >
                <CaptionLine text={line.text} />
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    </AppShell>
  );
};
