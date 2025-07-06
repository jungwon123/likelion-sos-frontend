import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data = null) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    toggleModal
  };
}; 