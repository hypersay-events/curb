import type { NextPage } from "next";
import {
  TextInput,
  Select,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { TARGET_LANGS } from "../utils/languages";
import { useRouter } from "next/router";
import { languageAtom, roomAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import { IconArrowRight } from "@tabler/icons";
import Settings from "../components/Settings";
import Layout from "../components/Layout";

export const DARK_PURPLE = "#262237";

const Home: NextPage = () => {
  const router = useRouter();
  const [room, setRoom] = useAtom(roomAtom);
  const [lang, setLang] = useAtom(languageAtom);
  const theme = useMantineTheme();

  const isValid = room && lang;
  return (
    <Layout>
      <Group align="end">
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
    </Layout>
  );
};

export default Home;
