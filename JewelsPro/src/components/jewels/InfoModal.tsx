import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import i18n from "../../i18n";

interface Props {
  show: boolean;
  modalClose(status: boolean, point: number): void;
  msg: string;
  language: string;
}

interface State {
  showStatus: boolean;
}

export class InfoModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showStatus: this.props.show,
    };
  }

  handleClose = (status: boolean) => {
    this.setState({ showStatus: false });
    this.props.modalClose(status, 2);
  };

  render() {
    return (
      <Modal
        show={this.state.showStatus}
        onHide={() => this.handleClose(false)}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
      >
        <Modal.Header className="confirm-modal-header">
          <Modal.Title className="confirm-modal-title">
            {i18n.t("JEWELS")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="confirm-modal-body">
          {this.props.msg.split("\n").map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </Modal.Body>
        <Modal.Footer className="confirm-modal-footer">
          <Button
            className="confirm-modal-btn"
            onClick={() => this.handleClose(true)}
          >
            {i18n.t("Yes")}
          </Button>
          <Button
            className="confirm-modal-btn secondary"
            onClick={() => this.handleClose(false)}
          >
            {i18n.t("No")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
