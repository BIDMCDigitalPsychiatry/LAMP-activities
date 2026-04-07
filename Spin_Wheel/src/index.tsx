import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import Board from "./components/Board";

let root: ReturnType<typeof createRoot> | null = null;

window.addEventListener(
  "message",
  (e: any) => {
    if (!root) {
      const rootElement = document.getElementById("root");
      if (rootElement) {
        root = createRoot(rootElement);
      }
    }
    if (root) {
      root.render(<Board data={e.data} />);
    }
  },
  false
);
