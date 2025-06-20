/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Goals from "./components/Goals";
import "./index.css";
import "material-icons";
const eventer = window.addEventListener;
const messageEvent = "message";
// const data = {
//   activity: {
//     id: "ems6bdhvzq5hw7bxwvm4",
//     spec: "lamp.goals",
//     name: "Goals",
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
//       value: 2,
//     },
//     category: ["manage"],
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
  (e: any) => {
    ReactDOM.render(
      <AppContainer>
        <Goals data={e.data} />
        {/* <Goals data={data} /> */}
      </AppContainer>,
      document.getElementById("root")
    );
  },
  false
);
