import type { NextPage } from "next";
import Head from "next/head";
import {
  Center,
  Image,
  AppShell,
  Footer,
  Anchor,
  Text,
  MediaQuery,
} from "@mantine/core";
import { PropsWithChildren } from "react";

export const DARK_PURPLE = "#262237";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
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
        <Center sx={{ height: "100%" }}>{children}</Center>
      </AppShell>
    </>
  );
};

export default Layout;
