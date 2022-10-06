import { useRouter } from "next/router";
import { Captions } from "../../../components/Captions";
import { SocketProvider } from "../../../components/SocketProvider";

const RoomPage: React.FC = () => {
  const router = useRouter();
  return (
    <SocketProvider
      roomId={router.query.room as string}
      targetLang={router.query.lang as string}
    >
      <Captions onGoBack={() => router.push("/")} />
    </SocketProvider>
  );
};

export default RoomPage;
