/**
 * @file   InfoModal.tsx
 * @brief  Modal component which shows modal dialog for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import i18n from "./../../i18n";

const InfoModal = ({ ...props }: any) => {
  // Handles modal close
  const handleClose = () => {
    props.modalClose();
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
      <Modal.Body>{i18n.t(props.msg)}</Modal.Body>
      <Modal.Footer>        
        <Button variant="outline-secondary" onClick={handleClose}>
          {i18n.t("OK")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
