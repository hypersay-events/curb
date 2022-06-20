import {
  Box,
  Button,
  Center,
  ColorInput,
  DEFAULT_THEME,
  Group,
  Paper,
  Slider,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { MarksProps } from "@mantine/core/lib/components/Slider/Marks/Marks";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { FIRST_LINERS } from "./Captions";
import { appWindow } from "@tauri-apps/api/window";

export const STEP = 0.1;
export const DEFAULT_FONT_SIZE = 3;
export const DEFAULT_TEXT_COLOR = "#ffffff";
export const DEFAULT_BG_COLOR = "#000000";

export const Settings = () => {
  // const [showOnTop, setShowOnTop] = useLocalStorage({
  //   key: "show-on-top",
  //   defaultValue: true,
  // });

  const [previewLine, setPreviewLine] = useState(
    FIRST_LINERS[Math.floor(Math.random() * FIRST_LINERS.length)]
  );

  const [fontSize, setFontSize] = useLocalStorage({
    key: "font-size",
    defaultValue: DEFAULT_FONT_SIZE,
  });

  const [bgColor, setBgColor] = useLocalStorage({
    key: "background-color",
    defaultValue: DEFAULT_BG_COLOR,
  });

  const [textColor, setTextColor] = useLocalStorage({
    key: "text-color",
    defaultValue: DEFAULT_TEXT_COLOR,
  });

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
            defaultValue={textColor}
            onChange={setTextColor}
            withPicker={false}
            format="hex"
            swatches={[
              ...DEFAULT_THEME.colors.dark,
              ...DEFAULT_THEME.colors.yellow,
              ...DEFAULT_THEME.colors.orange,
              ...DEFAULT_THEME.colors.red,
              ...DEFAULT_THEME.colors.green,
              ...DEFAULT_THEME.colors.blue,
              ...DEFAULT_THEME.colors.indigo,
            ]}
          />
          <ColorInput
            label="Background color"
            defaultValue={bgColor}
            onChange={setBgColor}
            withPicker={false}
            format="hex"
            swatches={[
              ...DEFAULT_THEME.colors.dark,
              ...DEFAULT_THEME.colors.yellow,
              ...DEFAULT_THEME.colors.orange,
              ...DEFAULT_THEME.colors.red,
              ...DEFAULT_THEME.colors.green,
              ...DEFAULT_THEME.colors.blue,
              ...DEFAULT_THEME.colors.indigo,
            ]}
          />
        </Group>

        <Group style={{ width: 400 }}>
          <Text size="sm">Font size</Text>
          <Slider
            style={{ flexGrow: 1 }}
            // labelAlwaysOn
            defaultValue={fontSize}
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
              fontSize: `${fontSize}vw`,
              fontWeight: "bold",
              lineHeight: "110%",
              backgroundColor: bgColor,
              boxShadow: `0.2em 0 0 ${bgColor},-0.2em 0 0 ${bgColor}`,
              color: textColor,
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
