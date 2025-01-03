/**
 * @file   InfoModal.tsx
 * @brief  Modal component which shows modal dialog for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import i18n from "../../i18n";

const AlertModal = ({ ...props }: any) => {
  // Handles modal close
  const handleClose = () => {
    props.close();
  };

  // Modal render function
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
      backdrop="static"
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>mindLamp</Modal.Title>
      </Modal.Header>
      <Modal.Body>Try again</Modal.Body>
      <Modal.Footer>        
        <Button variant="primary" className="btn-stop" onClick={handleClose}>
          {i18n.t("OK")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
