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
import HopeBox from './components/HopeBox'
import './index.css';
import "material-icons"

ReactDOM.render(
  <AppContainer>
    <HopeBox />
  </AppContainer>,  
  document.getElementById('root') as HTMLElement
);
