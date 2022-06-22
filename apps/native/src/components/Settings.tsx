import {
  Button,
  Center,
  ColorInput,
  Group,
  Paper,
  Slider,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MarksProps } from "@mantine/core/lib/components/Slider/Marks/Marks";
import { useState } from "react";
import { FIRST_LINERS } from "./Captions";
import { appWindow } from "@tauri-apps/api/window";
import { DEFAULT, useCaptionsTheme } from "../hooks/useCaptionsTheme";

export const STEP = 0.1;

export const Settings = () => {
  // const [showOnTop, setShowOnTop] = useLocalStorage({
  //   key: "show-on-top",
  //   defaultValue: true,
  // });

  const theme = useMantineTheme();
  const {
    captionsTheme,
    setTextColor,
    setFontSize,
    setTextBackground,
    setTextShadow,
    setTextStroke,
    setTextWeight,
    setBionicReading,
    setLineHeight,
    setMode,
    setWindowBackground,
  } = useCaptionsTheme();

  const [previewLine, setPreviewLine] = useState(
    FIRST_LINERS[Math.floor(Math.random() * FIRST_LINERS.length)]
  );

  const FONTSIZE_MARKS: MarksProps["marks"] = [
    { value: 2, label: "small" },
    { value: 3, label: "regular" },
    { value: 4, label: "big" },
    { value: 5, label: "massive" },
  ];

  return (
    <Paper
      style={{
        height: "100vh",
        width: "100vw",
      }}
      p="lg"
    >
      <Stack spacing="xl" align="start" style={{ height: "100%" }}>
        <Text size="lg" color="white">
          Settings
        </Text>

        <Group>
          <ColorInput
            label="Text color"
            value={captionsTheme.TextColor}
            onChange={setTextColor}
            format="rgba"
            swatches={[
              theme.fn.rgba("#ffffff", 1),
              theme.fn.rgba("#868e96", 1),
              theme.fn.rgba("#25262b", 1),
              theme.fn.rgba("#000000", 1),
              theme.fn.rgba("#fa5252", 1),
              theme.fn.rgba("#e64980", 1),
              theme.fn.rgba("#be4bdb", 1),
              theme.fn.rgba("#7950f2", 1),
              theme.fn.rgba("#4c6ef5", 1),
              theme.fn.rgba("#228be6", 1),
              theme.fn.rgba("#15aabf", 1),
              theme.fn.rgba("#12b886", 1),
              theme.fn.rgba("#40c057", 1),
              theme.fn.rgba("#82c91e", 1),
              theme.fn.rgba("#fab005", 1),
              theme.fn.rgba("#fd7e14", 1),
            ]}
          />
          <ColorInput
            label="Background color"
            value={captionsTheme.TextBackground}
            onChange={setTextBackground}
            format="rgba"
            swatches={[
              theme.fn.rgba("#ffffff", 1),
              theme.fn.rgba("#868e96", 1),
              theme.fn.rgba("#25262b", 1),
              theme.fn.rgba("#000000", 1),
              theme.fn.rgba("#fa5252", 1),
              theme.fn.rgba("#e64980", 1),
              theme.fn.rgba("#be4bdb", 1),
              theme.fn.rgba("#7950f2", 1),
              theme.fn.rgba("#4c6ef5", 1),
              theme.fn.rgba("#228be6", 1),
              theme.fn.rgba("#15aabf", 1),
              theme.fn.rgba("#12b886", 1),
              theme.fn.rgba("#40c057", 1),
              theme.fn.rgba("#82c91e", 1),
              theme.fn.rgba("#fab005", 1),
              theme.fn.rgba("#fd7e14", 1),
            ]}
          />
        </Group>

        <Group style={{ width: 400 }}>
          <Text size="sm">Font size</Text>
          <Slider
            style={{ flexGrow: 1 }}
            // labelAlwaysOn
            defaultValue={captionsTheme.FontSize}
            min={2}
            max={5}
            label={(fontSize) =>
              FONTSIZE_MARKS.find((mark) => mark.value === fontSize)?.label ||
              `${fontSize.toFixed(1)}vw`
            }
            step={STEP}
            styles={{ markLabel: { display: "none" } }}
            onChange={setFontSize}
            marks={FONTSIZE_MARKS}
          />
        </Group>
        <Center style={{ flexGrow: 1 }}>
          <Text
            component="span"
            style={{
              display: "inline",
              fontSize: `${captionsTheme.FontSize}vw`,
              fontWeight: "bold",
              lineHeight: "110%",
              backgroundColor: captionsTheme.TextBackground,
              boxShadow: `0.2em 0 0 ${captionsTheme.TextBackground},-0.2em 0 0 ${captionsTheme.TextBackground}`,
              color: captionsTheme.TextColor,
              transition: "color 0.5s ease",
              // borderRadius: theme.radius.md,
            }}
          >
            {previewLine}
          </Text>
        </Center>

        {/* <Switch
          label="Show captions on top"
          checked={showOnTop}
          onChange={(event) => setShowOnTop(event.currentTarget.checked)}
        /> */}
        <Button onClick={() => appWindow.close()}>Close settings</Button>
      </Stack>
    </Paper>
  );
};

export default Settings;
