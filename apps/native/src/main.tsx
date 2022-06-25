import { Global, MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/inter/variable.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <MantineProvider
    theme={{
      colorScheme: "dark",
      primaryColor: "red",
      fontFamily: `'InterVariable',-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
      fontFamilyMonospace: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace`,
    }}
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
    <App />
  </MantineProvider>
  // </React.StrictMode>
);
