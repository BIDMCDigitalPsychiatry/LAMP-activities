/**
 * @file   index.tsx
 * @brief  Entry point for the JewelsPro activity
 */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import Jewels from "./components/jewels/Jewels";
import "./index.css";

let root: ReturnType<typeof createRoot> | null = null;
let configVersion = 0;

window.addEventListener(
  "message",
  (e: any) => {
    const data = e.data;
    // Ignore non-config messages (e.g. CRA HMR, webpack dev server)
    if (!data || typeof data !== "object" || (!data.configuration && !data.activity && !data.settings)) {
      return;
    }
    if (!root) {
      const rootElement = document.getElementById("root");
      if (rootElement) {
        root = createRoot(rootElement);
      }
    }
    if (root) {
      // Increment key to force full remount on each new config
      configVersion++;
      root.render(<Jewels key={configVersion} data={data} />);
    }
  },
  false
);
