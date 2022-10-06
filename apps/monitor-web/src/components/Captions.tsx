import { useContext, useEffect, useState } from "react";
import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Drawer,
  Group,
  Header,
  Modal,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useLines } from "../hooks/useCaptionLines";
import { SocketContext } from "./SocketProvider";
import { TARGET_LANGS } from "../utils/languages";
import CaptionLine from "./CaptionLine";
import { storedThemeAtom } from "../atoms/theme";
import { useAtom } from "jotai";
import { IconSettings, IconArrowLeft } from "@tabler/icons";
import Settings from "./Settings";
import { useRouter } from "next/router";

// import llamaBase64 from "./llama.json";

export interface CaptionsParams {
  onGoBack?: () => void;
}

export const Captions = function Captions({ onGoBack }: CaptionsParams) {
  const { socket, roomId, targetLang, isReady } = useContext(SocketContext);
  const [showExampleLine, setShowExampleLine] = useState(true);
  const [exampleLine, setExampleLine] = useState("");
  const router = useRouter();
  const [lang, setLang] = useState<string>(router.query.lang as string);

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
    if (lang !== router.query.lang) {
      router.push(`/${router.query.room}/${lang}`);
    }
  }, [lang, router]);

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
    <AppShell
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
              <ActionIcon onClick={onGoBack}>
                <IconArrowLeft />
              </ActionIcon>
              <Badge>{roomId}</Badge>
              {language?.flag}
              <Text>{isReady ? "ready" : "not ready"}</Text>
            </Group>
            <Group>
              <Select
                // label="Language"
                placeholder="Pick one"
                clearable
                data={TARGET_LANGS.map((l) => ({
                  value: l.value,
                  label: l.label,
                }))}
                value={lang}
                onChange={(l) => setLang(l as string)}
                // size="lg"
              />
              <Settings />
            </Group>
          </Group>
        </Header>
      }
    >
      <Box>
        <Stack
          align="stretch"
          style={{
            height: "100%",
            position: "relative",
          }}
        >
          {/* Menu */}
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
    </AppShell>
  );
};
