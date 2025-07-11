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
// const data ={
//     "activity": {
//         "id": "9v7pg2zm10vdq6ahvrcp",
//         "category": [
//             "assess"
//         ],
//         "spec": "lamp.survey",
//         "name": "Survey A2",
//         "description": "Desc",
//         "photo": null,
//         "streak": {
//             "streak": true,
//             "streakTitle": "Streak",
//             "streakDesc": "Desc"
//         },
//         "visualSettings": null,
//         "branchingSettings": {
//             "total_score": 5,
//             "activityId": "ffz23eyv1hkjp7tzvhez"
//         },
//         "showFeed": true,
//         "schedule": [],
//         "settings": [
//             {
//                 "text": "Which animal is known as the 'Ship of the Desert\"?",
//                 "type": "list",
//                 "required": true,
//                 "description": "Desc",
//                 "feedback_text": "",
//                 "options": [
//                     {
//                         "value": "Ship",
//                         "feedback_text": "Test Feedback",
//                         "description": "ship desc",
//                         "contigencySettings": {
//                             "enable_contigency": true,
//                             "contigency_type": "question",
//                             "question_index": 2
//                         }
//                     },
//                     {
//                         "value": "Desert",
//                         "feedback_text": "Desert feedback",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     }
//                 ],
//                 "warnings": []
//             },
//             {
//                 "text": "How many days are there in a week?",
//                 "type": "multiselect",
//                 "required": true,
//                 "description": "",
//                 "feedback_text": "",
//                 "options": [
//                     {
//                         "value": "1",
//                         "feedback_text": "",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": true,
//                             "contigency_type": "activity",
//                             "activity": "2nmxw52r2vxhybyw3m29"
//                         }
//                     },
//                     {
//                         "value": "3",
//                         "feedback_text": "",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     },
//                     {
//                         "value": "5",
//                         "feedback_text": "feedback",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     },
//                     {
//                         "value": "7",
//                         "feedback_text": "feedback",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     }
//                 ],
//                 "warnings": []
//             },
//             {
//                 "text": "How many hours are there in a day?",
//                 "type": "list",
//                 "required": true,
//                 "description": "",
//                 "feedback_text": "",
//                 "options": [
//                     {
//                         "value": "5",
//                         "feedback_text": "",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     },
//                     {
//                         "value": "10",
//                         "feedback_text": "feedback",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     },
//                     {
//                         "value": "20",
//                         "feedback_text": "",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     },
//                     {
//                         "value": "24",
//                         "feedback_text": "feedback",
//                         "description": "",
//                         "contigencySettings": {
//                             "enable_contigency": true,
//                             "contigency_type": "question",
//                             "question_index": 1
//                         }
//                     }
//                 ],
//                 "warnings": []
//             },
//             {
//                 "text": "Rainbow consist of how many colours?",
//                 "type": "boolean",
//                 "required": true,
//                 "description": "",
//                 "feedback_text": "",
//                 "options": [
//                     {
//                         "value": "Yes",
//                         "feedback_text": "feedback 1",
//                         "description": "Yes",
//                         "contigencySettings": {
//                             "enable_contigency": false
//                         }
//                     },
//                     {
//                         "value": "No",
//                         "feedback_text": "feedback 2",
//                         "description": "No",
//                         "contigencySettings": {
//                             "enable_contigency": true,
//                             "contigency_type": "activity",
//                             "activity": "2nmxw52r2vxhybyw3m29"
//                         }
//                     }
//                 ],
//                 "warnings": []
//             },
//             {
//                 "text": "sdfsf",
//                 "type": "text",
//                 "required": true,
//                 "description": "",
//                 "feedback_text": "Test Feedback2",
//                 "warnings": []
//             }
//         ]
//     },
//     "configuration": {
//         "language": "en-US"
//     },
//     "autoCorrect": true,
//     "noBack": false,
//     "is_favorite": true
// }

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
