import type { NextPage } from "next";
import Head from "next/head";
import {
  TextInput,
  Select,
  Button,
  Group,
  Center,
  Image,
  AppShell,
  Footer,
  Anchor,
  Text,
  useMantineTheme,
  MediaQuery,
  Title,
  Stack,
  Box,
} from "@mantine/core";
import { TARGET_LANGS } from "../../utils/languages";
import { useRouter } from "next/router";
import { languageAtom, roomAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons";
import Settings from "../../components/Settings";
import Layout from "../../components/Layout";

export const DARK_PURPLE = "#262237";

const Home: NextPage = () => {
  const router = useRouter();
  const [room, setRoom] = useAtom(roomAtom);
  const [lang, setLang] = useAtom(languageAtom);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    if (room !== router.query.room) setRoom(router.query.room as string);
  }, [room, router.query.room, setRoom]);

  const isValid = room;
  return (
    <Layout>
      <Stack
        p="md"
        sx={{
          border: "1px solid",
          borderRadius: theme.radius.md,
          borderColor: theme.colors.gray[6],
        }}
      >
        <Stack spacing={0}>
          <Text color="dimmed">Room</Text>
          <Title color="hsOrange">{room}</Title>
        </Stack>
        {TARGET_LANGS.map((lang) => (
          <Button
            key={lang.value}
            onClick={() => {
              setLang(lang.value);
              router.push(`/${room}/${lang.value}`);
            }}
            compact={false}
            leftIcon={<Text size="xl">{lang.flag}</Text>}
            rightIcon={<IconArrowRight />}
            size="lg"
          >
            {lang.label}
          </Button>
        ))}
      </Stack>
      {/* () => {
              router.push(`/${room}/${lang}`);
            } */}
    </Layout>
  );
};

export default Home;
