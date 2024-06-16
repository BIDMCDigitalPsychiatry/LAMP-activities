/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
require("react-hot-loader/patch") 
import * as React from 'react';
import { AppContainer } from "react-hot-loader";
import Boxes from './components/box/Boxes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";

const eventMethod = "addEventListener"
const eventer = window[eventMethod]
const messageEvent =  "message"
eventer(
    messageEvent, (e: any) => { 
const rootElement = document.getElementById("root") as HTMLElement;

if(!!rootElement) { 
	const root = createRoot(rootElement);
	root.render(<AppContainer>
		<Boxes data={e.data}/>
	</AppContainer>);
}
},
false
) 