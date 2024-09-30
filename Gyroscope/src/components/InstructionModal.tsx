import React, { useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import { Row, Col, Button } from "react-bootstrap"
import "../containers/layout.css"
import i18n from "../i18n"
 
const InstructionModal = ({...props}) => {

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        props.onHide()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [props.message]);

  return (
    <Modal  className="modal"{...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered={true}>
      <Modal.Header closeButton={true} onClick={props.onHide} >
        <Modal.Title>mindLamp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <p>{props.message}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div className="m-0">       
          <Button variant="primary" className="btn-small-size w-87 me-4 btn pe-0 ps-0" onClick={props.onHide}>
          {i18n.t("OK")}
          </Button>          
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default InstructionModal
