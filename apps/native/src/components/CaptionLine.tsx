import { Text } from "@mantine/core";
import { storedThemeAtom } from "../hooks/useCaptionsTheme";
import { textVide } from "text-vide";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import sanitizeHtml from "sanitize-html";

interface ICaptionLine {
  text: string;
}

const htmlUnescapes: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

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
  const [localtext, setLocalText] = useState("");

  useEffect(() => {
    if (captionsTheme.BionicReading) {
      const unescaped = text.replace(
        /&(?:amp|lt|gt|quot|#39);/g,
        (e) => htmlUnescapes[e] || ""
      );

      const sanitized = sanitizeHtml(unescaped, {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: [],
      });
      const videtext = unescaped.replace(/[\w\s,?!]+/g, (fragement) =>
        textVide(
          fragement,
          // @ts-ignore
          [
            `<span style={{ fontWeight: ${captionsTheme.TextWeight * 1.2}}}>`,
            "</span>",
          ]
        )
      );
      setLocalText(videtext);
    } else {
      setLocalText(
        sanitizeHtml(text, {
          allowedTags: ["b", "i", "em", "strong"],
          allowedAttributes: {},
          allowedIframeHostnames: [],
        })
      );
    }
  }, [captionsTheme.BionicReading, captionsTheme.TextWeight, text]);

  return (
    <Text
      // component="span"
      dangerouslySetInnerHTML={{ __html: localtext }}
      style={{
        display: "inline",
        fontSize: `clamp(18px, ${captionsTheme.FontSize}vw, 200px)`,
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
        zIndex: 1,
      }}
      data-tauri-drag-region
    />
  );
};

export default CaptionLine;
