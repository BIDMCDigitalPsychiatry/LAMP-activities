/**
 * @file   InfoModal.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
 import * as React from "react";
 import { Button, Modal } from "react-bootstrap";
 
 import i18n from "./../../i18n";
 
 interface Props {
   show: boolean;
   modalClose(status: boolean): void;
   msg: string;
   language: string;
 }
 
 interface State {
   showStatus: boolean;
 }
 
 export class InfoModal extends React.Component<Props, State> {
   constructor(props: Props) {
     super(props);
     i18n.changeLanguage(!!props.language ? props.language : "en-US");
     this.state = {
       showStatus: this.props.show,
     };
   }
 
   // Handles modal close
   handleClose = () => {
     this.setState({
       showStatus: false,
     });
     this.props.modalClose(false);
   };
 
   // Modal render function
   render() {
     return (
       <Modal
         show={this.state.showStatus}
         onHide={this.handleClose}
         animation={false}
         aria-labelledby="contained-modal-title-vcenter"
         centered={true}
         backdrop="static"
       >
         <Modal.Header closeButton={true}>
           <Modal.Title>mindLamp</Modal.Title>
         </Modal.Header>
         <Modal.Body>{i18n.t(this.props.msg)}</Modal.Body>
         <Modal.Footer>
           <Button variant="link" onClick={this.handleClose}>
             {i18n.t("OK")}
           </Button>
         </Modal.Footer>
       </Modal>
     );
   }
 }
 