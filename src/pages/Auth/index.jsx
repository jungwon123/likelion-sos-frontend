import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AlertModal from '../../components/AlertModal.jsx';
import {
  AuthContainer,
  WelcomeContainer,
  AppIcon,
  AppTitle,
  AppSubtitle,
  StartButton,
  LinkText
} from './AuthStyles.js';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const AuthPage = () => {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'signup', 'login'
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL 파라미터 확인하여 초기 단계 설정 및 이메일 인증 정보 처리
  React.useEffect(() => {
    const step = searchParams.get('step');
    const verified = searchParams.get('verified');
    const email = searchParams.get('email');
    const error = searchParams.get('error');
    
    if (step === 'signup') {
      setCurrentStep('signup');
      
      // 이메일 인증 결과 처리
      if (verified === 'true' && email) {
        // 인증 성공 정보를 localStorage에 저장
        localStorage.setItem('emailVerified', 'true');
        localStorage.setItem('verifiedEmail', email);
        setAlertMessage('이메일 인증이 완료되었습니다!\n이제 회원가입을 완료해주세요.');
        setShowAlertModal(true);
        
        // URL 파라미터 정리 (깔끔한 URL로 변경)
        navigate('/auth?step=signup', { replace: true });
      } else if (verified === 'false') {
        // 인증 실패 처리
        if (error === 'invalid_token') {
          setAlertMessage('유효하지 않은 인증 링크입니다.\n다시 시도해주세요.');
        } else {
          setAlertMessage('이메일 인증에 실패했습니다.\n다시 시도해주세요.');
        }
        setShowAlertModal(true);
        
        // URL 파라미터 정리
        navigate('/auth?step=signup', { replace: true });
      }
    }
  }, [searchParams, navigate]);

  const handleStart = () => {
    setCurrentStep('signup');
  };

  const handleGoToLogin = () => {
    setCurrentStep('login');
  };

  const handleGoToWelcome = () => {
    setCurrentStep('welcome');
  };

  // 웰컴 화면
  if (currentStep === 'welcome') {
    return (
      <AuthContainer className="welcome">
        <WelcomeContainer>
          <AppIcon src={require('../../assets/images/logo.png')} alt="App Icon" />
          <AppTitle>실시간 캠퍼스, 실시간 도움 요청 서비스</AppTitle>
          <AppSubtitle>
            같은 학교 학생들이 도움이 필요할 때<br/>
            도움을 요청하세요!
          </AppSubtitle>
          <StartButton onClick={handleStart}>
            시작하기
          </StartButton>
          <LinkText>
            이미 계정이 있나요? <span onClick={handleGoToLogin}>로그인</span>
          </LinkText>
        </WelcomeContainer>
        
        <AlertModal 
          isOpen={showAlertModal}
          message={alertMessage}
          iconSrc={null}
          iconAlt={null}
          onClose={() => setShowAlertModal(false)}
        />
      </AuthContainer>
    );
  }

  // 회원가입 화면
  if (currentStep === 'signup') {
    return <Signup onGoToLogin={handleGoToLogin} onGoBack={handleGoToWelcome} />;
  }

  // 로그인 화면
  return <Login onGoBack={handleGoToWelcome} />;
};

export default AuthPage; 