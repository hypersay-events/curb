import type { NextPage } from "next";
import Head from "next/head";
import { TextInput, Select, Button, Group, Input, Stack } from "@mantine/core";
import { TARGET_LANGS } from "../utils/languages";
import { useRouter } from "next/router";
import { languageAtom, roomAtom } from "../atoms/atoms";
import { useAtom } from "jotai";

const Home: NextPage = () => {
  const router = useRouter();
  const [room, setRoom] = useAtom(roomAtom);
  const [lang, setLang] = useAtom(languageAtom);
  const isValid = room && lang;
  return (
    <div>
      <Head>
        <title>Hypersay Multilanguage Monitor App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack sx={{ maxWidth: "400px" }}>
        <Input.Wrapper label="Room">
          <TextInput
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Choose a room"
          />
        </Input.Wrapper>
        <Select
          label="Language"
          placeholder="Pick one"
          clearable
          data={TARGET_LANGS.map((l) => ({ value: l.value, label: l.label }))}
          value={lang}
          onChange={(l) => setLang(l)}
        />
        <Group>
          <Button
            onClick={() => {
              router.push(`/settings`);
            }}
          >
            Settings
          </Button>
          <Button
            disabled={!isValid}
            onClick={() => {
              router.push(`/${room}/${lang}`);
            }}
          >
            Go
          </Button>
        </Group>
      </Stack>
    </div>
  );
};

export default Home;
