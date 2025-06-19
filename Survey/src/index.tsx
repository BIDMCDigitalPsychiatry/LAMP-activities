/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import "material-icons"
import SurveyQuestions from './components/SurveyQuestions'
import './index.css';
import { SnackbarProvider } from "notistack"
import "./i18n"
const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
// const data = {
// //   "activity": {
// //       "id": "c9p1ktbsdn0jw87qs0bt",
// //       "category": [
// //           "assess",
// //           "learn",
// //           "manage",
// //           "prevent"
// //       ],
// //       "spec": "lamp.survey",
// //       "name": "Matrix New",
// //       "description": "Matrix Test",
// //       "photo": null,
// //       "streak": {
// //           "streak": true,
// //           "streakTitle": "",
// //           "streakDesc": ""
// //       },
// //       "visualSettings": null,
// //       "showFeed": true,
// //       "schedule": [],
// //       "settings": [
// //           {
// //               "text": "Do you have the app on your phone?",
// //               "type": "multiselect",
// //               "required": true,
// //               "description": "Please read each of the questions and select the options for your answer is \"yes\".",
// //               "options": [
// //                   {
// //                       "value": "Instagram",
// //                       "description": ""
// //                   },
// //                   {
// //                       "value": "YouTube",
// //                       "description": ""
// //                   },
// //                   {
// //                       "value": "Facebook",
// //                       "description": ""
// //                   },
// //                   {
// //                       "value": "Twitter",
// //                       "description": ""
// //                   }
// //               ],
// //               "warnings": []
// //           },
          
// //             {
// //                 "text": "Do you like pets?",
// //                 "type": "list",
// //                 "required": true,
// //                 "description": "",
// //                 "options": [
// //                     {
// //                         "contigencySettings":{enable_contigency: true, contigency_type: "question", question_index: 3},
// //                         "value": "yes"
// //                     },
// //                     {
// //                         "value": "no"
// //                     }
// //                 ],
// //                 "warnings": []
// //             },
// //             {
// //                 "text": "q2",
// //                 "type": "list",
// //                 "required": true,
// //                 "description": "",
// //                 "options": [
// //                     {
// //                         "contigencySettings":{enable_contigency: true, contigency_type: "activity", activity: 20},
// //                         "value": 10
// //                     },
// //                     {
// //                         "value": 20
// //                     }
// //                 ],
// //                 "warnings": []
// //             },
// //             {
// //                 "text": "How many pets you have?",
// //                 "type": "list",
// //                 "required": true,
// //                 "description": "",
// //                 "options": [
// //                     {
// //                         "value": 1
// //                     },
// //                     {
// //                         "value": 2
// //                     }
// //                 ],
// //                 "warnings": []
// //             }
        
