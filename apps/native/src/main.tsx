import { Global, MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
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
          body: { background: "none" },
          "*": { userSelect: "none" },
          input: { userSelect: "auto" },
        }}
      />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
