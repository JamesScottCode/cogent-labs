import React from 'react';
import styled from 'styled-components';
import { useModalStore } from '../../stores/layoutStore';
import { usePlacesStore } from '../../stores/placesStore';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 90vh;
  overflow-y: scroll;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h2`
  margin: 0;
`;

const ModalContainer: React.FC = () => {
  const { setSelectedRestaurant } = usePlacesStore();
  const { isOpen, modalContent, closeModal, title } = useModalStore();

  const handleClose = () => {
    closeModal(() => {
      setSelectedRestaurant(null);
    });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={() => handleClose()}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <CloseButton onClick={() => handleClose()}>&times;</CloseButton>
        {modalContent}
      </ModalCard>
    </ModalOverlay>
  );
};

export default ModalContainer;
