import { MantineColor } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export type CaptionStylePresets =
  | "whiteBlack"
  | "yellowBlack"
  | "blackYellow"
  | "noBackground"
  | "whiteBlue"
  | "yellowBlue"
  | "custom";

export type CaptionStyle = {
  StyleId: CaptionStylePresets;
  StyleLabel: string;
  TextColor: MantineColor;
  TextBackground: MantineColor;
  TextStroke: number;
  TextWeight: number;
  LineHeight: number;
};

export type CaptionsTheme = CaptionStyle & {
  FontSize: number;
  WindowOpacity: number;
  BionicReading: boolean;
  Mode: "cc" | "transcript";
};

export const CAPTION_STYLES: CaptionStyle[] = [
  {
    StyleId: "whiteBlack",
    StyleLabel: "White / Black",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
  },
  {
    StyleId: "yellowBlack",
    StyleLabel: "Yellow / Black",
    TextColor: "rgba(255, 225, 0, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
  },
  {
    StyleId: "blackYellow",
    StyleLabel: "Black / Yellow",
    TextColor: "rgba(0, 0, 0, 1)",
    TextBackground: "rgba(255, 225, 0, 1)",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
  },
  {
    StyleId: "whiteBlue",
    StyleLabel: "White / Blue",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(56, 65, 224, 1)",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
  },
  {
    StyleId: "yellowBlue",
    StyleLabel: "Yellow / Blue",
    TextColor: "rgba(255, 225, 0, 1)",
    TextBackground: "rgba(56, 65, 224, 1)",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
  },
  {
    StyleId: "noBackground",
    StyleLabel: "No Background",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "transparent",
    TextStroke: 3,
    TextWeight: 700,
    LineHeight: 1,
  },
  {
    StyleId: "custom",
    StyleLabel: "Custom",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    TextStroke: 0,
    TextWeight: 700,
    LineHeight: 1,
  },
];

export const DEFAULT: CaptionsTheme = {
  // ...CAPTION_STYLES.find((i) => i.StyleId === "whiteBlack"),
  StyleId: "whiteBlack",
  StyleLabel: "White / Black",
  TextColor: "rgba(255, 255, 255, 1)",
  TextBackground: "rgba(0, 0, 0, 1)",
  TextStroke: 0,
  TextWeight: 700,
  LineHeight: 1,
  FontSize: 3,
  WindowOpacity: 0,
  BionicReading: false,
  Mode: "cc",
};

export const useCaptionsTheme = () => {
  const [fontSize, setFontSize] = useLocalStorage({
    key: "font-size",
    defaultValue: DEFAULT.FontSize,
  });

  const [styleId, setStyleId] = useLocalStorage({
    key: "style-id",
    defaultValue: DEFAULT.StyleId,
  });

  const [styleLabel, setStyleLabel] = useLocalStorage({
    key: "style-label",
    defaultValue: DEFAULT.StyleLabel,
  });

  const [textColor, setTextColor] = useLocalStorage({
    key: "text-color",
    defaultValue: DEFAULT.TextColor,
  });

  const [textBackground, setTextBackground] = useLocalStorage({
    key: "text-background",
    defaultValue: DEFAULT.TextBackground,
  });

  const [textStroke, setTextStroke] = useLocalStorage({
    key: "text-stroke",
    defaultValue: DEFAULT.TextStroke,
  });

  const [textWeight, setTextWeight] = useLocalStorage({
    key: "text-weight",
    defaultValue: DEFAULT.TextWeight,
  });

  const [lineHeight, setLineHeight] = useLocalStorage({
    key: "line-height",
    defaultValue: DEFAULT.LineHeight,
  });

  const [windowOpacity, setWindowOpacity] = useLocalStorage({
    key: "window-opacity",
    defaultValue: DEFAULT.WindowOpacity,
  });

  const [bionicReading, setBionicReading] = useLocalStorage({
    key: "bionic-reading",
    defaultValue: DEFAULT.BionicReading,
  });

  const [mode, setMode] = useLocalStorage({
    key: "mode",
    defaultValue: DEFAULT.Mode,
  });

  const setCaptionStyle = (newStyle: Partial<CaptionStyle>) => {
    console.log("apply style", { newStyle });
    if (newStyle.StyleId) setStyleId(newStyle.StyleId);
    if (newStyle.StyleLabel) setStyleLabel(newStyle.StyleLabel);
    if (newStyle.TextColor) setTextColor(newStyle.TextColor);
    if (newStyle.TextBackground) setTextBackground(newStyle.TextBackground);
    if (newStyle.TextStroke !== undefined) setTextStroke(newStyle.TextStroke);
    if (newStyle.TextWeight !== undefined) setTextWeight(newStyle.TextWeight);
    if (newStyle.LineHeight !== undefined) setLineHeight(newStyle.LineHeight);
  };

  const OVERRIDE: Partial<CaptionsTheme> = {
    StyleId: styleId,
    StyleLabel: styleLabel,
    TextColor: textColor,
    TextBackground: textBackground,
    TextStroke: textStroke,
    FontSize: fontSize,
    TextWeight: textWeight,
    LineHeight: lineHeight,
    WindowOpacity: windowOpacity,
    BionicReading: bionicReading,
    Mode: mode,
  };

  const captionsTheme = { ...DEFAULT, ...OVERRIDE };

  return {
    captionsTheme,
    setCaptionStyle,
    setStyleId,
    setStyleLabel,
    setFontSize,
    setTextColor,
    setTextBackground,
    setTextStroke,
    setTextWeight,
    setLineHeight,
    setWindowOpacity,
    setBionicReading,
    setMode,
  };
};
