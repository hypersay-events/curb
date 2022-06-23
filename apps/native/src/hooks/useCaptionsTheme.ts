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
  TextShadow: string;
  TextStroke: string;
};

export type CaptionsTheme = CaptionStyle & {
  FontSize: number;
  TextWeight: "thin" | "normal" | "bold" | "bolder" | "black";
  LineHeight: 1 | 1.5 | 2;
  WindowBackground: MantineColor;
  BionicReading: boolean;
  Mode: "cc" | "transcript";
};

export const CAPTION_STYLES: CaptionStyle[] = [
  {
    StyleId: "whiteBlack",
    StyleLabel: "White / Black",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    TextShadow: "transparent",
    TextStroke: "",
  },
  {
    StyleId: "yellowBlack",
    StyleLabel: "Yellow / Black",
    TextColor: "rgba(255, 225, 0, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    TextShadow: "transparent",
    TextStroke: "",
  },
  {
    StyleId: "blackYellow",
    StyleLabel: "Black / Yellow",
    TextColor: "rgba(0, 0, 0, 1)",
    TextBackground: "rgba(255, 225, 0, 1)",
    TextShadow: "transparent",
    TextStroke: "",
  },
  {
    StyleId: "whiteBlue",
    StyleLabel: "White / Blue",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(56, 65, 224, 1)",
    TextShadow: "transparent",
    TextStroke: "",
  },
  {
    StyleId: "yellowBlue",
    StyleLabel: "Yellow / Blue",
    TextColor: "rgba(255, 225, 0, 1)",
    TextBackground: "rgba(56, 65, 224, 1)",
    TextShadow: "transparent",
    TextStroke: "",
  },
  {
    StyleId: "noBackground",
    StyleLabel: "No Background",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "transparent",
    TextShadow: "rgba(0,0,0,.5)",
    TextStroke: "",
  },
  {
    StyleId: "custom",
    StyleLabel: "Custom",
    TextColor: "rgba(255, 255, 255, 1)",
    TextBackground: "rgba(0, 0, 0, 1)",
    TextShadow: "transparent",
    TextStroke: "",
  },
];

export const DEFAULT: CaptionsTheme = {
  StyleId: "whiteBlack",
  StyleLabel: "White / Black",
  TextColor: "rgba(255, 255, 255, 1)",
  TextBackground: "rgba(0, 0, 0, 1)",
  TextShadow: "",
  TextStroke: "",
  FontSize: 3,
  TextWeight: "bold",
  LineHeight: 1,
  WindowBackground: "transparent",
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

  const [textShadow, setTextShadow] = useLocalStorage({
    key: "text-shadow",
    defaultValue: DEFAULT.TextBackground,
  });

  const [textStroke, setTextStroke] = useLocalStorage({
    key: "text-stroke",
    defaultValue: DEFAULT.TextBackground,
  });

  const [textWeight, setTextWeight] = useLocalStorage({
    key: "text-weight",
    defaultValue: DEFAULT.TextWeight,
  });

  const [lineHeight, setLineHeight] = useLocalStorage({
    key: "line-height",
    defaultValue: DEFAULT.LineHeight,
  });

  const [windowBackground, setWindowBackground] = useLocalStorage({
    key: "window-background",
    defaultValue: DEFAULT.WindowBackground,
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
    console.log({ newStyle });
    if (newStyle.StyleId) setStyleId(newStyle.StyleId);
    if (newStyle.StyleLabel) setStyleLabel(newStyle.StyleLabel);
    if (newStyle.TextColor) setTextColor(newStyle.TextColor);
    if (newStyle.TextBackground) setTextBackground(newStyle.TextBackground);
    if (newStyle.TextShadow) setTextShadow(newStyle.TextShadow);
    if (newStyle.TextStroke) setTextStroke(newStyle.TextStroke);
  };

  const OVERRIDE: Partial<CaptionsTheme> = {
    StyleId: styleId,
    StyleLabel: styleLabel,
    TextColor: textColor,
    TextBackground: textBackground,
    TextStroke: textStroke,
    TextShadow: textShadow,
    FontSize: fontSize,
    TextWeight: textWeight,
    LineHeight: lineHeight,
    WindowBackground: windowBackground,
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
    setTextShadow,
    setTextStroke,
    setTextWeight,
    setLineHeight,
    setWindowBackground,
    setBionicReading,
    setMode,
  };
};
