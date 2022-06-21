import {
  ActionIcon,
  Anchor,
  AppShell,
  Box,
  Button,
  Center,
  Container,
  Footer,
  Group,
  Header,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import { useRouter } from "next/router";
import { CaptionerInput } from "../../components/Captions/CaptionInput";
import { Monitor, Status, TranslationLines } from "../../components/Monitor";

export default function Room() {
  const router = useRouter();

  return (
    <AppShell
      fixed
      header={
        <Header height={50} p={6}>
          <Group style={{ justifyContent: "space-between" }}>
            <Group>
              <ActionIcon
                onClick={() => {
                  router.back();
                }}
                size="sm"
                color="gray"
                variant="hover"
              >
                <IconArrowNarrowLeft />
              </ActionIcon>

              <Text size="xl" weight="bold">
                Room{" "}
                <Text component="span" color="red" size="xl" weight="bold">
                  {router.query.room}
                </Text>
              </Text>
            </Group>
            <Status roomName={router.query.room as string} />
          </Group>
        </Header>
      }
      footer={
        <Footer height={200} p="md">
          <Stack align="stretch">
            <CaptionerInput roomName={router.query.room as string} />
            <Text color="dimmed" size="sm" align="right">
              created by{" "}
              <Anchor
                href="https://hypersay.events"
                target="hypersay_events"
                color="gray"
              >
                Hypersay Events
              </Anchor>
            </Text>
          </Stack>
        </Footer>
      }
    >
      <Center style={{ width: "100%", height: "100%" }}>
        <Container style={{ width: "100%", height: "100%" }}>
          <TranslationLines
            roomName={router.query.room as string}
            language={router.query.lang as string}
          />
        </Container>
      </Center>
    </AppShell>
  );
}
