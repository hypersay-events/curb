import { useRouter } from "next/router";
import { CaptionerInput } from "../../../components/Captions/CaptionInput";
import { Monitor } from "../../../components/Monitor";

export default function Room() {
  const router = useRouter();

  return (
    <div>
      <p>
        Room <strong>{router.query.room}</strong>. Target language:{" "}
        <strong>{router.query.lang}</strong>
      </p>
      <div>
        <CaptionerInput roomName={router.query.room as string} />
      </div>

      <div>
        <Monitor />
      </div>
    </div>
  );
}
