import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import i18n from "../i18n";

interface Props {
  show: boolean;
  modalClose(status: boolean): void;
  msg: string;
  language: string;
}

interface State {
  showStatus: boolean;
}

export class InstructionModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showStatus: this.props.show };
  }

  handleClose = () => {
    this.setState({ showStatus: false });
    this.props.modalClose(false);
  };

  render() {
    return (
      <Modal
        show={this.state.showStatus}
        onHide={this.handleClose}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
      >
        <Modal.Header className="instruction-modal-header">
          <Modal.Title className="instruction-modal-title">
            {i18n.t("Instructions")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="instruction-modal-body">
          {this.props.msg}
        </Modal.Body>
        <Modal.Footer className="instruction-modal-footer">
          <Button className="instruction-modal-btn" onClick={this.handleClose}>
            {i18n.t("Start")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
