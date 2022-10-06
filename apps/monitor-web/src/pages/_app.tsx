import { TextInput } from "@mantine/core";
import type { AppProps } from "next/app";
import { DARK_PURPLE } from ".";
import { HSMantineProvider } from "../components/ThemeProvider/HSMantineProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HSMantineProvider
      theme={{
        colorScheme: "dark",
        defaultRadius: "md",
        primaryColor: "hsOrange",
        components: {
          TextInput: {
            styles: (theme) => ({
              input: {
                backgroundColor: theme.fn.darken(DARK_PURPLE, 0.2),
                fontWeight: 600,
                color: theme.colors.hsOrange[7],
                "&::placeholder": {
                  opacity: 0.7,
                  color: theme.colors.gray[5],
                },
                "&:focus": {
                  borderColor: theme.colors.hsOrange[7],
                },
              },
            }),
          },
        },
      }}
    >
      <Component {...pageProps} />
    </HSMantineProvider>
  );
}

export default MyApp;
