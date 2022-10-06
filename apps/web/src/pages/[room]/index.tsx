import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  Image,
} from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { DARK_PURPLE } from "../index";
import { CaptionerInput } from "../../components/Captions/CaptionInput";
import { Status, TranslationLines } from "../../components/Monitor";
import { SubtitleDownloader } from "../../components/SubtitleDownloader";

export default function Room() {
  const router = useRouter();
  const roomName = router.query.room as string;
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Box
        style={{
          display: "grid",
          height: "100vh",
          width: "100vw",
          gridTemplateRows: "auto 1fr auto",
          backgroundColor: DARK_PURPLE,
        }}
      >
        {/* Header */}
        <Group
          p="sm"
          sx={(theme) => ({
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.colors.gray[8]}`,
          })}
        >
          <Group>
            <Image
              src="/img/logo-hypersay-multilanguage-nobg.svg"
              alt="Hypersay Multilanguage Branding"
              height={50}
              width="auto"
            />
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
              <Text component="span" color="hsOrange" size="xl" weight="bold">
                {roomName}
              </Text>
            </Text>
            <Status roomName={roomName} />
          </Group>
          <Button onClick={() => setOpened(true)} color="hsOrange">
            Export captions
          </Button>
        </Group>
        <ScrollArea>
          <Container
            style={{
              width: "100%",
            }}
            p="md"
          >
            <TranslationLines roomName={roomName} />
          </Container>
        </ScrollArea>
        {/* Captioner area */}
        <Stack
          align="stretch"
          p="md"
          sx={(theme) => ({ borderTop: `1px solid ${theme.colors.gray[8]}` })}
        >
          <CaptionerInput roomName={roomName} />

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
      </Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Export captions"
      >
        <SubtitleDownloader roomName={roomName} />
      </Modal>
    </>
  );
}
