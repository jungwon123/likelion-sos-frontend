import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 167px;
  height: 97px;
  background: #F9A42E;
  border: 1px solid #F9A42E;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 1;
  animation: fadeIn 0.3s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px;
  color: white;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  line-height: 1.4;
  flex-direction: ${props => props.layout === 'vertical' ? 'column' : 'row'};
`;

const AlertModal = ({ 
  isOpen, 
  message, 
  iconSrc,
  iconAlt,
  layout = 'horizontal', // 'horizontal' 또는 'vertical'
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalText layout={layout}>
          {iconSrc && (
            <img 
              style={{width: '20px', height: '20px'}} 
              src={require(`../public/images/${iconSrc}`)} 
              alt={iconAlt} 
            />
          )}
          {message}
        </ModalText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlertModal; 