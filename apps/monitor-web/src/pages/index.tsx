import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import { AVAILABLE_LANGUAGES, TARGET_LANGS } from "../utils/languages";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [room, setRoom] = useState("");
  const [lang, setLang] = useState<keyof typeof AVAILABLE_LANGUAGES | null>(
    null
  );
  const isValid = room && lang;
  return (
    <div>
      <Head>
        <title>Curb monitor app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TextInput
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Choose a room"
      />
      <Select
        label="Language"
        placeholder="Pick one"
        data={TARGET_LANGS.map((l) => ({ value: l.value, label: l.label }))}
        value={lang}
        onChange={(l) => setLang(l)}
      />
      <Button
        disabled={!isValid}
        onClick={() => {
          router.push(`/${room}/${lang}`);
        }}
      >
        Go
      </Button>
    </div>
  );
};

export default Home;
