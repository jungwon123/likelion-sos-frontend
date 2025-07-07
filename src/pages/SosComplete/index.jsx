import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import { useUserState } from '../../hooks/state/useUserState.js';
import { completeSosRequest } from '../../services/api.js';
import {
  SosCompleteContainer,
  Header,
  BackButton,
  HeaderTitle,
  ContentContainer,
  WelcomeMessage,
  FormSection,
  Label,
  Input,
  TextArea,
  SubmitButton
} from './SosCompleteStyles.js';

const SosComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [helperNickname, setHelperNickname] = useState('');
  const [helpDetails, setHelpDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Recoil 상태 관리
  const { addSosPoint, sosPoint } = useUserState();

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
      setErrorMessage('도움준 사람의 닉네임을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 실제 API 호출하여 완료 처리
      const completeData = {
        sosRequestId: requestData.id, // 마이페이지에서 전달받은 게시물 ID
        helperNickname: helperNickname.trim()
      };

      console.log('SOS 완료 처리 요청:', completeData);
      console.log('요청 데이터:', requestData);
      
      const response = await completeSosRequest(completeData);

      if (response === 'SOS 완료 처리가 성공적으로 되었습니다.') {
        console.log('SOS 완료 처리 성공:', response);
        
        // SOS 완료 시 포인트 증가 (10점 추가)
        const rewardPoints = 10;
        addSosPoint(rewardPoints);

        // 성공 처리 - 모달 열기
        setIsSuccessModalOpen(true);
      } else {
        setErrorMessage(response.message || '완료 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('SOS 완료 처리 오류:', error);
      
      // 에러 상태에 따른 메시지 처리
      if (error.response?.status === 401) {
        setErrorMessage('로그인이 필요합니다.');
      } else if (error.response?.status === 403) {
        setErrorMessage('본인이 작성한 요청만 완료할 수 있습니다.');
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('완료 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SosCompleteContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../assets/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>SOS 완료 처리</HeaderTitle>
      </Header>

      <ContentContainer>
        <WelcomeMessage>
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

            {/* 에러 메시지 표시 */}
            {errorMessage && (
              <div style={{ 
                color: '#ff4444', 
                fontSize: '14px', 
                textAlign: 'center',
                margin: '10px 0',
                padding: '10px',
                backgroundColor: '#fff0f0',
                borderRadius: '8px',
                border: '1px solid #ffcccc'
              }}>
                {errorMessage}
              </div>
            )}

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