import {
  Box,
  Button,
  Group,
  Input,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { sdk } from "../business/client";

export const SubtitleDownloader: React.FC<{ roomName: string }> = ({
  roomName,
}) => {
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [startingFrom, setStartingFrom] = useState("");

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
        startingFrom: startingFrom ? new Date(startingFrom).getTime() : 0,
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
    [roomName, startingFrom]
  );
  return (
    <Stack>
      <Input.Wrapper label="Optional start time">
        <TextInput
          value={startingFrom}
          onChange={(e) => setStartingFrom(e.target.value)}
          placeholder="2022-10-24T11:00:00.000Z"
        />
      </Input.Wrapper>
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
                  color="hsOrange"
                >
                  Download SRT
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => downloadSubtitles("vtt", lang.value)}
                  size="xs"
                  color="hsOrange"
                >
                  Download WebVTT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};
