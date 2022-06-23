import {
  AlphaSlider,
  Anchor,
  Box,
  Button,
  Center,
  Chip,
  ColorInput,
  Group,
  Paper,
  Slider,
  Stack,
  Switch,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MarksProps } from "@mantine/core/lib/components/Slider/Marks/Marks";
import { useState } from "react";
import { FIRST_LINERS } from "./Captions";
import { appWindow } from "@tauri-apps/api/window";
import { CAPTION_STYLES, useCaptionsTheme } from "../hooks/useCaptionsTheme";
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
    setWindowOpacity,
    setBionicReading,
    setMode,
  } = useCaptionsTheme();

  const [previewLine] = useState(
    FIRST_LINERS[Math.floor(Math.random() * FIRST_LINERS.length)]
  );

  const FONTSIZE_MARKS: MarksProps["marks"] = [
    { value: 2, label: "small" },
    { value: 3, label: "regular" },
    { value: 4, label: "big" },
    { value: 5, label: "massive" },
  ];

  const TEXTWEIGHT_MARKS: MarksProps["marks"] = [
    { value: 100, label: "thin" },
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
      <Stack spacing={20} style={{ minHeight: "100%" }}>
        <Text size="lg" color="white" component="h1" mb="lg">
          Settings
        </Text>
        <Box
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "auto 1fr",
            gap: "3em",
          }}
          pr="lg"
        >
          {/* Text Size */}
          <Text size="sm">Text size</Text>
          <Slider
            style={{ flexGrow: 1 }}
            // labelAlwaysOn
            defaultValue={captionsTheme.FontSize}
            min={2}
            max={5}
            // label={(fontSize) =>
            //   FONTSIZE_MARKS.find((mark) => mark.value === fontSize)?.label ||
            //   `${fontSize.toFixed(1)}vw`
            // }
            step={STEP}
            // styles={{ markLabel: { display: "none" } }}
            onChange={setFontSize}
            marks={FONTSIZE_MARKS}
            precision={1}
          />

          {/* Window Opacity */}
          <Text size="sm">Window Opacity</Text>
          <AlphaSlider
            color="rgba(0,0,0,1)"
            value={captionsTheme.WindowOpacity}
            onChange={setWindowOpacity}
            size="sm"
          />

          {/* Caption Styles */}
          <Text size="sm">Caption Styles</Text>
          <Box>
            <Group spacing={10}>
              {CAPTION_STYLES.map((k) => {
                const capTheme = CAPTION_STYLES.find(
                  (i) => i.StyleId === k.StyleId
                );

                console.log({ capTheme });
                return (
                  <Chip
                    key={k.StyleId}
                    value={k.StyleId}
                    checked={k.StyleId === captionsTheme.StyleId}
                    // variant={
                    //   capTheme?.StyleId === "noBackground" ? "outline" : "filled"
                    // }
                    // color="gray"
                    styles={{
                      iconWrapper: { color: capTheme?.TextColor },
                      // checked: {
                      //   color: capTheme?.TextColor,
                      //   background: `${capTheme?.TextBackground} !important`,
                      // },
                      // filled: {
                      //   color: capTheme?.TextColor,
                      //   background: capTheme?.TextBackground,
                      //   fontWeight: "bold",
                      // },
                      outline: {
                        fontWeight: "bold",
                      },
                    }}
                    onChange={() => {
                      console.log("send style", { capTheme });
                      setCaptionStyle({
                        ...capTheme,
                      });
                    }}
                  >
                    {k.StyleLabel}
                  </Chip>
                );
              })}
            </Group>
          </Box>

          {/* Custom */}
          {captionsTheme.StyleId === "custom" ? (
            <>
              <Text size="sm">Custom Style</Text>
              <Stack spacing={30}>
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
                <Group style={{ width: 400 }}>
                  <Text size="sm">Text weight</Text>
                  <Slider
                    style={{ flexGrow: 1 }}
                    defaultValue={captionsTheme.TextWeight}
                    min={100}
                    max={900}
                    // label={(size) =>
                    //   TEXTWEIGHT_MARKS.find((mark) => mark.value === size)?.label ||
                    //   size.toFixed(1)
                    // }
                    step={10}
                    // styles={{ markLabel: { display: "none" } }}
                    onChange={(e) => setCaptionStyle({ TextWeight: e })}
                    marks={TEXTWEIGHT_MARKS}
                    precision={0}
                  />
                </Group>
                <Group style={{ width: 400 }}>
                  <Text size="sm">Text stroke</Text>
                  <Slider
                    style={{ flexGrow: 1 }}
                    defaultValue={captionsTheme.TextStroke}
                    min={0}
                    max={10}
                    // label={(size) =>
                    //   TEXTWEIGHT_MARKS.find((mark) => mark.value === size)?.label ||
                    //   size.toFixed(1)
                    // }
                    step={1}
                    // styles={{ markLabel: { display: "none" } }}
                    onChange={(e) => setCaptionStyle({ TextStroke: e })}
                    // marks={TEXTWEIGHT_MARKS}
                    precision={0}
                  />
                </Group>
                <Group style={{ width: 400 }}>
                  <Text size="sm">Line spacing</Text>
                  <Slider
                    style={{ flexGrow: 1 }}
                    defaultValue={captionsTheme.LineHeight}
                    min={1}
                    max={2}
                    // label={(size) =>
                    //   TEXTWEIGHT_MARKS.find((mark) => mark.value === size)?.label ||
                    //   size.toFixed(1)
                    // }
                    step={0.1}
                    // styles={{ markLabel: { display: "none" } }}
                    onChange={(e) => setCaptionStyle({ LineHeight: e })}
                    // marks={TEXTWEIGHT_MARKS}
                    precision={2}
                  />
                </Group>
                <Switch
                  label="Enable Bionic Reading"
                  checked={captionsTheme.BionicReading}
                  onChange={(e) => setBionicReading(e.currentTarget.checked)}
                />
              </Stack>
            </>
          ) : null}
        </Box>

        <Center
          style={{
            flexGrow: 1,
            border: `1px solid ${theme.colors.gray[7]}`,
            borderRadius: theme.radius.lg,
            background: `repeating-linear-gradient(
              45deg,
              #606dbc,
              #606dbc 10px,
              #465298 10px,
              #465298 20px
            )`,
          }}
          p="lg"
        >
          <CaptionLine text={previewLine} />
        </Center>
        {captionsTheme.BionicReading ? (
          <Text color="dimmed">
            Bionic Reading is an experimental mode that speeds up reading by
            helping you focus on the first letters in a word.{" "}
            <Anchor href="https://bionic-reading.com/" target="_blank">
              read more here
            </Anchor>
          </Text>
        ) : null}
        <Box style={{ flexGrow: 1 }} />
        <Button
          onClick={() => appWindow.close()}
          style={{ alignSelf: "flex-start" }}
        >
          Done
        </Button>
      </Stack>
    </Paper>
  );
};

export default Settings;
