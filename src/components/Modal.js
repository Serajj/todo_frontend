import React, { useState } from 'react';
import Modal from 'react-modal';
import Loader from './Loader';

const LoaderModal = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(props.isOpen);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}  className="seraj-modal" 
      shouldCloseOnOverlayClick={false} 
      shouldCloseOnEsc={false}
          >
        <Loader title= {props.title}/>
      </Modal>
    </div>
  );
};

export default LoaderModal;
