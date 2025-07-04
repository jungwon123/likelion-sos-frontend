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
  background: #F9A42E;
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
  font-size: 40px;
  color: #000000;
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
  }
`;

const ModalUserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

const ModalMessage = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 25px;
  padding: 15px;
  background:rgb(245, 186, 118);
  border-radius: 10px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
     background: #C57658;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    float: right;
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
        <ModalButtonContainer>
          <ModalButton 
            onClick={onButtonClick}
            disabled={buttonDisabled}
            variant={buttonVariant}
          >
            {buttonText}
          </ModalButton>
        </ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal; 