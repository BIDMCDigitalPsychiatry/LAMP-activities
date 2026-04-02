/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import DCogs from "./components/dcogs/DCogs";
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
      root.render(<DCogs data={data} />);
    }
  },
  false
);
