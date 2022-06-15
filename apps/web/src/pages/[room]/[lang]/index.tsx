import { useRouter } from "next/router";
import { Monitor } from "../../../components/Monitor";

export default function Room() {
  const router = useRouter();
  return (
    <div>
      <Monitor
        roomName={router.query.room as string}
        language={router.query.lang as string}
      />
    </div>
  );
}
