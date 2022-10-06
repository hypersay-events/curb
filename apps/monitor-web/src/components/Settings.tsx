import {
  ActionIcon,
  AlphaSlider,
  Anchor,
  Box,
  Button,
  Center,
  Chip,
  ColorInput,
  Container,
  Drawer,
  Grid,
  Group,
  Paper,
  Radio,
  SimpleGrid,
  Slider,
  Stack,
  StackProps,
  Switch,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MarksProps } from "@mantine/core/lib/components/Slider/Marks/Marks";
import { useState } from "react";
import { englishFirstLiners } from "../utils/languages";
import {
  CaptionsTheme,
  CAPTION_STYLES,
  DEFAULT,
  storedThemeAtom,
} from "../atoms/theme";
import CaptionLine from "./CaptionLine";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { IconRefresh, IconSettings } from "@tabler/icons";

export const STEP = 0.1;

interface SettingsBox extends StackProps {
  label: string;
}

const SettingsBox: React.FC<SettingsBox> = ({ label = "Label", children }) => {
  return (
    <Stack
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        border: "1px solid",
        borderRadius: theme.radius.md,
        borderColor: theme.colors.gray[8],
      })}
      spacing="sm"
      p="sm"
    >
      <Text size="sm">{label}</Text>
      {children}
    </Stack>
  );
};

export const Settings = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [captionsTheme, setCaptionsTheme] = useAtom(storedThemeAtom);

  const [previewLine] = useState(
    englishFirstLiners[Math.floor(Math.random() * englishFirstLiners.length)]
  );

  const FONTSIZE_MARKS: MarksProps["marks"] = [
    { value: 2.1, label: "small" },
    { value: 3, label: "regular" },
    { value: 4, label: "big" },
    { value: 4.8, label: "massive" },
  ];

  const TEXTWEIGHT_MARKS: MarksProps["marks"] = [
    { value: 120, label: "thin" },
    { value: 300, label: "normal" },
    { value: 500, label: "bold" },
    { value: 700, label: "bolder" },
    { value: 870, label: "black" },
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

  return (
    <>
      <ActionIcon onClick={() => setOpened(true)} variant="light">
        <IconSettings />
      </ActionIcon>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Subtitle settings"
        position="top"
        padding="xl"
        size="75%"
      >
        <Grid sx={{ width: "100%" }}>
          {/* Text Size */}
          <Grid.Col sm={12} lg={6}>
            <SettingsBox label="Text size">
              <Slider
                mb="lg"
                defaultValue={captionsTheme.FontSize}
                min={2}
                max={5}
                step={STEP}
                styles={{
                  label: { display: "none" },
                }}
                onChange={(e) =>
                  setCaptionsTheme({ ...captionsTheme, FontSize: e })
                }
                marks={FONTSIZE_MARKS}
                precision={1}
                sx={{ maxWidth: 600 }}
              />
            </SettingsBox>
          </Grid.Col>

          {/* Window Opacity */}
          <Grid.Col sm={12} lg={6}>
            <SettingsBox label="Mode">
              <Radio.Group
                value={captionsTheme.Mode}
                onChange={(e) =>
                  setCaptionsTheme({
                    ...captionsTheme,
                    Mode: e as CaptionsTheme["Mode"],
                  })
                }
              >
                <Radio
                  value="cc"
                  label={
                    <Stack spacing={0} ml="sm" mt={-20}>
                      <Text style={{ lineHeight: "100%" }} size="lg">
                        Subtitles
                      </Text>
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
                    <Stack spacing={0} ml="sm" mt={-20}>
                      <Text style={{ lineHeight: "100%" }} size="lg">
                        Transcript
                      </Text>
                      <Text color="dimmed" size="xs">
                        Text is kept permanently on screen
                      </Text>
                    </Stack>
                  }
                />
              </Radio.Group>
            </SettingsBox>
          </Grid.Col>

          <Grid.Col span={12}>
            <SettingsBox label="Caption styles">
              <Box>
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
                        styles={(theme) => ({
                          iconWrapper: { color: theme.white },
                          label: {
                            "&[data-checked]": {
                              backgroundColor: `${theme.colors.hsOrange[7]} !important`,
                            },
                            color: theme.white,
                          },
                        })}
                        onChange={() => {
                          setCaptionsTheme({
                            ...captionsTheme,
                            ...capTheme,
                          });
                        }}
                        color="hsOrange"
                        variant={
                          k.StyleId === captionsTheme.StyleId
                            ? "filled"
                            : "outline"
                        }
                      >
                        {k.StyleLabel}
                      </Chip>
                    );
                  })}
                </Group>
              </Box>
            </SettingsBox>
          </Grid.Col>

          {/* Custom */}
          {captionsTheme.StyleId === "custom" ? (
            <Grid.Col span={12}>
              <Text size="sm">Custom Style</Text>
              <Stack spacing={30}>
                <Group>
                  <ColorInput
                    label="Text color"
                    value={captionsTheme.TextColor}
                    onChange={(e) =>
                      setCaptionsTheme({ ...captionsTheme, TextColor: e })
                    }
                    format="rgba"
                    swatches={swatches}
                  />
                  <ColorInput
                    label="Background color"
                    value={captionsTheme.TextBackground}
                    onChange={(e) =>
                      setCaptionsTheme({
                        ...captionsTheme,
                        TextBackground: e,
                      })
                    }
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
                    onChange={(e) =>
                      setCaptionsTheme({ ...captionsTheme, TextWeight: e })
                    }
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
                    onChange={(e) =>
                      setCaptionsTheme({ ...captionsTheme, TextStroke: e })
                    }
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
                    onChange={(e) =>
                      setCaptionsTheme({ ...captionsTheme, LineHeight: e })
                    }
                    // marks={TEXTWEIGHT_MARKS}
                    precision={2}
                  />
                </Group>
                <Switch
                  label="Enable Bionic Reading"
                  checked={captionsTheme.BionicReading}
                  onChange={(e) =>
                    setCaptionsTheme({
                      ...captionsTheme,
                      BionicReading: e.currentTarget.checked,
                    })
                  }
                />
              </Stack>
            </Grid.Col>
          ) : null}
          {captionsTheme.BionicReading ? (
            <Grid.Col span={12}>
              <Text color="dimmed">
                Bionic Reading is an experimental mode that speeds up reading by
                helping you focus on the first letters in a word.{" "}
                <Anchor href="https://bionic-reading.com/" target="_blank">
                  read more here
                </Anchor>
              </Text>
            </Grid.Col>
          ) : null}

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
              height: "100%",
            }}
            p="xl"
          >
            <Box
              style={{
                backgroundColor: `rgba(0,0,0,${captionsTheme.WindowOpacity})`,
                ...theme.fn.cover(),
              }}
            />
            <CaptionLine text={previewLine} />
          </Center>
        </Grid>

        <Group
          style={{
            width: "100%",
            justifyContent: "space-between",
            position: "fixed",
            bottom: 0,
            left: 0,
          }}
          p="md"
        >
          <Button
            onClick={() => setCaptionsTheme(DEFAULT)}
            style={{ alignSelf: "flex-start" }}
            leftIcon={<IconRefresh size={20} />}
            color="gray"
            // variant="white"
            disabled={JSON.stringify(DEFAULT) === JSON.stringify(captionsTheme)}
          >
            Reset theme
          </Button>
          <Button
            onClick={() => setOpened(false)}
            style={{ alignSelf: "flex-start" }}
          >
            Done
          </Button>
        </Group>
      </Drawer>
    </>
  );
};

export default Settings;
