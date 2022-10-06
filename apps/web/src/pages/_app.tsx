import { Global, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { HSMantineProvider } from "../components/ThemeProvider/HSMantineProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <HSMantineProvider
      theme={{
        colorScheme: "dark",
        defaultRadius: "sm",
        primaryColor: "red",
      }}
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
    </HSMantineProvider>
  );
}

export default MyApp;
