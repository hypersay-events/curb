import type { AppProps } from "next/app";
import { HSMantineProvider } from "../components/ThemeProvider/HSMantineProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HSMantineProvider
      theme={{
        colorScheme: "dark",
        defaultRadius: "sm",
        primaryColor: "hsOrange",
      }}
    >
      <Component {...pageProps} />
    </HSMantineProvider>
  );
}

export default MyApp;
