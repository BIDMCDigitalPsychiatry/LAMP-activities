

import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import { AppContainer } from "react-hot-loader";
import LearnTips from "./components/LearnTips";
import './index.css';
import { createRoot } from "react-dom/client";
const eventMethod = "addEventListener"
const eventer = window[eventMethod]
const messageEvent = "message"

eventer(
  messageEvent, (e: any) => {
    const rootElement = document.getElementById("root") as HTMLElement;

    if (!!rootElement) {
      const root = createRoot(rootElement);
      root.render(<AppContainer>
        <LearnTips data={e.data} />
      </AppContainer>);
    }
  },
  false
)