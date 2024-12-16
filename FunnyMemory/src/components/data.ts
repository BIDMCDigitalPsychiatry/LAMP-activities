// Data.js 

import { getMonthIndex } from "src/functions";
import DataForMonth1 from "./DataForEachMonth/data-Month1";
import DataForMonth2 from "./DataForEachMonth/data-Month2";
import DataForMonth3 from "./DataForEachMonth/data-Month3";
import DataForMonth4 from "./DataForEachMonth/data-Month4";
import DataForMonth5 from "./DataForEachMonth/data-Month5";
import DataForMonth6 from "./DataForEachMonth/data-Month6";

const getData = () =>{
	const monthIndex = getMonthIndex();
  let dataForMonth = []
  switch(monthIndex){
    case 1 : dataForMonth = DataForMonth1;
              break;
    case 2 : dataForMonth = DataForMonth2;
              break;
    case 3 : dataForMonth = DataForMonth3;
              break;
    case 4 : dataForMonth = DataForMonth4;
              break;
    case 5 : dataForMonth = DataForMonth5;
              break;
    case 6 : dataForMonth = DataForMonth6;
              break;
    default : dataForMonth = DataForMonth1
  }
  return dataForMonth;
}
const Data = getData(); 
export default Data;
