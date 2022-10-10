import { Box, BoxProps, useMantineTheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { storedThemeAtom } from "../atoms/theme";
import { englishFirstLiners } from "../utils/languages";
import CaptionLine from "./CaptionLine";

export const Preview: React.FC<BoxProps> = ({ style, ...props }) => {
  const theme = useMantineTheme();

  const captionsTheme = useAtomValue(storedThemeAtom);

  const [previewLine] = useState(
    englishFirstLiners[Math.floor(Math.random() * englishFirstLiners.length)]
  );

  return (
    <Box style={style}>
      <Box
        style={{
          // ...theme.fn.cover(),
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          textAlign: captionsTheme.TextAlign,
          borderRadius: theme.radius.lg,
          backgroundColor:
            captionsTheme.ScreenBackground || captionsTheme.TextBackground,
          justifyContent:
            captionsTheme.TextVerticalAlign === "bottom"
              ? "flex-end"
              : "center",
        }}
        p="xl"
        {...props}
      >
        <CaptionLine text={previewLine} />
      </Box>
    </Box>
  );
};
