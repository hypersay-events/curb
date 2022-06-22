import { Global, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        primaryColor: "red",
        fontFamily: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Global
        styles={(theme) => ({
          "@keyframes line-highlight": {
            "0%": { color: theme.colors.red[7] },
            "100%": { color: theme.white },
          },
        })}
      />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
