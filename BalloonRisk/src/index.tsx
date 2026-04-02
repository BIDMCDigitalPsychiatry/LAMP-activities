import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import Board from "./components/Board";
import "./index.css";

let root: ReturnType<typeof createRoot> | null = null;

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
      root.render(<Board data={data} />);
    }
  },
  false
);