// //       ]
// //   },
// //   "configuration": {
// //       "language": "en-US"
// //   },
// //   "autoCorrect": true,
// //   "noBack": false
// "activity": 
// {
//   "id": "by67jpmk9bcd771w2w2c",
//   "category": [
//     "assess"
//   ],
//   "spec": "lamp.survey",
//   "name": "SurveyTesting",
//   "description": "",
//   "photo": null,
//   "streak": {
//     "streak": true,
//     "streakTitle": "",
//     "streakDesc": ""
//   },
//   "visualSettings": null,
//   "branchingSettings": {
//     "total_score": 1,
//     "activityId": "nzhv2h07mv56sxjf0vww"
//   },
//   "showFeed": true,
//   "schedule": [],
//   "settings": [
//     {
//       "text": "How are you feeling today ?",
//       "type": "list",
//       "required": true,
//       "description": "",
//       "options": [
//         {
//           "value": "Good",
//           "description": "In a good mood",
//           "contigencySettings": {
//             "enable_contigency": false,
//             "contigency_type": "activity"
//           }
//         },
//         {
//           "value": "Bad",
//           "description": "In a bad mood",
//           "contigencySettings": {
//             "enable_contigency": true,
//             "contigency_type": "activity",
//             "activity": "xbk6vss0hjqs1dfa9zm7"
//           }
//         }
//       ],
//       "warnings": []
//     },
//     {
//       "text": "About yourself",
//       "type": "text",
//       "required": true,
//       "description": "",
//       "warnings": []
//     },
//     {
//       "text": "How many pets do you have?",
//       "type": "list",
//       "required": true,
//       "description": "",
//       "options": [
//         {
//           "value": "1",
//           "description": "one",
//           "contigencySettings": {
//             "enable_contigency": false
//           }
//         },
//         {
//           "value": "2",
//           "description": "Two",
//           "contigencySettings": {
//             "enable_contigency": false
//           }
//         },
//         {
//           "value": "3",
//           "description": "Three",
//           "contigencySettings": {
//             "enable_contigency": false
//           }
//         }
//       ],
//       "warnings": []
//     }
//   ]
// }
// }
// const data = {"id":"ztwnbaz3qrsjgqp2yybd",
//   "category":["assess"],
//   "spec":"lamp.survey","name":"Survey branching","description":"desc","photo":null,"streak":{"streak":true,"streakTitle":"streak","streakDesc":"desc"},"visualSettings":null,"branchingSettings":{"total_score":1,"activityId":"6sd48f21rhwa368fc6ew"},"showFeed":true,"schedule":[],
//   "settings":
//   [{"text":"Rich or poor?","type":"list","required":true,"description":"desc",
//     "options":[
//       {"value":"Yes","description":"sfd","contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":3}},
//       {"value":"No","description":"Desf","contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"fcykxn345tz3j1bnhjh9"}}],
//       "warnings":[]},
//     {"text":"Have car?","type":"text","required":true,"description":"rer","warnings":[]}, 
//     {
//       "text": "About yourself",
//       "type": "text",
//       "required": true,
//       "description": "",
//       "warnings": []
//     },]}

    // const data = {"id":"3gkk8984xprehr04pkt6","category":["assess"],"spec":"lamp.survey","name":"SurveyA1","description":"Desc","photo":null,"streak":{"streak":true,"streakTitle":"Streak","streakDesc":"Desc"},"visualSettings":null,"branchingSettings":{"total_score":4,"activityId":"ffz23eyv1hkjp7tzvhez"},"showFeed":true,"schedule":[],
    // "settings":[
    //   {"text":"what do you want to be when you grow up?","type":"list","required":true,"description":"s",
    //     "options":[{"value":"Teacher","description":"ds",
    //     "contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":4}},
    //     {"value":"Doctor","description":"ds",
    //     "contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":3}}
    //   ],
    //     "warnings":[{"answer":"Doctor","warningText":"1"},{"answer":"Fireman","warningText":"ds"},{"answer":"Police"},{"answer":"Teacher","warningText":"ds"}]},
    //   {"text":"What is your favorite place in the world?","type":"multiselect","required":true,"description":"ds",
    //     "options":[{"value":"America","description":"",
    //     "contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"2nmxw52r2vxhybyw3m29"}}],"warnings":[{"answer":"America"},{"answer":"India"},{"answer":"China"},{"answer":"Europe"},{"answer":"Asian countries"}]},
    //   {"text":"What would you do if you made the rules at home?","type":"rating","required":true,"description":"",
    //     "options":[{"value":1,"description":"","contigencySettings":{}},{"value":2,"description":"","contigencySettings":{}},{"value":3,"description":"","contigencySettings":{}},
    //       {"value":4,"description":"",
    //       "contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":1}}],"warnings":[]}]}

        //   const data ={"id":"9v7pg2zm10vdq6ahvrcp","category":["assess"],"spec":"lamp.survey","name":"Survey A2","description":"Desc","photo":null,"streak":{"streak":true,"streakTitle":"Streak","streakDesc":"Desc"},"visualSettings":null,"branchingSettings":{"total_score":5,"activityId":"ffz23eyv1hkjp7tzvhez"},"showFeed":true,"schedule":[],
        //   "settings":[{"text":"Which animal is known as the 'Ship of the Desert\"?","type":"list","required":true,"description":"Desc",
        //     "options":[{"value":"Ship","description":"","contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":2}},
        //       {"value":"Desert","description":"","contigencySettings":{"enable_contigency":false}}],"warnings":[]},
        //       {"text":"How many days are there in a week?","type":"multiselect","required":true,"description":"",
        //         "options":[{"value":"1","description":"","contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"2nmxw52r2vxhybyw3m29"}},
        //           {"value":"3","description":"","contigencySettings":{"enable_contigency":false}},
        //           {"value":"5","description":"","contigencySettings":{"enable_contigency":false}},
        //           {"value":"7","description":"","contigencySettings":{"enable_contigency":false}}],"warnings":[]},
        //           {"text":"How many hours are there in a day?","type":"list","required":true,"description":"",
        //             "options":[{"value":"5","description":"","contigencySettings":{"enable_contigency":false}},
        //               {"value":"10","description":"","contigencySettings":{"enable_contigency":false}},
        //               {"value":"20","description":"","contigencySettings":{"enable_contigency":false}},
        //               {"value":"24","description":"","contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":1}}],"warnings":[]},
        //               {"text":"Rainbow consist of how many colours?","type":"boolean","required":true,"description":"","warnings":[]},
        //               {"text":"What is your favorite place in the world?","type":"multiselect","required":true,"description":"ds",
        // "options":[{"value":"America","description":"",
        // "contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"2nmxw52r2vxhybyw3m29"}}],"warnings":[{"answer":"America"},{"answer":"India"},{"answer":"China"},{"answer":"Europe"},{"answer":"Asian countries"}]},
        //             ]}

        const data = {"id":"q7q0x2eebsth27c43c4s","category":["assess"],"spec":"lamp.survey","name":"Survey new","description":"","photo":null,"streak":{"streak":true,"streakTitle":"","streakDesc":""},"visualSettings":null,"branchingSettings":{"total_score":1,"activityId":"xqssxzsaq2jwq7tr2cmv"},"showFeed":true,"schedule":[],
        "settings":[
          {"text":"Q1","type":"boolean","required":true,"description":"",
            "options":[
              {"value":"Yes","description":"Yes",
              "contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"2zzngs6xbx544vm1yre4"}},
              {"value":"No","description":"No",
                "contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":2}}],"warnings":[]
          },
          {"text":"Q2","type":"likert","required":true,"description":"",
            "options":[
              {"value":"3","description":"Nearly All the Time",
              "contigencySettings":{"enable_contigency":false}},
              {"value":"2","description":"More than Half the Time",
                "contigencySettings":{"enable_contigency":false}},
              {"value":"1","description":"Several Times",
                  "contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"2zzngs6xbx544vm1yre4"}},
              {"value":"0","description":"Not at all",
                "contigencySettings":{"enable_contigency":false}}],"warnings":[]
          },
          {"text":"Q3","type":"rating","required":true,"description":"",
            "options":[
              {"value":1,"description":"",
                "contigencySettings":{"enable_contigency":false}},
              {"value":2,"description":"",
                "contigencySettings":{"enable_contigency":false}},
              {"value":3,"description":"",
                "contigencySettings":{"enable_contigency":false}}],"warnings":[]
              },
          {"text":"Q4","type":"list","required":true,"description":"",
            "options":[
              {"value":"ab","description":"",
                "contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"2zzngs6xbx544vm1yre4"}},
              {"value":"cd","description":"","contigencySettings":{"enable_contigency":false}}],"warnings":[]
          }
        ]}

//  eventer(
//    messageEvent, (e) => {    
		ReactDOM.render(
      <SnackbarProvider>
        <AppContainer>
          <SurveyQuestions data={data}/> 
        </AppContainer>
      </SnackbarProvider>
          , 		  
		  document.getElementById("root")
		);
  //  },
  //  false
  // )