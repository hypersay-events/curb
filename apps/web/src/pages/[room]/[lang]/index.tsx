import { useRouter } from "next/router";
import { CaptionerInput } from "../../../components/Captions/CaptionInput";
import { Monitor } from "../../../components/Monitor";

export default function Room() {
  const router = useRouter();

  return (
    <div>
      <Monitor />
    </div>
  );
}
