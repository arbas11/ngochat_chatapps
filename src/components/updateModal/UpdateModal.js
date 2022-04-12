import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function UpdateModal({
  whatToUpdate,
  openModal,
  setOpenModal,
  firstValue,
  setFirstValue,
  secondValue,
  setSecondValue,
  thirdValue,
  setThirdValue,
  handleFunction,
  data,
}) {
  return (
    <Modal isOpen={openModal} toggle={() => setOpenModal(!openModal)}>
      <ModalHeader>Update {data.tittle} data</ModalHeader>
      <ModalBody>
        <div className="search_wrap new-contact-input">
          <input
            type="text"
            placeholder={data.first}
            required
            onChange={(e) => setFirstValue(e.target.value)}
            value={firstValue ?? ""}
          />
        </div>
        {whatToUpdate === "user" && (
          <>
            <div className="search_wrap new-contact-input">
              <input
                type="text"
                placeholder={data.second}
                required
                onChange={(e) => setSecondValue(e.target.value)}
                value={secondValue ?? ""}
              />
            </div>
            <div className="search_wrap new-contact-input">
              <input
                type="text"
                placeholder={data.third}
                required
                onChange={(e) => setThirdValue(e.target.value)}
                value={thirdValue ?? ""}
              />
            </div>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          onClick={() => {
            handleFunction();
          }}
          className="btn btn-submit"
        >
          <span>update {data.tittle}</span>
        </button>
        <button
          onClick={() => {
            setOpenModal(false);
          }}
          className="btn btn-cancel"
        >
          <span>Cancel</span>
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateModal;
