require("react-hot-loader/patch")
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Patient from "./containers/patient/index"
import './i18n'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SnackbarProvider } from "notistack"


// You MUST load the configuration immediately upon script start.
// Any delays will cause the script to entirely miss the config event.
// Therefore we first capture the event and ONLY THEN render React.
// 
// FIXME: The delay in this code is likely caused by i18n or react-redux.
//        Once that is fixed, this code should be rewritten correctly.
//

const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
eventer(
    messageEvent, (e) => {    
		ReactDOM.render(
			<SnackbarProvider>

		  <AppContainer>
		    <Provider store={store}>
		      <Patient data={e.data} />
		    </Provider>
		  </AppContainer>
		  </SnackbarProvider>,
		  document.getElementById("root")
		);
    },
    false
)
