/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
require("react-hot-loader/patch");

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import MedicationTracker from "./components/MedicationTracker";
import "./index.css";
import "material-icons";

const eventMethod = "addEventListener";
const eventer = window[eventMethod];
const messageEvent = "message";
// const data = {
//   activity: {
//     id: "1k7q6dv57xr5geqsvn9g",
//     spec: "lamp.medications",
//     name: "medications",
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
//       unit: "Litre",
//       value: 1,
//     },
//     category: ["manage"],
//   },
//   configuration: {
//     language: "en-US",
//   },
//   autoCorrect: true,
//   noBack: false,
//   is_favorite: true,
// };
eventer(
  messageEvent,
  (e: any) => {
    ReactDOM.render(
      <AppContainer>
        <MedicationTracker data={e.data} />
        {/* <MedicationTracker data={data} /> */}
      </AppContainer>,
      document.getElementById("root")
    );
  },
  false
);
