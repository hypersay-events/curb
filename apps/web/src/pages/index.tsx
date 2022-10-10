import {
  Button,
  Group,
  Stack,
  TextInput,
  Text,
  Anchor,
  AppShell,
  Center,
  Footer,
  Header,
  Image,
} from "@mantine/core";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export const DARK_PURPLE = "#262237";

type onSubmitEventType =
  | React.MouseEvent<HTMLButtonElement>
  | React.FormEvent<HTMLFormElement>;

export default function IndexPage() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    (event: onSubmitEventType) => {
      event.preventDefault();
      router.push(`/${roomName}`);
    },
    [roomName, router]
  );

  return (
    <AppShell
      styles={{
        root: {
          backgroundColor: DARK_PURPLE,
        },
      }}
      fixed
      // header={
      //   <Header height={70} p="sm">
      //     <Image
      //       src="/img/logo-hypersay-multilanguage-negative.svg"
      //       alt="Hypersay Multilanguage Branding"
      //       height={50}
      //       width="auto"
      //     />
      //   </Header>
      // }
      footer={
        <Footer
          height={70}
          p="md"
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: DARK_PURPLE,
          }}
        >
          <Image
            src="/img/logo-hypersay-multilanguage-negative.svg"
            alt="Hypersay Multilanguage Branding"
            height={40}
            width="auto"
          />
          <Text color="dimmed">
            created by{" "}
            <Anchor
              href="https://hypersay.events"
              target="hypersay_events"
              color="gray"
            >
              Hypersay Events
            </Anchor>
          </Text>
        </Footer>
      }
    >
      <Center style={{ width: "100%", height: "100%" }}>
        <Stack align="flex-start">
          <Image
            src="/img/logo-hypersay-multilanguage-nobg.svg"
            alt="Hypersay Multilanguage Branding"
            height={150}
            width="auto"
            ml={-35}
          />
          <Text size="xl" weight="bold" color="hsOrange">
            Hello, captioner
          </Text>
          <form onSubmit={handleSubmit}>
            <Group align="flex-end" spacing={5}>
              <TextInput
                styles={(theme) => ({
                  input: {
                    backgroundColor: theme.colors.hsOrange[7],
                    fontWeight: 800,
                    color: theme.white,
                    "&::placeholder": {
                      opacity: 0.7,
                      color: theme.white,
                    },
                  },
                  label: {
                    fontWeight: 800,
                  },
                })}
                placeholder="enter room name..."
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                size="md"
              />
              <Button
                disabled={roomName.length < 2}
                onClick={handleSubmit}
                rightIcon={<IconArrowNarrowRight />}
                size="md"
                type="submit"
                color="hsOrange"
              >
                Go
              </Button>
            </Group>
          </form>
        </Stack>
      </Center>
    </AppShell>
  );
}
