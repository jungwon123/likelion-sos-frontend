import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';

const SosCompleteContainer = styled.div`
  min-height: 100vh;
  background: #FBF4E8;
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #FBF4E8;
  color: black;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 100px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #ddd;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WelcomeMessage = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 10px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #FF9500;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #FF9500;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #FF9500;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background: #e6850a;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SosComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [helperNickname, setHelperNickname] = useState('');
  const [helpDetails, setHelpDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // MyPage에서 전달받은 SOS 요청 정보
  const requestData = location.state?.requestData || {};

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate('/mypage'); // MyPage로 돌아가기
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!helperNickname.trim()) {
      alert('도움준 사람의 닉네임을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제로는 API 호출하여 완료 처리
      console.log('SOS 완료 처리:', {
        requestId: requestData.id,
        helperNickname: helperNickname.trim(),
        helpDetails: helpDetails.trim(),
        requestData
      });

      // 성공 처리 - 모달 열기
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('SOS 완료 처리 오류:', error);
      alert('완료 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SosCompleteContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../public/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>SOS 완료 처리</HeaderTitle>
      </Header>

      <ContentContainer>
        <WelcomeMessage>
          지금 예갑니다!<br />
          도움을 잘 받으셨나요?<br />
          감사한 마음을 작점 표현해보세요~!!
        </WelcomeMessage>

        <form onSubmit={handleSubmit}>
          <FormSection>
            <div>
              <Label>도움 준 사람의 아이디를 입력해주세요.</Label>
              <Input
                type="text"
                value={helperNickname}
                onChange={(e) => setHelperNickname(e.target.value)}
                placeholder="아이디"
                required
              />
            </div>

            <div>
              <Label>도움 사항</Label>
              <TextArea
                value={helpDetails}
                onChange={(e) => setHelpDetails(e.target.value)}
                placeholder="어떤 SOS 상황에서 무슨 도움을 받았는지 적어주세요."
              />
            </div>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '처리 중...' : 'SOS 완료 등록'}
            </SubmitButton>
          </FormSection>
        </form>
      </ContentContainer>

      {/* 성공 모달 */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        isSuccessModal={true}
        helperNickname={helperNickname}
        rewardPoints={10}
      />
    </SosCompleteContainer>
  );
};

export default SosComplete; 