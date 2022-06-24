import { Box, Button, Group, Table, Text } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
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
    async (format: string, language: string) => {
      const res = await sdk.downloadSubtitles({
        format,
        language,
        roomName,
      });
      var content = res.content;
      var filename = `${roomName}${
        language !== "original" ? `.${language}` : ""
      }.${format}`;

      var blob = new Blob([content], {
        type: res.mimeType,
      });
      const link = document.createElement("a");
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", filename);
      link.click();
    },
    [roomName]
  );
  return (
    <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="sm">
      <thead>
        <tr>
          <th>Language</th>
          <th>SRT</th>
          <th>WebVTT</th>
        </tr>
      </thead>
      <tbody>
        {[
          { value: "original", label: "original" },
          ...availableLanguages.map((l) => ({ value: l, label: l })),
        ].map((lang) => (
          <tr key={lang.label}>
            <td>
              <Text weight={800}>{lang.label}</Text>
            </td>
            <td>
              <Button
                onClick={() => downloadSubtitles("srt", lang.value)}
                size="xs"
              >
                Download SRT
              </Button>
            </td>
            <td>
              <Button
                onClick={() => downloadSubtitles("vtt", lang.value)}
                size="xs"
              >
                Download WebVTT
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
