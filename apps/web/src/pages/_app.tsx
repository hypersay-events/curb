import {
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Center,
  Footer,
  Header,
  MantineProvider,
  Text,
} from "@mantine/core";
import { IconArrowNarrowLeft, IconBackhoe } from "@tabler/icons";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <MantineProvider
      theme={{ colorScheme: "dark", primaryColor: "red" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
