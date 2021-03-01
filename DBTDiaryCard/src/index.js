import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Patient from "./containers/patient/index"
import './i18n'
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Patient />
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);