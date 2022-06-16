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
      <AppShell
        fixed
        header={
          router.query.room ? (
            <Header height={50} p={6}>
              <Button
                onClick={() => {
                  router.back();
                }}
                leftIcon={<IconArrowNarrowLeft />}
                size="sm"
                color="gray"
                variant="subtle"
              >
                another room
              </Button>
            </Header>
          ) : undefined
        }
        footer={
          <Footer
            height={60}
            p="md"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
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
          <Component {...pageProps} />
        </Center>
      </AppShell>
    </MantineProvider>
  );
}

export default MyApp;
