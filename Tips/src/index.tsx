

import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import * as React from 'react';
import { AppContainer } from "react-hot-loader";
import LearnTips from "./components/LearnTips";
import './index.css';
import { createRoot } from "react-dom/client";
const eventMethod = "addEventListener"
const eventer = window[eventMethod]
const messageEvent = "message"

// eventer(
//   messageEvent, (e: any) => {
//     const rootElement = document.getElementById("root") as HTMLElement;

//     if (!!rootElement) {
//       const root = createRoot(rootElement);
//       root.render(<AppContainer>
//         <LearnTips data={e.data} />
//       </AppContainer>);
//     }
//   },
//   false
// )


const data = {
  "activity": {
      "id": "activity1",
      "spec": "lamp.tip",
      "name": "Tip Demo",
      "schedule": [
          {
              "start_date": "2018-08-22T00:00:00.000Z",
              "time": "2018-08-22T20:00:00.000Z",
              "repeat_interval": "triweekly",
              "custom_time": null
          }
      ],
      "settings": [
        {
        "title": "Tip 1",
        "text": 
        // "[sample link](https://stackoverflow.com/)",
        "[sample link](https://www.youtube.com/watch?v=wDchsz8nmbo)",
        // "[sample link](https://www.dailymotion.com/video/x8ocww7)",
        // "[sample link](https://vimeo.com/347119375)",
        }
      ]
  },
  "configuration": {
      "language": "en-US"
  },
  "autoCorrect": true,
  "noBack": false
}


ReactDOM.render(
  <React.StrictMode>
    <LearnTips noBack={false} data={data} />
    </React.StrictMode>,
  document.getElementById("root")
);