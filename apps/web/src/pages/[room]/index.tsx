import { Box, Container, Group, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { CaptionerInput } from "../../components/Captions/CaptionInput";
import { Monitor, Status, Translation } from "../../components/Monitor";

export default function Room() {
  const router = useRouter();

  return (
    <Container style={{ width: "100%", height: "100%" }}>
      <Stack style={{ width: "100%", height: "100%" }}>
        <Group style={{ justifyContent: "space-between" }}>
          <Text size="xl" weight="bold">
            Room{" "}
            <Text component="span" color="red" size="xl" weight="bold">
              {router.query.room}
            </Text>
          </Text>

          <Status roomName={router.query.room as string} />
        </Group>

        <Box style={{ flexGrow: 1 }}>
          <Translation
            roomName={router.query.room as string}
            language={router.query.lang as string}
          />
        </Box>

        <CaptionerInput roomName={router.query.room as string} />
      </Stack>
    </Container>
  );
}
