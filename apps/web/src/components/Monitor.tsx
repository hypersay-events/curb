import { Badge, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useMonitor } from "../hooks/useMonitor";
import { useTemporaryState } from "../hooks/useTemporaryState";

interface MonitorProps {
  roomName: string;
  language?: string;
}

export const Monitor: React.FC<MonitorProps> = ({
  roomName,
  language = "original",
}) => {
  const { isConnected, translation } = useMonitor(roomName, language);

  return (
    <Badge>
      <p>{isConnected ? "connected" : "disconnected"}</p>
      <p>{translation}</p>
    </Badge>
  );
};

export const Status: React.FC<MonitorProps> = ({
  roomName,
  language = "original",
}) => {
  const { isConnected } = useMonitor(roomName, language);

  return (
    <Badge color={isConnected ? "gray" : "red"}>
      {isConnected ? "connected" : "disconnected"}
    </Badge>
  );
};

export const Translation: React.FC<MonitorProps> = ({
  roomName,
  language = "original",
}) => {
  const { translation } = useMonitor(roomName, language);

  return (
    <Text
      component="span"
      sx={(theme) => ({
        display: "inline",
        fontSize: theme.fontSizes.xl,
        fontWeight: "bold",
        lineHeight: "110%",
        backgroundColor: theme.colors.gray[9],
        boxShadow: `0.2em 0 0 ${theme.colors.gray[9]},-0.2em 0 0 ${theme.colors.gray[9]}`,
        // borderRadius: theme.radius.md,
      })}
      data-tauri-drag-region
    >
      {translation || "..."}
    </Text>
  );
};
