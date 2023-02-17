import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CUSTOM_STYLES } from '../helpers/constants';

const FormModal = ({ children, handleToggleModal, showModal }) => (
  <div>
    <Modal
      isOpen={showModal}
      onRequestClose={handleToggleModal}
      contentLabel="User Information"
      style={CUSTOM_STYLES}
    >
      <button className="close-button" onClick={handleToggleModal}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      {children}
    </Modal>
  </div>
);

Modal.setAppElement('#root');

export default FormModal;