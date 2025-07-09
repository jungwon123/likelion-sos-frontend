import React, { useState } from 'react';
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
  flex: 1;
`;

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #ffffff;
  font-size: 14px;
`;

const MetaIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ModalMessage = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 25px;
  padding: 15px;
  background: rgb(245, 186, 118);
  border-radius: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: ${props => props.variant === 'danger' ? '#ff4444' : '#007bff'};
  color: white;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ChatLinkButton = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 15px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const ConfirmContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 300px;
  width: 90%;
  text-align: center;
`;

const ConfirmTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 16px 0;
`;

const ConfirmMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.4;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  background: ${props => props.variant === 'danger' ? '#ff4444' : '#6c757d'};
  color: white;
  
  &:hover {
    opacity: 0.8;
  }
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
  rewardPoints = 10,
  // SOS 상세 정보용 props
  requestData = null,
  currentUser = null,
  onEdit = null,
  onDelete = null,
  onComplete = null
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen) return null;

  // 성공 모달 렌더링
  if (isSuccessModal) {
    return (
      <ModalOverlay onClick={onClose}>
        <SuccessModalContent onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
          <SuccessIcon>
            <img src={require(`../assets/images/cele.png`)} alt="Success" />
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

  // 작성자 여부 확인
  const isAuthor = currentUser?.nickname === userName;
  console.log('=== Modal 작성자 확인 ===');
  console.log('currentUser:', currentUser);
  console.log('currentUser?.nickname:', currentUser?.nickname);
  console.log('userName:', userName);
  console.log('isAuthor:', isAuthor);
  console.log('========================');
  // 삭제 확인 모달
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteExecute = () => {
    if (onDelete) {
      onDelete(requestData?.id);
    }
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleChatClick = () => {
    if (requestData?.openChatUrl) {
      window.open(requestData.openChatUrl, '_blank');
    }

  };

  // SOS 완료처리 핸들러
  const handleCompleteClick = () => {
    if (onComplete) {
      onComplete(requestData);
    }
    onClose();
  };

  // 기본 모달 렌더링
  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
          
          <ModalUserInfo>
            <ModalUserIcon>
              <img src={require(`../assets/images/${userImage}`)} alt="User Icon" />
            </ModalUserIcon>
            <ModalUserName>{userName}</ModalUserName>
            
          </ModalUserInfo>

          {/* 작성자일 경우 수정/삭제 버튼 */}
          {isAuthor && (onEdit || onDelete) && (
            <ActionButtons>
              {onEdit && (
                <ActionButton onClick={() => onEdit(requestData)}>
                  수정
                </ActionButton>
              )}
              {onDelete && (
                <ActionButton variant="danger" onClick={handleDeleteConfirm}>
                  삭제
                </ActionButton>
              )}
            </ActionButtons>
          )}

          {/* 제목 표시 */}
          {requestData?.title && (
            <ModalTitle>{requestData.title}</ModalTitle>
          )}

          

          {/* 내용 */}
          <ModalMessage>{message}</ModalMessage>


          {/* 도움 버튼 - 작성자가 아닌 경우에만 표시 */}
          {!isAuthor && (
            <ModalButtonContainer>
              <ModalButton onClick={onButtonClick} disabled={buttonDisabled}>
                {buttonText}
              </ModalButton>
            </ModalButtonContainer>
          )}

          {/* SOS 완료처리 버튼 - 작성자인 경우에만 표시 */}
          {isAuthor && onComplete && (
            <ModalButtonContainer>
              <ModalButton onClick={handleCompleteClick}>
                SOS 완료처리
              </ModalButton>
            </ModalButtonContainer>
          )}
        </ModalContent>
      </ModalOverlay>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <ConfirmModal>
          <ConfirmContent>
            <ConfirmTitle>게시물 삭제</ConfirmTitle>
            <ConfirmMessage>정말로 이 게시물을 삭제하시겠습니까?</ConfirmMessage>
            <ConfirmButtons>
              <ConfirmButton variant="danger" onClick={handleDeleteExecute}>
                삭제
              </ConfirmButton>
              <ConfirmButton onClick={() => setShowDeleteConfirm(false)}>
                취소
              </ConfirmButton>
            </ConfirmButtons>
          </ConfirmContent>
        </ConfirmModal>
      )}
    </>
  );
};

export default Modal; 