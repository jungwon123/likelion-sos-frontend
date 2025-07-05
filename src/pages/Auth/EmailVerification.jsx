import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertModal from '../../components/AlertModal.jsx';
import {
  AuthContainer,
  Header,
  BackButton,
  HeaderTitle,
  FormContainer,
  FormTitle,
  InputGroup,
  InputLabel,
  StyledInput,
  ConditionalButton
} from './AuthStyles.js';

// EmailVerification 전용 스타일 (별도로 필요한 경우만)
const EmailInputGroup = {
  ...InputGroup,
  marginBottom: '40px' // EmailVerification만의 특별한 간격
};

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get('from'); // 'signup' 또는 'forgot'
  const emailFromUrl = searchParams.get('email'); // URL에서 전달받은 이메일
  const [email, setEmail] = useState(emailFromUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleBackClick = () => {
    if (fromPage === 'signup') {
      navigate('/auth?step=signup');
    } else if (fromPage === 'forgot') {
      navigate('/forgotpassword');
    } else {
      navigate(-1);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setAlertMessage('이메일을 입력해주세요');
      setShowAlertModal(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // 이메일 인증 로직 시뮬레이션
      setTimeout(() => {
        setIsLoading(false);
        setAlertMessage('이메일 인증이 완료되었습니다');
        setShowAlertModal(true);
        
        // 플로우에 따라 다른 페이지로 이동
        setTimeout(() => {
          if (fromPage === 'signup') {
            // 회원가입 플로우: 이메일 인증 완료 상태를 저장하고 회원가입 화면으로 돌아가기
            localStorage.setItem('emailVerified', 'true');
            localStorage.setItem('verifiedEmail', email);
            navigate('/auth?step=signup');
          } else {
            // 비밀번호 찾기 플로우: 비밀번호 재설정 페이지로 이동
            navigate('/passwordreset');
          }
        }, 2000);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setAlertMessage('인증 요청에 실패했습니다');
      setShowAlertModal(true);
    }
  };

  return (
    <AuthContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../public/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>캠퍼스 SOS</HeaderTitle>
      </Header>
      
      <FormContainer>
        <FormTitle>이메일 인증</FormTitle>
        
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>이메일</InputLabel>
            <StyledInput
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </InputGroup>
          
          <ConditionalButton 
            type="submit" 
            disabled={isLoading || !email}
          >
            {isLoading ? '인증하는 중...' : '인증하기'}
          </ConditionalButton>
        </form>
      </FormContainer>
      
      <AlertModal 
        isOpen={showAlertModal}
        message={alertMessage}
        iconSrc={alertMessage === '이메일 인증이 완료되었습니다' ? 'checkcircle.png' : null}
        iconAlt={alertMessage === '이메일 인증이 완료되었습니다' ? 'checkcircle' : null}
        layout="horizontal"
        onClose={() => setShowAlertModal(false)}
      />
    </AuthContainer>
  );
};

export default EmailVerification; 