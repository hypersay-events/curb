import {
  Button,
  Center,
  Chip,
  Chips,
  ColorInput,
  Group,
  Paper,
  ScrollArea,
  Slider,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MarksProps } from "@mantine/core/lib/components/Slider/Marks/Marks";
import { SetStateAction, useState } from "react";
import { FIRST_LINERS } from "./Captions";
import { appWindow } from "@tauri-apps/api/window";
import {
  CaptionStylePresets,
  CAPTION_STYLES,
  useCaptionsTheme,
} from "../hooks/useCaptionsTheme";
import CaptionLine from "./CaptionLine";

export const STEP = 0.1;

export const Settings = () => {
  // const [showOnTop, setShowOnTop] = useLocalStorage({
  //   key: "show-on-top",
  //   defaultValue: true,
  // });

  const theme = useMantineTheme();
  const {
    captionsTheme,
    setCaptionStyle,
    setFontSize,
    setTextWeight,
    setLineHeight,
    setBionicReading,
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

  const FONTWEIGHT_MARKS: MarksProps["marks"] = [
    { value: 200, label: "thin" },
    { value: 300, label: "normal" },
    { value: 500, label: "bold" },
    { value: 700, label: "bolder" },
    { value: 900, label: "black" },
  ];

  const swatches = [
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
  ];

  console.log({ captionsTheme });

  return (
    <Paper
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "auto",
      }}
      p="lg"
    >
      <Stack spacing="xl" align="start">
        <Text size="lg" color="white">
          Settings
        </Text>

        <Text>Caption Styles</Text>

        <Group spacing={10}>
          {CAPTION_STYLES.map((k) => {
            const capTheme = CAPTION_STYLES.find(
              (i) => i.StyleId === k.StyleId
            );
            return (
              <Chip
                key={k.StyleId}
                value={k.StyleId}
                checked={k.StyleId === captionsTheme.StyleId}
                variant={
                  capTheme?.StyleId === "noBackground" ? "outline" : "filled"
                }
                color="gray"
                styles={{
                  iconWrapper: { color: capTheme?.TextColor },
                  checked: {
                    color: capTheme?.TextColor,
                    background: `${capTheme?.TextBackground} !important`,
                  },
                  filled: {
                    color: capTheme?.TextColor,
                    background: capTheme?.TextBackground,
                    fontWeight: "bold",
                  },
                  outline: {
                    fontWeight: "bold",
                  },
                }}
                onChange={() =>
                  setCaptionStyle({
                    ...capTheme,
                  })
                }
              >
                {k.StyleLabel}
              </Chip>
            );
          })}
        </Group>

        {captionsTheme.StyleId === "custom" ? (
          <Group>
            <ColorInput
              label="Text color"
              value={captionsTheme.TextColor}
              onChange={(e) => setCaptionStyle({ TextColor: e })}
              format="rgba"
              swatches={swatches}
            />
            <ColorInput
              label="Background color"
              value={captionsTheme.TextBackground}
              onChange={(e) => setCaptionStyle({ TextBackground: e })}
              format="rgba"
              swatches={swatches}
            />
          </Group>
        ) : null}

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
        {/* <Group style={{ width: 400 }}>
          <Text size="sm">Font weight</Text>
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
            onChange={setTextWeight}
            marks={FONTWEIGHT_MARKS}
          />
        </Group> */}
        <Center
          style={{
            flexGrow: 1,
            border: `1px solid ${theme.colors.gray[7]}`,
            borderRadius: theme.radius.lg,
          }}
          p="lg"
        >
          <CaptionLine text={previewLine} />
        </Center>

        {/* <Switch
          label="Show captions on top"
          checked={showOnTop}
          onChange={(event) => setShowOnTop(event.currentTarget.checked)}
        /> */}
        <Button onClick={() => appWindow.close()}>Done</Button>
      </Stack>
    </Paper>
  );
};

export default Settings;
