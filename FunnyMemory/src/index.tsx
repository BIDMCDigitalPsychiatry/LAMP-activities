/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./containers/Layout";
import "./index.css";

let root: ReturnType<typeof createRoot> | null = null;

window.addEventListener(
  "message",
  (e: any) => {
    // Ignore non-config messages (e.g., webpack HMR)
    if (!e.data || typeof e.data !== "object" || !e.data.configuration) return;
    if (!root) {
      const rootElement = document.getElementById("root");
      if (rootElement) {
        root = createRoot(rootElement);
      }
    }
    if (root) {
      root.render(<Layout data={e.data} />);
    }
  },
  false
);
