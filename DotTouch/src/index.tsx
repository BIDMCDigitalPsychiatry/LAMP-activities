import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import DotTouch from "./components/DotTouch/DotTouch";
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
      !data.configuration
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
      root.render(<DotTouch key={configVersion} data={data} />);
    }
  },
  false
);
