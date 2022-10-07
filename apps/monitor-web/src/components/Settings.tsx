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
  ScrollArea,
  SegmentedControl,
  Select,
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
  TextAlignmentsType,
  TextVerticalAlignmentsType,
} from "../atoms/theme";
import CaptionLine from "./CaptionLine";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import {
  IconRefresh,
  IconSettings,
  IconCheck,
  IconLetterT,
  IconLineHeight,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconLayoutAlignTop,
  IconLayoutAlignCenter,
  IconLayoutAlignBottom,
  IconLayoutAlignMiddle,
} from "@tabler/icons";
import { Preview } from "./Preview";
import { kMaxLength } from "buffer";
import { useMediaQuery } from "@mantine/hooks";

export const STEP = 0.1;

interface SettingsBox extends StackProps {
  label: string;
}

const SettingsBox: React.FC<SettingsBox & { noBorder?: boolean }> = ({
  label,
  children,
  noBorder,
}) => {
  return (
    <Group
      sx={(theme) => ({
        width: "100%",
        // height: "100%",
        border: noBorder ? 0 : "1px solid",
        borderRadius: theme.radius.md,
        borderColor: theme.colors.gray[8],
      })}
      spacing="md"
      p="sm"
      noWrap
    >
      <Text size="sm" sx={{ width: 150 }}>
        {label}
      </Text>
      <Box sx={{ flexGrow: 1, width: "100%" }}>{children}</Box>
    </Group>
  );
};

