import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function IndexPage() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push(`/${roomName}`);
  }, [roomName, router]);

  return (
    <div>
      <p>Select a room to enter the captioner interface</p>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      <button disabled={roomName.length < 2} onClick={onClick}>
        Go
      </button>
    </div>
  );
}
