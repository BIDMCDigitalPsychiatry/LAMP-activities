require("react-hot-loader/patch");
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Patient from "./containers/patient/index";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";

// You MUST load the configuration immediately upon script start.
// Any delays will cause the script to entirely miss the config event.
// Therefore we first capture the event and ONLY THEN render React.
//
// FIXME: The delay in this code is likely caused by i18n or react-redux.
//        Once that is fixed, this code should be rewritten correctly.
//

const eventMethod = window.addEventListener
  ? "addEventListener"
  : "attachEvent";
const eventer = window[eventMethod];
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
// const data = {
//   activity: {
//     id: "wfzx08mpdrfbx1b8ts3c",
//     spec: "lamp.dbt_diary_card",
//     name: "DBT",
//     description: "",
//     photo: null,
//     streak: {
//       streak: true,
//       streakTitle: "",
//       streakDesc: "",
//     },
//     visualSettings: null,
//     showFeed: true,
//     schedule: [],
//     settings: {
//       livingGoal: "",
//       targetEffective: [
//         {
//           target: "A",
//           measure: "Times",
//         },
//       ],
//       targetIneffective: [
//         {
//           target: "B",
//           measure: "Times",
//         },
//       ],
//       emotions: [
//         {
//           emotion: "sad",
//         },
//       ],
//     },
//     category: ["assess"],
//   },
//   configuration: {
//     language: "en-US",
//   },
//   autoCorrect: true,
//   noBack: false,
//   is_favorite: false,
// };
eventer(
  messageEvent,
  (e) => {
    ReactDOM.render(
      <SnackbarProvider>
        <AppContainer>
          <Provider store={store}>
            <Patient data={e.data} />
            {/* <Patient data={data} /> */}
          </Provider>
        </AppContainer>
      </SnackbarProvider>,
      document.getElementById("root")
    );
  },
  false
);
