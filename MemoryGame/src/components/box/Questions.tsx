

/**
 * @file   Questions.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2022
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
 import * as React from 'react';
//  import { Button, Modal } from 'react-bootstrap';
 
 interface Props  {
     show: boolean;
     modalClose(status:boolean):void;
     msg:string;
 }
 
 interface State {
   showStatus : boolean
 }
 
 export default class Questions extends React.Component<{}, State> {    
  
     constructor(props: Props) {
       super(props);
    //    this.state = {
    //       showStatus : this.props.show
    //    }
     }  
 
     // Handles modal close 
    //  handleClose = () => {
    //    this.setState({
    //      showStatus : false
    //    });
    //    this.props.modalClose(false);
    //  } 
      
     // Modal render function
     render() {   
          return (            
           <div>
               {/* // About what time is it? (scroll wheel)
// • What is today’ date? (scroll wheel)
// • What is the month? (scroll wheel)
// • What is the year? (keypad)
// • What is the day of the week? (drop down selection or scroll wheel)
// • What season is this (drop down selection or scroll wheel) */}
           </div>  
         );
     }
 }
   
 