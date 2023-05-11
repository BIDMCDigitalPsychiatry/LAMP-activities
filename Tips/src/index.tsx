import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LearnTips from "./components/LearnTips";
import reportWebVitals from "./reportWebVitals";

const eventMethod: any = window.addEventListener !== undefined ? "addEventListener" : "attachEvent";
const eventer: any = window[eventMethod];
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
eventer(
  messageEvent,
  (e: any) => {
    ReactDOM.render(
      <React.StrictMode>
        <LearnTips data={e.data} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  },
  false
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
