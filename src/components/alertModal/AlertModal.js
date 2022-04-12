import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "../../styles/bootstrap.scss";

function AlertModal({ openAlertModal, setOpenAlertModal, message, data }) {
  const { name, number, tittle } = data;
  return (
    <Modal
      isOpen={openAlertModal}
      toggle={() => setOpenAlertModal(!openAlertModal)}
    >
      <ModalHeader>{tittle} Contact</ModalHeader>
      <ModalBody>
        <div className="deleted-message">{message}</div>
        <div className="deleted-contact">
          contact name : <span>{`  ${name}`}</span>
        </div>
        <div className="deleted-contact">
          contact number: <span>{`  ${number}`}</span>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default AlertModal;
