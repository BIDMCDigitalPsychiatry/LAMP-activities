import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import SymbolDigitSubstitution from "./components/SymbolDigitSubstitution";
import "./index.css";

let root: ReturnType<typeof createRoot> | null = null;
let configVersion = 0;

window.addEventListener(
  "message",
  (e: any) => {
    const data = e.data;
    if (
      !data ||
      typeof data !== "object" ||
      (!data.configuration && !data.activity && !data.settings)
    ) {
      return;
    }
    if (!root) {
      const rootElement = document.getElementById("root");
      if (rootElement) {
        root = createRoot(rootElement);
      }
    }
    if (root) {
      configVersion++;
      root.render(
        <SymbolDigitSubstitution key={configVersion} data={data} />
      );
    }
  },
  false
);
