import { Text } from "@mantine/core";
import { DEFAULT_FONT_SIZE } from "./Captions";

interface ICaptionLine {
  text: string;
  fontSize?: string | number;
}

export const CaptionLine: React.FC<ICaptionLine> = ({
  fontSize = DEFAULT_FONT_SIZE,
  text,
}) => {
  return (
    <Text
      component="span"
      sx={(theme) => ({
        display: "inline",
        fontSize: `${fontSize}vw`,
        fontWeight: 700,
        lineHeight: "1.20em",
        backgroundColor: theme.colors.gray[9],
        boxShadow: `0.2em 0 0 ${theme.colors.gray[9]},-0.2em 0 0 ${theme.colors.gray[9]}`,
        color: "white",
        transition: "color 0.5s ease",
      })}
      data-tauri-drag-region
    >
      {text}
    </Text>
  );
};

export default CaptionLine;
