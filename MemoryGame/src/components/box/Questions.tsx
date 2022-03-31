// About what time is it? (scroll wheel)
// • What is today’ date? (scroll wheel)
// • What is the month? (scroll wheel)
// • What is the year? (keypad)
// • What is the day of the week? (drop down selection or scroll wheel)
// • What season is this (drop down selection or scroll wheel)

/**
 * @file   Questions.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2022
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
 import * as React from 'react';
 import { Button, Modal } from 'react-bootstrap';
 
 interface Props  {
     show: boolean;
     modalClose(status:boolean):void;
     msg:string;
 }
 
 interface State {
   showStatus : boolean
 }
 
 export class InfoModal extends React.Component<Props, State> {    
  
     constructor(props: Props) {
       super(props);
       this.state = {
          showStatus : this.props.show
       }
     }  
 
     // Handles modal close 
     handleClose = () => {
       this.setState({
         showStatus : false
       });
       this.props.modalClose(false);
     } 
      
     // Modal render function
     render() {   
          return (            
           <Modal show={this.state.showStatus} onHide={this.handleClose} animation={false}
               size="sm"
               aria-labelledby="contained-modal-title-vcenter"
               centered={true}>
                 <Modal.Header closeButton={true}>
                   <Modal.Title>mindLamp</Modal.Title>
                 </Modal.Header>
               <Modal.Body>{this.props.msg}</Modal.Body>
               <Modal.Footer>              
                   <Button variant="link" onClick={this.handleClose}>
                     Ok
                   </Button>
             </Modal.Footer>
          </Modal>    
         );
     }
 }
   
 