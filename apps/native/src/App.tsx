import { useCallback, useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import { Captions } from "./components/Captions";
import { SocketProvider } from "./components/SocketProvider";

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
    <>
      {location === "welcome" ? (
        <Welcome setRoomIdAndLanguage={onSetRoomIdAndLanguage} />
      ) : location === "room" && roomDef ? (
        <SocketProvider roomId={roomDef.roomId} targetLang={roomDef.targetLang}>
          <Captions onGoBack={onGoBack} />
        </SocketProvider>
      ) : null}
    </>
  );
}

export default App;
