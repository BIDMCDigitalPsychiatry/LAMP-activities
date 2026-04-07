import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import PopTheBubbles from "./components/pop_the_bubbles/PopTheBubbles";
import "./index.css";

let root: ReturnType<typeof createRoot> | null = null;

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
      const el = document.getElementById("root");
      if (el) root = createRoot(el);
    }
    if (root) {
      root.render(
        <PopTheBubbles
          data={data}
          activity={data.activity}
          configuration={data.configuration}
          noBack={data.noBack}
        />
      );
    }
  },
  false
);
