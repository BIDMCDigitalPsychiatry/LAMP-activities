/**
 * @file   InfoModal.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2020
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
  
