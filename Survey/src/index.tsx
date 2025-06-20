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
import "material-icons";
import SurveyQuestions from "./components/SurveyQuestions";
import "./index.css";
import { SnackbarProvider } from "notistack";
import "./i18n";
const eventMethod = window.addEventListener
  ? "addEventListener"
  : "attachEvent";
const eventer = window[eventMethod];
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
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
  (e) => {
    ReactDOM.render(
      <SnackbarProvider>
        <AppContainer>
          {/* <SurveyQuestions data={data} /> */}
          <SurveyQuestions data={e.data} />
        </AppContainer>
      </SnackbarProvider>,
      document.getElementById("root")
    );
  },
  false
);
