import type { NextPage } from "next";
import Head from "next/head";
import {
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Center,
  Image,
  AppShell,
  Header,
  Footer,
  Anchor,
  Text,
  ActionIcon,
  Modal,
  useMantineTheme,
  MediaQuery,
} from "@mantine/core";
import { TARGET_LANGS } from "../utils/languages";
import { useRouter } from "next/router";
import { languageAtom, roomAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import { IconSettings, IconArrowRight } from "@tabler/icons";
import Settings from "../components/Settings";

export const DARK_PURPLE = "#262237";

const Home: NextPage = () => {
  const router = useRouter();
  const [room, setRoom] = useAtom(roomAtom);
  const [lang, setLang] = useAtom(languageAtom);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const isValid = room && lang;
  return (
    <>
      <Head>
        <title>Hypersay Multilanguage Monitor App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        styles={{
          root: {
            backgroundColor: DARK_PURPLE,
          },
        }}
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
            <MediaQuery smallerThan={500} styles={{ display: "none" }}>
              <Text color="dimmed">
                created by{" "}
                <Anchor href="https://hypersay.events" target="hypersay_events">
                  Hypersay Events
                </Anchor>
              </Text>
            </MediaQuery>
          </Footer>
        }
      >
        <Center sx={{ height: "100%" }}>
          <Group align="end">
            {/* <Image
              src="/img/logo-hypersay-multilanguage-nobg.svg"
              alt="Hypersay Multilanguage Branding"
              height={150}
              width="auto"
              ml={-35}
            /> */}
            <TextInput
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room code..."
              size="lg"
              label="Room"
            />

            <Select
              label="Language"
              placeholder="Pick one"
              clearable
              data={TARGET_LANGS.map((l) => ({
                value: l.value,
                label: l.label,
              }))}
              value={lang}
              onChange={(l) => setLang(l)}
              size="lg"
              styles={(theme) => ({
                input: {
                  fontWeight: 600,
                  color: theme.colors.hsOrange[7],
                  backgroundColor: theme.fn.darken(DARK_PURPLE, 0.2),
                  "&::placeholder": {
                    opacity: 0.7,
                    color: theme.colors.gray[5],
                  },
                  "&:focus": {
                    borderColor: theme.colors.hsOrange[7],
                  },
                },
              })}
            />
            <Group>
              {/* <ActionIcon
                onClick={() => setOpened(true)}
                size={50}
                variant="light"
                // color="hsOrange"
              >
                <IconSettings size={40} />
              </ActionIcon> */}

              <Settings />
              <Button
                disabled={!isValid}
                onClick={() => {
                  router.push(`/${room}/${lang}`);
                }}
                color="hsOrange"
                sx={{
                  height: 50,

                  "&:disabled": {
                    backgroundColor: theme.colors.gray[6],
                  },
                }}
                size="xl"
                rightIcon={<IconArrowRight />}
              >
                Connect
              </Button>
            </Group>
          </Group>
        </Center>
      </AppShell>
    </>
  );
};

export default Home;
