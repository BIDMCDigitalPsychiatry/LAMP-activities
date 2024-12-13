import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props  {
    show: boolean;
    modalClose(status:boolean):void;
    msg:string;
    // language: string;
}

interface State {
  showStatus : boolean
}

export class GeneralInstruction extends React.Component<Props, State> {    
 
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
          <Modal show={this.state.showStatus} onHide={this.handleClose} 
          animation={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered={true}>               
              <Modal.Body className='modal-body-section'>{this.props.msg}</Modal.Body>
              <Modal.Footer className={'footer-cls'}>              
                  <Button onClick={this.handleClose}>
                    {("Ok")}
                  </Button>
            </Modal.Footer>
         </Modal>    
        );
    }
}