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
  Radio,
  RadioGroup,
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
import {
  CaptionsTheme,
  CAPTION_STYLES,
  storedThemeAtom,
} from "../hooks/useCaptionsTheme";
import CaptionLine from "./CaptionLine";
import { useAtom } from "jotai";

export const STEP = 0.1;

export const Settings = () => {
  // const [showOnTop, setShowOnTop] = useLocalStorage({
  //   key: "show-on-top",
  //   defaultValue: true,
  // });

  const theme = useMantineTheme();
  const [captionsTheme, setCaptionsTheme] = useAtom(storedThemeAtom);
  // const { captionsTheme, updateCaptionsTheme } = useCaptionsTheme();

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

  console.log("settings:", { captionsTheme });

  return (
    <Paper
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        borderRadius: 0,
      }}
      p="lg"
    >
      <Stack spacing={20} style={{ minHeight: "100%" }} mt={10}>
        {/* <Text size="lg" color="white" component="h1" mb="lg">
          Settings
        </Text> */}
        <Box
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "auto 1fr",
            gap: "2em",
          }}
          pr="lg"
        >
          {/* Text Size */}
          <Text size="sm">Text size</Text>
          <Slider
            style={{ flexGrow: 1 }}
            // labelAlwaysOn
            defaultValue={captionsTheme?.FontSize}
            min={2}
            max={5}
            // label={(fontSize) =>
            //   FONTSIZE_MARKS.find((mark) => mark.value === fontSize)?.label ||
            //   `${fontSize.toFixed(1)}vw`
            // }
            step={STEP}
            styles={{ label: { display: "none" } }}
            onChange={(e) => setCaptionsTheme({ FontSize: e })}
            marks={FONTSIZE_MARKS}
            precision={1}
          />

          {/* Window Opacity */}
          <Text size="sm">Window Opacity</Text>
          <AlphaSlider
            color="rgba(0,0,0,1)"
            value={captionsTheme?.WindowOpacity as number}
            onChange={(e) => setCaptionsTheme({ WindowOpacity: e })}
            size="sm"
          />
          <Text size="sm">Mode</Text>
          <RadioGroup
            value={captionsTheme?.Mode}
            onChange={(e) =>
              setCaptionsTheme({
                // ...captionsTheme,
                Mode: e as CaptionsTheme["Mode"],
              })
            }
            mt={-15}

            // label="Select your favorite framework/library"
            // description="This is anonymous"
            // required
          >
            <Radio
              value="cc"
              label={
                <Stack spacing={0}>
                  <Text style={{ lineHeight: "100%" }}>Subtitles</Text>
                  <Text color="dimmed" size="xs">
                    Text disappears after 10s
                  </Text>
                </Stack>
              }
              mr={20}
            />
            <Radio
              value="transcript"
              label={
                <Stack spacing={0}>
                  <Text style={{ lineHeight: "100%" }}>Transcript</Text>
                  <Text color="dimmed" size="xs">
                    Text is kept permanently on screen
                  </Text>
                </Stack>
              }
            />
          </RadioGroup>

          {/* Caption Styles */}
          <Text size="sm">Caption Styles</Text>
          <Box>
            <Group spacing={10}>
              {CAPTION_STYLES.map((k) => {
                const capTheme = CAPTION_STYLES.find(
                  (i) => i.StyleId === k.StyleId
                );

                // console.log({ capTheme });
                return (
                  <Chip
                    key={k.StyleId}
                    value={k.StyleId}
                    checked={k.StyleId === captionsTheme?.StyleId}
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
                      // console.log("send style", { capTheme });
                      setCaptionsTheme({
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
          {captionsTheme?.StyleId === "custom" ? (
            <>
              <Text size="sm">Custom Style</Text>
              <Stack spacing={30}>
                <Group>
                  <ColorInput
                    label="Text color"
                    value={captionsTheme?.TextColor}
                    onChange={(e) => setCaptionsTheme({ TextColor: e })}
                    format="rgba"
                    swatches={swatches}
                  />
                  <ColorInput
                    label="Background color"
                    value={captionsTheme?.TextBackground}
                    onChange={(e) => setCaptionsTheme({ TextBackground: e })}
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
                    onChange={(e) => setCaptionsTheme({ TextWeight: e })}
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
                    onChange={(e) => setCaptionsTheme({ TextStroke: e })}
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
                    onChange={(e) => setCaptionsTheme({ LineHeight: e })}
                    // marks={TEXTWEIGHT_MARKS}
                    precision={2}
                  />
                </Group>
                <Switch
                  label="Enable Bionic Reading"
                  checked={captionsTheme?.BionicReading || false}
                  onChange={(e) =>
                    setCaptionsTheme({
                      BionicReading: e.currentTarget.checked,
                    })
                  }
                />
              </Stack>
            </>
          ) : null}
        </Box>

        <Center
          style={{
            flexGrow: 1,
            borderRadius: theme.radius.lg,
            background: `repeating-linear-gradient(
              45deg,
              #606dbc,
              #606dbc 10px,
              #465298 10px,
              #465298 20px
            )`,
            overflow: "hidden",
            position: "relative",
          }}
          p="lg"
        >
          <Box
            style={{
              backgroundColor: `rgba(0,0,0,${captionsTheme?.WindowOpacity})`,
              ...theme.fn.cover(),
            }}
          />
          <CaptionLine text={previewLine} />
        </Center>
        {captionsTheme?.BionicReading ? (
          <Text color="dimmed">
            Bionic Reading is an experimental mode that speeds up reading by
            helping you focus on the first letters in a word.{" "}
            <Anchor href="https://bionic-reading.com/" target="_blank">
              read more here
            </Anchor>
          </Text>
        ) : null}

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
