/**
 * @file   index.tsx
 * @brief  Initial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import Board from './components/Board';
import './index.css';
import { createRoot } from "react-dom/client";

let root: ReturnType<typeof createRoot> | null = null;

window.addEventListener(
  "message", (e: any) => {
    // Ignore non-config messages (e.g., webpack HMR)
    if (!e.data || typeof e.data !== "object" || !e.data.configuration) return;
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
