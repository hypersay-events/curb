import React from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  DefaultMantineColor,
  // DefaultMantineColor,
  MantineProvider,
  MantineProviderProps,
  MantineTheme,
  MantineThemeOverride,
  Tuple,
  // Tuple,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { CustomFonts } from "./CustomFonts";
import deepMerge from "lodash/merge";

type ExtendedCustomColors = "purple" | "hsOrange" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

const COLORMODE_STORAGE_KEY = "hse-mantine-colormode";

export const HSMantineProvider: React.FC<
  MantineProviderProps & {
    forceColorScheme?: "light" | "dark";
  }
> = ({ children, forceColorScheme, theme: customTheme, ...props }) => {
  const userPreferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: COLORMODE_STORAGE_KEY,
    defaultValue: forceColorScheme || userPreferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(
      forceColorScheme || value || (colorScheme === "dark" ? "light" : "dark")
    );

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const hsTheme: MantineThemeOverride = {
    black: "#141414",
    white: "#ffffff",
    cursorType: "pointer",
    defaultRadius: "lg",
    colorScheme: colorScheme,
    primaryColor: "hsOrange",
    // primaryShade: { light: 5, dark: 7 },
    colors: {
      // Brand Colors over-writing default Mantine colors
      // Hypersay Family brand color
      purple: [
        "#f5f3fe",
        "#e0dcfb",
        "#cbc5f9",
        "#b6aef7",
        "#a197f4",
        "#8c80f2",
        "#7769f0",
        "#6252ed",
        "#4c3aeb",
        "#3823e8",
      ],
      // Hypersay Multilanguage brand color
      hsOrange: [
        "#fffaf3",
        // '#feefda',
        "#fde4c1",
        "#fdd9a8",
        // '#fcce8f',
        "#fbc377",
        "#fab85e",
        "#faad45",
        "#f9a22c",
        // '#f89713',
        "#ec8a07",
        "#d37c06",
        "#ba6d05",
      ],
    },
    loader: "dots",
    fontFamily: `"Inter var", system-ui, sans-serif`,
    headings: { fontFamily: `"Inter var2", system-ui, sans-serif` },
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={deepMerge({}, hsTheme, customTheme) as MantineThemeOverride}
        {...props}
      >
        <CustomFonts />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
