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
   modalClose(): void;
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
     this.props.modalClose();
   };
 
   // Modal render function
   render() {
     return (
       <Modal
         show={this.state.showStatus}
         onHide={this.handleClose}
         animation={false}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered={true}
         backdrop="static"
       >
         <Modal.Header className="instruction-modal-header">
           <Modal.Title className="instruction-modal-title">
             {i18n.t("Instructions")}
           </Modal.Title>
         </Modal.Header>
         <Modal.Body className="instruction-modal-body">
           {i18n.t(this.props.msg)}
         </Modal.Body>
         <Modal.Footer className="instruction-modal-footer">
           <Button className="instruction-modal-btn" onClick={this.handleClose}>
             {i18n.t("OK")}
           </Button>
         </Modal.Footer>
       </Modal>
     );
   }
 }
 