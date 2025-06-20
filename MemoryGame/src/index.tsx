/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
require("react-hot-loader/patch");
import * as React from "react";
import { AppContainer } from "react-hot-loader";
import Boxes from "./components/box/Boxes";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";

const eventMethod = "addEventListener";
const eventer = window[eventMethod];
const messageEvent = "message";
// const data = {
//   id: "q7q0x2eebsth27c43c4s",
//   category: ["assess"],
//   spec: "lamp.survey",
//   name: "Survey new",
//   description: "",
//   photo: null,
//   streak: { streak: true, streakTitle: "", streakDesc: "" },
//   visualSettings: null,
//   branchingSettings: { total_score: 1, activityId: "xqssxzsaq2jwq7tr2cmv" },
//   showFeed: true,
//   schedule: [],
//   is_favorite: true,
//   settings: [
//     {
//       text: "Q1",
//       type: "boolean",
//       required: true,
//       description: "",
//       options: [
//         {
//           value: "Yes",
//           description: "Yes",
//           contigencySettings: {
//             enable_contigency: true,
//             contigency_type: "activity",
//             activity: "2zzngs6xbx544vm1yre4",
//           },
//         },
//         {
//           value: "No",
//           description: "No",
//           contigencySettings: {
//             enable_contigency: true,
//             contigency_type: "question",
//             question_index: 2,
//           },
//         },
//       ],
//       warnings: [],
//     },
//     {
//       text: "Q2",
//       type: "likert",
//       required: true,
//       description: "",
//       options: [
//         {
//           value: "3",
//           description: "Nearly All the Time",
//           contigencySettings: { enable_contigency: false },
//         },
//         {
//           value: "2",
//           description: "More than Half the Time",
//           contigencySettings: { enable_contigency: false },
//         },
//         {
//           value: "1",
//           description: "Several Times",
//           contigencySettings: {
//             enable_contigency: true,
//             contigency_type: "activity",
//             activity: "2zzngs6xbx544vm1yre4",
//           },
//         },
//         {
//           value: "0",
//           description: "Not at all",
//           contigencySettings: { enable_contigency: false },
//         },
//       ],
//       warnings: [],
//     },
//     {
//       text: "Q3",
//       type: "rating",
//       required: true,
//       description: "",
//       options: [
//         {
//           value: 1,
//           description: "",
//           contigencySettings: { enable_contigency: false },
//         },
//         {
//           value: 2,
//           description: "",
//           contigencySettings: { enable_contigency: false },
//         },
//         {
//           value: 3,
//           description: "",
//           contigencySettings: { enable_contigency: false },
//         },
//       ],
//       warnings: [],
//     },
//     {
//       text: "Q4",
//       type: "list",
//       required: true,
//       description: "",
//       options: [
//         {
//           value: "ab",
//           description: "",
//           contigencySettings: {
//             enable_contigency: true,
//             contigency_type: "activity",
//             activity: "2zzngs6xbx544vm1yre4",
//           },
//         },
//         {
//           value: "cd",
//           description: "",
//           contigencySettings: { enable_contigency: false },
//         },
//       ],
//       warnings: [],
//     },
//   ],
// };
eventer(
  messageEvent,
  (e: any) => {
    const rootElement = document.getElementById("root") as HTMLElement;

    if (!!rootElement) {
      const root = createRoot(rootElement);
      root.render(
        <AppContainer>
          <Boxes data={e.data} />
          {/* <Boxes data={data} /> */}
        </AppContainer>
      );
    }
  },
  false
);
