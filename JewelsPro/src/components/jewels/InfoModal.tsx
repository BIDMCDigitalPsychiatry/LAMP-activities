/**
 * @file   InfoModal.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import i18n from "./../../i18n";

interface Props  {
    show: boolean;
    modalClose(status:boolean, point:number):void;
    msg:string;
    language:string
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
    handleClose = (status:boolean) => {
      this.setState({
        showStatus : false
      });
      this.props.modalClose(status, 2);
    } 
     
    // Modal render function
    render() {   
         return (            
          <Modal className="modal" show={this.state.showStatus} onHide={() => this.handleClose(false)} animation={false}
              size="xl"
              aria-labelledby="contained-modal-title-vcenter"
              centered={true}>
                <Modal.Header closeButton={true}>
                  <Modal.Title className="modal-title">mindLamp</Modal.Title>
                </Modal.Header>
              <Modal.Body className="pt-4 pb-5">{i18n.t(this.props.msg)}</Modal.Body>
              <Modal.Footer>
                <div className="m-0">              
                  <Button variant="primary" onClick={() => this.handleClose(true)}>
                  {i18n.t("Yes")}
                  </Button>
                  <Button variant="primary" onClick={() => this.handleClose(false)}>
                  {i18n.t("No")}
                  </Button>
                </div>
            </Modal.Footer>
         </Modal>    
        );
    }
}
  
