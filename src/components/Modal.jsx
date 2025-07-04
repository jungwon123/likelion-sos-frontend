import React from 'react';
import styled from 'styled-components';

// 모달 관련 스타일 컴포넌트들
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 350px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  
  &:hover {
    color: #333;
  }
`;

const ModalUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const ModalUserIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ModalUserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ModalMessage = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
`;

const ModalButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background: ${props => props.variant === 'success' ? '#28a745' : '#C57658'};
  color: white;
  
  &:hover {
    background: ${props => props.variant === 'success' ? '#218838' : '#e6850a'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

const Modal = ({
  isOpen,
  onClose,
  userName,
  userImage = 'user1.png',
  message,
  buttonText,
  onButtonClick,
  buttonDisabled = false,
  buttonVariant = 'primary'
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        <ModalUserInfo>
          <ModalUserIcon>
            <img src={require(`../public/images/${userImage}`)} alt="User Icon" />
          </ModalUserIcon>
          <ModalUserName>{userName}</ModalUserName>
        </ModalUserInfo>
        <ModalMessage>
          {message}
        </ModalMessage>
        <ModalButton 
          onClick={onButtonClick}
          disabled={buttonDisabled}
          variant={buttonVariant}
        >
          {buttonText}
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal; 