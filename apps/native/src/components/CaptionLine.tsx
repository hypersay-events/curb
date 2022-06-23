import { Text } from "@mantine/core";
import { useCaptionsTheme } from "../hooks/useCaptionsTheme";

interface ICaptionLine {
  text: string;
}

export const CaptionLine: React.FC<ICaptionLine> = ({ text }) => {
  const { captionsTheme } = useCaptionsTheme();

  return (
    <Text
      component="span"
      style={{
        display: "inline",
        fontSize: `${captionsTheme.FontSize}vw`,
        fontWeight: 700,
        textShadow: `
        0.05em 0 0.05em ${captionsTheme.TextShadow},
        0 0.05em 0.05em ${captionsTheme.TextShadow},
        -0.05em 0 0.05em ${captionsTheme.TextShadow},
        0 -0.05em 0.05em ${captionsTheme.TextShadow},
        -0.05em -0.05em 0.05em ${captionsTheme.TextShadow},
        -0.05em 0.05em 0.05em ${captionsTheme.TextShadow},
        0.05em -0.05em 0.05em ${captionsTheme.TextShadow},
        0.05em 0.05em 0.05em ${captionsTheme.TextShadow}`,
        lineHeight: "1.20em",
        backgroundColor: captionsTheme.TextBackground,
        boxShadow: `0.2em 0 0 ${captionsTheme.TextBackground},-0.2em 0 0 ${captionsTheme.TextBackground}`,
        color: captionsTheme.TextColor,
        transition: "color 0.5s ease",
      }}
      data-tauri-drag-region
    >
      {text}
    </Text>
  );
};

export default CaptionLine;
