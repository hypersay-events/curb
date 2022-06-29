import { Container, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { TranslationLines } from "../../../components/Monitor";

export default function Room() {
  const router = useRouter();
  return (
    <Container>
      <Paper>
        <TranslationLines
          roomName={router.query.room as string}
          language={router.query.lang as string}
        />
      </Paper>
    </Container>
  );
}
