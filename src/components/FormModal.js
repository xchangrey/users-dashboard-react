import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


const FormModal = ({ children, handleToggleModal, showModal }) => (
  <div>
    <Modal
      isOpen={showModal}
      onRequestClose={handleToggleModal}
      contentLabel="User Information"
    >
      <button className="close-button" onClick={handleToggleModal}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h2 className='modal-title'>User Information</h2>
      {children}
    </Modal>
  </div>
);

Modal.setAppElement('#root');

export default FormModal;