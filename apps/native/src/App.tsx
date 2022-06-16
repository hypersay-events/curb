import { useCallback, useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import { Captions } from "./components/Captions";
import { SocketProvider } from "./components/SocketProvider";
import { Box } from "@mantine/core";

interface RoomDef {
  roomId: string;
  targetLang: string;
}

function App() {
  const [location, setLocation] = useState<"welcome" | "room">("welcome");
  const [roomDef, setRoomDef] = useState<RoomDef | null>(null);
  const onSetRoomIdAndLanguage = useCallback(
    (roomId: string, targetLang: string) => {
      setRoomDef({
        roomId,
        targetLang,
      });
    },
    []
  );
  useEffect(() => {
    setLocation(roomDef ? "room" : "welcome");
  }, [roomDef]);

  const onGoBack = useCallback(() => {
    setRoomDef(null);
  }, []);

  return (
    <Box
      sx={(theme) => ({
        borderRadius: theme.radius.lg,
        overflow: "hidden",
      })}
      data-tauri-drag-region
    >
      {location === "welcome" ? (
        <Welcome setRoomIdAndLanguage={onSetRoomIdAndLanguage} />
      ) : location === "room" && roomDef ? (
        <SocketProvider roomId={roomDef.roomId} targetLang={roomDef.targetLang}>
          <Captions onGoBack={onGoBack} />
        </SocketProvider>
      ) : null}
    </Box>
  );
}

export default App;
