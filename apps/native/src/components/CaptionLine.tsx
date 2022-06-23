import { Text } from "@mantine/core";
import { useCaptionsTheme } from "../hooks/useCaptionsTheme";

interface ICaptionLine {
  text: string;
}

const getShadow = (size: number) => {
  const color = "rgba(0,0,0,1)"; /* black outline */
  const r = size; /* width of outline in pixels */
  const n = Math.ceil(2 * Math.PI * r); /* number of shadows */
  let shadows = "";

  for (
    let i = 0;
    i < n;
    i++ /* append shadows in n evenly distributed directions */
  ) {
    const theta = (2 * Math.PI * i) / n;
    shadows +=
      r * Math.cos(theta) +
      "px " +
      r * Math.sin(theta) +
      "px 0 " +
      color +
      (i == n - 1 ? "" : ",");
  }

  return shadows;
};

export const CaptionLine: React.FC<ICaptionLine> = ({ text }) => {
  const { captionsTheme } = useCaptionsTheme();

  // TODO: try SVG text

  return (
    <Text
      component="span"
      style={{
        display: "inline",
        fontSize: `${captionsTheme.FontSize}vw`,
        fontWeight: captionsTheme.TextWeight,
        textShadow:
          captionsTheme.TextStroke > 0
            ? getShadow(captionsTheme.TextStroke)
            : "",
        lineHeight: `${captionsTheme.LineHeight * 1.2}em`,
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
