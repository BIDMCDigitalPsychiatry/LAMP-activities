import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactDOM from "react-dom";
import PopTheBubbles from "./components/pop_the_bubbles/PopTheBubbles";
import "./index.css";

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
    ReactDOM.render(
      <PopTheBubbles
        data={data}
        activity={data.activity}
        configuration={data.configuration}
        noBack={data.noBack}
      />,
      document.getElementById("root") as HTMLElement
    );
  },
  false
);
