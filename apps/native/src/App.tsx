import { ReactNode, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { Icon } from "@iconify/react";
import Welcome from "./components/Welcome";
import Captions from "./components/Captions";

type onSubmitEventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.FormEvent<HTMLFormElement>;

function App() {
  const onSetRoomIdAndLanguage = (roomId: string, targetLang: string) => {
    setCurrentPanel(
      <Captions
        roomId={roomId}
        targetLang={targetLang}
        onGoBack={() => setCurrentPanel(welcome)}
      />
    );
  };

  const welcome = <Welcome setRoomIdAndLanguage={onSetRoomIdAndLanguage} />;

  const [currentPanel, setCurrentPanel] = useState<ReactNode>(welcome);

  return currentPanel;
}

export default App;
