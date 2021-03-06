import { Badge, Box, Divider, Group, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import { Translation, useMonitor } from "../hooks/useMonitor";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useListState } from "@mantine/hooks";

interface MonitorProps {
  roomName: string;
  language?: string;
}

const NEXT_PUBLIC_CAPTIONS_ENDPOINT =
  process.env.NEXT_PUBLIC_CAPTIONS_ENDPOINT || "http://localhost:4554";

export const Monitor: React.FC<MonitorProps> = ({
  roomName,
  language = "original",
}) => {
  const { isConnected, translation } = useMonitor(roomName, language);

  return (
    <Badge>
      <p>{isConnected ? "connected" : "disconnected"}</p>
      <p>{translation?.text}</p>
    </Badge>
  );
};

export const Status: React.FC<MonitorProps> = ({
  roomName,
  language = "original",
}) => {
  const { isConnected } = useMonitor(roomName, language);

  return (
    <Badge color={isConnected ? "gray" : "red"}>
      {isConnected ? "connected" : "disconnected"}
    </Badge>
  );
};

export const TranslationLines: React.FC<MonitorProps> = ({
  roomName,
  language = "original",
}) => {
  const [lines, linesHandlers] = useListState<Translation>();

  // const [translationLines, setTranslationLines] = useState<Translation[]>([]);
  const { translation } = useMonitor(roomName, language);
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      linesHandlers.append(translation as Translation);
      setTimeout(
        () => ref.current?.scrollIntoView({ behavior: "smooth" }),
        500
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translation]
  );

  return (
    <Stack ref={parent} spacing={10}>
      {lines.map((line) => {
        if (!line) return null;
        const date = new Date(line.timestampEnd);
        return (
          <Group key={line.timestampStart} noWrap align="start">
            <Box style={{ flexGrow: 1 }}>
              <Text
                component="span"
                sx={(theme) => ({
                  color: theme.white,
                  display: "inline",
                  fontSize: theme.fontSizes.xl,
                  fontWeight: 700,
                  lineHeight: "1.20em",
                  backgroundColor: theme.colors.gray[9],
                  boxShadow: `0.2em 0 0 ${theme.colors.gray[9]},-0.2em 0 0 ${theme.colors.gray[9]}`,
                  animation: "line-highlight 3s linear",
                  animationPlayState: "running",
                })}
              >
                {line.text}
              </Text>
            </Box>
            <Text
              color="dimmed"
              size="xs"
              style={{ whiteSpace: "nowrap", overflow: "visible" }}
            >
              {date.toLocaleString()}
            </Text>
          </Group>
        );
      })}
      <Divider
        ref={ref}
        my="sm"
        size={2}
        variant="dotted"
        // color="red"
        label="End of transcript"
      />
      {/* <Box
        
        sx={(theme) => ({ borderTop: `1px solid ${theme.colors.red[7]}` })}
      /> */}
    </Stack>
  );
};
