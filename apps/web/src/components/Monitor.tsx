import { Badge, Box, Group, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import { Translation, useMonitor } from "../hooks/useMonitor";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useListState } from "@mantine/hooks";

interface MonitorProps {
  roomName: string;
  language?: string;
}

const NEXT_PUBLIC_CAPTIONS_ENDPOINT =
  process.env.NEXT_PUBLIC_CAPTIONS_ENDPOINT || "http://localhost:4664";

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

  useEffect(
    () => linesHandlers.append(translation as Translation),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translation]
  );

  console.log({ lines });

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
                  display: "inline",
                  fontSize: theme.fontSizes.xl,
                  fontWeight: "bold",
                  lineHeight: "110%",
                  backgroundColor: theme.colors.gray[9],
                  boxShadow: `0.2em 0 0 ${theme.colors.gray[9]},-0.2em 0 0 ${theme.colors.gray[9]}`,
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
    </Stack>
  );
};
