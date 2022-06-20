import { Box, Global, MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import Settings from "./components/Settings";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark", primaryColor: "red" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Global
        styles={{
          body: {
            background: "none",
            height: "100%",
            width: "100%",
            overflow: "hidden",
          },
          html: {
            background: "none",
            height: "100%",
            width: "100%",
            overflow: "hidden",
          },
          "*": { userSelect: "none" },
          input: { userSelect: "auto" },
        }}
      />
      <Settings />
    </MantineProvider>
  </React.StrictMode>
);
