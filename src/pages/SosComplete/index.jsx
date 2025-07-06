import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import { useUserState } from '../../hooks/state/useUserState.js';
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

      // SOS 완료 시 포인트 증가 (10점 추가)
      const rewardPoints = 10;
      addSosPoint(rewardPoints);

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