export const Settings = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // const [chromaMode, setChromeMode] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const [captionsTheme, setCaptionsTheme] = useAtom(storedThemeAtom);

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
        size="100%"
        padding="md"
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height: `calc(100% - ${theme.spacing.xl * 1.8}px)`,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
            gridTemplateRows: isMobile ? "auto 1fr auto" : "1fr auto",
            gridTemplateAreas: isMobile
              ? '"settings" "preview" "menu"'
              : '"settings preview" "menu menu"',
            gap: theme.spacing.md,
          })}
        >
          {/* Side */}
          <ScrollArea
            offsetScrollbars
            sx={{ height: "100%", position: "relative", gridArea: "settings" }}
          >
            <Stack sx={{ maxWidth: 600, height: "100%" }}>
              <SettingsBox label="Text size">
                <Group>
                  <IconLetterT size={12} />
                  <Slider
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
                    // marks={FONTSIZE_MARKS}
                    precision={1}
                    sx={{ flexGrow: 1 }}
                  />
                  <IconLetterT />
                </Group>
              </SettingsBox>

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
                          Text is preserved on screen
                        </Text>
                      </Stack>
                    }
                  />
                </Radio.Group>
              </SettingsBox>
              <SettingsBox label="Caption styles">
                <Group spacing={10}>
                  <Select
                    data={CAPTION_STYLES.filter((s) =>
                      isMobile ? s.StyleId !== "custom" : true
                    ).map((k) => {
                      return {
                        label: k.StyleLabel,
                        value: k.StyleId,
                      };
                    })}
                    value={captionsTheme.StyleId}
                    onChange={(e) => {
                      setCaptionsTheme({
                        ...captionsTheme,
                        ...CAPTION_STYLES.find((i) => i.StyleId === e),
                      });
                    }}
                  />
                  {/* {CAPTION_STYLES.map((k) => {
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
                  })} */}
                </Group>
              </SettingsBox>

              {/* Custom */}
              {captionsTheme.StyleId === "custom" ? (
                <>
                  {/* Colors */}
                  <Box
                    sx={{
                      border: "1px solid",
                      borderRadius: theme.radius.md,
                      borderColor: theme.colors.gray[8],
                    }}
                  >
                    <SettingsBox label="Text color" noBorder>
                      <ColorInput
                        // label="Text color"
                        value={captionsTheme.TextColor}
                        onChange={(e) =>
                          setCaptionsTheme({ ...captionsTheme, TextColor: e })
                        }
                        format="rgba"
                        swatches={swatches}
                      />
                    </SettingsBox>
                    <SettingsBox label="Text Background" noBorder>
                      <ColorInput
                        // label="Text background color"
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
                    </SettingsBox>
                    <SettingsBox label="Screen background" noBorder>
                      <ColorInput
                        // label="Screen background color"
                        value={captionsTheme.ScreenBackground}
                        onChange={(e) =>
                          setCaptionsTheme({
                            ...captionsTheme,
                            ScreenBackground: e,
                          })
                        }
                        format="rgba"
                        swatches={swatches}
                      />
                    </SettingsBox>
                  </Box>

                  <Box
                    sx={{
                      border: "1px solid",
                      borderRadius: theme.radius.md,
                      borderColor: theme.colors.gray[8],
                    }}
                  >
                    <SettingsBox label="Text weight" noBorder>
                      <Group>
                        <IconLetterT stroke={1} />
                        <Slider
                          style={{ flexGrow: 1 }}
                          defaultValue={captionsTheme.TextWeight}
                          min={100}
                          max={900}
                          step={10}
                          onChange={(e) =>
                            setCaptionsTheme({
                              ...captionsTheme,
                              TextWeight: e,
                            })
                          }
                          // marks={TEXTWEIGHT_MARKS}
                          precision={0}
                          sx={{ flexGrow: 1 }}
                        />
                        <IconLetterT stroke={5} />
                      </Group>
                    </SettingsBox>

                    <SettingsBox label="Text stroke" noBorder>
                      <Group>
                        <Box sx={{ position: "relative" }}>
                          <IconLetterT stroke={5} color="white" />
                          <IconLetterT
                            stroke={2}
                            color={theme.colors.gray[8]}
                            style={{ position: "absolute", top: 0, left: 0 }}
                          />
                        </Box>
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
                            setCaptionsTheme({
                              ...captionsTheme,
                              TextStroke: e,
                            })
                          }
                          // marks={TEXTWEIGHT_MARKS}
                          precision={0}
                          sx={{ flexGrow: 1 }}
                        />
                      </Group>
                    </SettingsBox>
                    <SettingsBox label="Line spacing" noBorder>
                      <Group>
                        <IconLineHeight />
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
                            setCaptionsTheme({
                              ...captionsTheme,
                              LineHeight: e,
                            })
                          }
                          // marks={TEXTWEIGHT_MARKS}
                          precision={2}
                          sx={{ flexGrow: 1 }}
                        />
                      </Group>
                    </SettingsBox>
                  </Box>

                  <SettingsBox label="Bionic reading">
                    <Switch
                      label={
                        captionsTheme.BionicReading ? "Enabled" : "Disabled"
                      }
                      checked={captionsTheme.BionicReading}
                      onChange={(e) =>
                        setCaptionsTheme({
                          ...captionsTheme,
                          BionicReading: e.currentTarget.checked,
                        })
                      }
                    />
                  </SettingsBox>
                  <SettingsBox label="Text alignment">
                    <SegmentedControl
                      data={[
                        {
                          label: (
                            <Center>
                              <IconAlignLeft />
                              <Box ml={10}>Left</Box>
                            </Center>
                          ),
                          value: "left",
                        },
                        {
                          label: (
                            <Center>
                              <IconAlignCenter />
                              <Box ml={10}>Center</Box>
                            </Center>
                          ),
                          value: "center",
                        },
                        {
                          label: (
                            <Center>
                              <IconAlignRight />
                              <Box ml={10}>Right</Box>
                            </Center>
                          ),
                          value: "right",
                        },
                      ]}
                      onChange={(e) =>
                        setCaptionsTheme({
                          ...captionsTheme,
                          TextAlign: e as TextAlignmentsType,
                        })
                      }
                      value={captionsTheme.TextAlign}
                    />
                  </SettingsBox>
                  <SettingsBox label="Text vertical alignment">
                    <SegmentedControl
                      data={[
                        // {
                        //   label: (
                        //     <Center>
                        //       <IconLayoutAlignTop />
                        //       <Box ml={10}>Top</Box>
                        //     </Center>
                        //   ),
                        //   value: "top",
                        // },
                        {
                          label: (
                            <Center>
                              <IconLayoutAlignMiddle />
                              <Box ml={10}>Center</Box>
                            </Center>
                          ),
                          value: "center",
                        },
                        {
                          label: (
                            <Center>
                              <IconLayoutAlignBottom />
                              <Box ml={10}>Bottom</Box>
                            </Center>
                          ),
                          value: "bottom",
                        },
                      ]}
                      onChange={(e) =>
                        setCaptionsTheme({
                          ...captionsTheme,
                          TextVerticalAlign: e as TextVerticalAlignmentsType,
                        })
                      }
                      value={captionsTheme.TextVerticalAlign}
                    />
                  </SettingsBox>
                </>
              ) : null}
            </Stack>
          </ScrollArea>

          {/* Button Menu */}
          <Group
            sx={{
              width: "100%",
              gridArea: "menu",
              borderTop: "1px solid",
              borderColor: theme.colors.gray[8],
              justifyContent: "flex-end",
            }}
            pt="md"
          >
            <Button
              onClick={() => setCaptionsTheme(DEFAULT)}
              leftIcon={<IconRefresh size={20} />}
              color="gray"
              disabled={
                JSON.stringify(DEFAULT) === JSON.stringify(captionsTheme)
              }
              compact={false}
              // sx={{ flexGrow: 1 }}
            >
              Reset theme
            </Button>
            <Button
              onClick={() => setOpened(false)}
              compact={false}
              leftIcon={<IconCheck size={20} />}
              // sx={{ flexGrow: 1 }}
            >
              Done
            </Button>
          </Group>

          {/* Preview */}
          <Preview style={{ gridArea: "preview" }} />
        </Box>
      </Drawer>
    </>
  );
};

export default Settings;
