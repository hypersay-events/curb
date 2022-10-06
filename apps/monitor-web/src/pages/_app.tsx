import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { HSMantineProvider } from "../components/ThemeProvider/HSMantineProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HSMantineProvider
      theme={{
        colorScheme: "dark",
        defaultRadius: "sm",
        primaryColor: "orange",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </HSMantineProvider>
  );
}

export default MyApp;
