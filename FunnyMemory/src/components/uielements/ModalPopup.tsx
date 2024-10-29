import React, { useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import { Row, Col, Button } from "react-bootstrap"
import i18n from "../../i18n";
const ModalPopup = ({...props}) => {

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        props.handleConfirm()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [props.message]);

  return (
    <Modal  className="modal"{...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered={true} backdrop="static">
      <Modal.Header closeButton={true} onClick={props.onHide} >
        <Modal.Title className="modal-title">{props.action}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-4 pb-5">
        <Row>
          <Col md={12}>
            <p>{props.message}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div className="m-0">
        <Button variant="primary" className="btn-small-size w-87 pe-0 ps-0" onClick={props.handleConfirm}>
            {i18n.t("YES")}
          </Button>
          <Button variant="outline-secondary" className="btn-small-size w-87 me-4 btn pe-0 ps-0" onClick={props.onHide}>
          {i18n.t("NO")}
          </Button>          
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalPopup
