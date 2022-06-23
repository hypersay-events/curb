import { Button, Group, Select } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { sdk } from "../business/client";

export const SubtitleDownloader: React.FC<{ roomName: string }> = ({
  roomName,
}) => {
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  useEffect(() => {
    sdk
      .listAvailableTranslations({ roomName })
      .then((ls) => setAvailableLanguages(ls));
  }, [roomName]);

  const downloadSubtitles = useCallback(
    async (format: string) => {
      const res = await sdk.downloadSubtitles({
        format,
        language: selectedLang || "",
        roomName,
      });
      var content = res.content;
      var filename = `${roomName}${
        selectedLang !== "original" ? `.${selectedLang}` : ""
      }.${format}`;

      var blob = new Blob([content], {
        type: res.mimeType,
      });
      const link = document.createElement("a");
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", filename);
      link.click();
    },
    [roomName, selectedLang]
  );
  return (
    <Group>
      <Select
        value={selectedLang}
        onChange={(l) => setSelectedLang(l)}
        placeholder="Download subtitles"
        data={[
          { value: "original", label: "original" },
          ...availableLanguages.map((l) => ({ value: l, label: l })),
        ]}
      ></Select>
      {selectedLang ? (
        <>
          <Button onClick={() => downloadSubtitles("srt")}>SRT</Button>
          <Button onClick={() => downloadSubtitles("vtt")}>WebVTT</Button>
        </>
      ) : null}
    </Group>
  );
};
