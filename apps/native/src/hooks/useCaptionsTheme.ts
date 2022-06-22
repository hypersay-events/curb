import { MantineColor } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export type CaptionsTheme = {
  FontSize: number;
  TextColor: MantineColor;
  TextBackground: MantineColor;
  TextShadow: string;
  TextStroke: string;
  TextWeight: "thin" | "normal" | "bold" | "bolder" | "black";
  LineHeight: 1 | 1.5 | 2;
  WindowBackground: MantineColor;
  BionicReading: boolean;
  Mode: "cc" | "transcript";
};

export const DEFAULT: CaptionsTheme = {
  FontSize: 3,
  TextColor: "rgba(255, 255, 255, 1)",
  TextBackground: "rgba(0, 0, 0, 1)",
  TextShadow: "",
  TextStroke: "",
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

  const OVERRIDE: Partial<CaptionsTheme> = {
    FontSize: fontSize,
    TextColor: textColor,
    TextBackground: textBackground,
    TextStroke: textStroke,
    TextShadow: textShadow,
    TextWeight: textWeight,
    LineHeight: lineHeight,
    WindowBackground: windowBackground,
    BionicReading: bionicReading,
    Mode: mode,
  };

  const captionsTheme = { ...DEFAULT, ...OVERRIDE };

  return {
    captionsTheme,
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
