import { MantineColor } from "@mantine/core";
import { atomWithStorage } from "jotai/utils";

export type CaptionStylePresets =
  | "whiteBlack"
  | "yellowBlack"
  | "blackYellow"
  | "noBackground"
  | "whiteBlue"
  | "yellowBlue"
  | "bionic"
  | "chroma"
  | "custom";

export type TextAlignmentsType = "left" | "center" | "right";

export type CaptionStyle = {
  StyleId: CaptionStylePresets;
  StyleLabel: string;
  TextColor: MantineColor;
  TextBackground: MantineColor;
  TextAlign: TextAlignmentsType;
  ScreenBackground: MantineColor | undefined;
  TextStroke: number;
  TextWeight: number;
  LineHeight: number;
  BionicReading: boolean;
};

export type CaptionsTheme = CaptionStyle & {
  FontSize: number;
  WindowOpacity: number;
  Mode: "cc" | "transcript";
};

export const CAPTION_STYLES: CaptionStyle[] = [
  {
    StyleId: "whiteBlack",
    StyleLabel: "White / Black",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    ScreenBackground: undefined,
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
  {
    StyleId: "yellowBlack",
    StyleLabel: "Yellow / Black",
    TextColor: "rgba(255, 225, 0, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    ScreenBackground: undefined,
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
  {
    StyleId: "blackYellow",
    StyleLabel: "Black / Yellow",
    TextColor: "rgba(0, 0, 0, 1)",
    TextBackground: "rgba(255, 225, 0, 1)",
    ScreenBackground: undefined,
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
  {
    StyleId: "whiteBlue",
    StyleLabel: "White / Blue",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(56, 65, 224, 1)",
    ScreenBackground: undefined,
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
  {
    StyleId: "yellowBlue",
    StyleLabel: "Yellow / Blue",
    TextColor: "rgba(255, 225, 0, 1)",
    TextBackground: "rgba(56, 65, 224, 1)",
    ScreenBackground: undefined,
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
  {
    StyleId: "noBackground",
    StyleLabel: "No Background",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "transparent",
    ScreenBackground: undefined,
    TextAlign: "left",
    TextStroke: 3,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
  {
    StyleId: "chroma",
    StyleLabel: "Chroma",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    ScreenBackground: "rgba(0, 255, 0, 1)",
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
  {
    StyleId: "bionic",
    StyleLabel: "Bionic (exp)",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    ScreenBackground: undefined,
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 400,
    LineHeight: 1,
    BionicReading: true,
  },
  {
    StyleId: "custom",
    StyleLabel: "Custom",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    ScreenBackground: "rgba(0, 0, 0, 1)",
    TextAlign: "left",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
    BionicReading: false,
  },
];

export const DEFAULT: CaptionsTheme = {
  // ...CAPTION_STYLES.find((i) => i.StyleId === "whiteBlack"),
  StyleId: "whiteBlack",
  StyleLabel: "White / Black",
  TextColor: "rgba(255, 255, 255, 1)",
  TextBackground: "rgba(0, 0, 0, 1)",
  ScreenBackground: undefined,
  TextAlign: "left",
  TextStroke: 0,
  TextWeight: 700,
  LineHeight: 1,
  FontSize: 3,
  WindowOpacity: 0,
  BionicReading: false,
  Mode: "cc",
};

export const storedThemeAtom = atomWithStorage<CaptionsTheme>(
  "captionsTheme",
  DEFAULT
);
