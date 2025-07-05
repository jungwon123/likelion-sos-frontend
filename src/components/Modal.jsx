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

// 성공 모달용 스타일
const SuccessModalContent = styled.div`
  background: #F9A42E;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 350px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SuccessTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
  line-height: 1.4;
  white-space: pre-line;
`;

const SuccessSubtitle = styled.div`
  font-size: 14px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  line-height: 1.4;
  white-space: pre-line;
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
  buttonVariant = 'primary',
  // 성공 모달용 props
  isSuccessModal = false,
  successTitle,
  successSubtitle,
  helperNickname,
  rewardPoints = 10
}) => {
  if (!isOpen) return null;

  // 성공 모달 렌더링
  if (isSuccessModal) {
    return (
      <ModalOverlay onClick={onClose}>
        <SuccessModalContent onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
          <SuccessIcon>
            <img src={require(`../public/images/cele.png`)} alt="Success" />
          </SuccessIcon>
          <SuccessTitle>
            {successTitle || "SOS 완료 등록 및\n도움 처리가 완료되었습니다!"}
          </SuccessTitle>
          <SuccessSubtitle>
            {successSubtitle || `${helperNickname}님에게\nSOS 포인트 ${rewardPoints}점을 보냈습니다!`}
          </SuccessSubtitle>
        </SuccessModalContent>
      </ModalOverlay>
    );
  }

  // 기본 모달 렌더링
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