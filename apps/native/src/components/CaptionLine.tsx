import { Text } from "@mantine/core";
// import { useCaptionsTheme } from "../hooks/useCaptionsTheme";
import { textVide } from "text-vide";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { CaptionsTheme, storedThemeAtom } from "../hooks/useCaptionsTheme";

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
  const [captionsTheme] = useAtom(storedThemeAtom);
  // const { captionsTheme } = useCaptionsTheme();
  const [localtext, setLocalText] = useState(text);

  // console.log({ captionsTheme });

  useEffect(() => {
    if ((captionsTheme as CaptionsTheme)?.BionicReading) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const videtext = textVide(text, [
        `<span style={{ fontWeight: ${
          (captionsTheme as CaptionsTheme)?.TextWeight || 1 * 1.2
        }}}>`,
        "</span>",
      ]);
      setLocalText(videtext);
    } else {
      setLocalText(text);
    }
  }, [captionsTheme, captionsTheme.TextWeight, text]);

  return (
    <Text
      // component="span"
      dangerouslySetInnerHTML={{ __html: localtext }}
      style={{
        display: "inline",
        fontSize: `clamp(18px, ${captionsTheme?.FontSize}vw, 200px)`,
        fontWeight: captionsTheme?.TextWeight,
        textShadow:
          captionsTheme?.TextStroke || 0 > 0
            ? getShadow(captionsTheme?.TextStroke as number)
            : "",
        lineHeight: `${captionsTheme?.LineHeight || 1 * 1.2}em`,
        backgroundColor: captionsTheme?.TextBackground,
        boxShadow: `0.2em 0 0 ${captionsTheme?.TextBackground},-0.2em 0 0 ${captionsTheme?.TextBackground}`,
        color: captionsTheme?.TextColor,
        transition: "color 0.5s ease",
        zIndex: 1,
      }}
      data-tauri-drag-region
    />
  );
};

export default CaptionLine;
