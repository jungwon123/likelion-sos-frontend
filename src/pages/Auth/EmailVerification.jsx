import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertModal from '../../components/AlertModal.jsx';
import { verifyEmail, sendEmailVerification, requestPasswordReset } from '../../services/authService.js';
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
  const token = searchParams.get('token'); // URL에서 전달받은 토큰
  const [email, setEmail] = useState(emailFromUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleBackClick = () => {
    if (fromPage === 'signup') {
      navigate('/auth?step=signup');
    } else if (fromPage === 'forgot') {
      navigate('/forgotpassword');
    } else {
      navigate(-1);
    }
  };

  // 토큰 기반 이메일 인증 처리
  useEffect(() => {
    const handleTokenVerification = async () => {
      if (token) {
        setIsLoading(true);
        try {
          const result = await verifyEmail(token);
          
          if (result.success) {
            setIsVerified(true);
            setAlertMessage(result.message); // "이메일 인증 완료!"
            setShowAlertModal(true);
            
            // 인증 성공 시 상태 저장
            localStorage.setItem('emailVerified', 'true');
            if (emailFromUrl) {
              localStorage.setItem('verifiedEmail', emailFromUrl);
            }
            
            // 2초 후 적절한 페이지로 이동
            setTimeout(() => {
              if (fromPage === 'signup') {
                navigate('/auth?step=signup');
              } else {
                // 비밀번호 찾기 플로우: token과 email을 포함해서 이동
                navigate(`/passwordreset?token=${encodeURIComponent(token)}&email=${encodeURIComponent(emailFromUrl)}`);
              }
            }, 2000);
          } else {
            setAlertMessage(result.message); // "유효하지 않은 토큰입니다."
            setShowAlertModal(true);
          }
        } catch (error) {
          setAlertMessage('인증 처리 중 오류가 발생했습니다.');
          setShowAlertModal(true);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    handleTokenVerification();
  }, [token, fromPage, emailFromUrl, navigate]);

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
      let result;
      
      if (fromPage === 'forgot') {
        // 비밀번호 찾기 플로우: 비밀번호 재설정 메일 전송
        result = await requestPasswordReset(email);
      } else {
        // 회원가입 플로우: 이메일 인증 메일 전송
        result = await sendEmailVerification(email);
      }
      
      if (result.success) {
        setAlertMessage(result.message);
        setShowAlertModal(true);
      } else {
        setAlertMessage(result.message);
        setShowAlertModal(true);
      }
    } catch (error) {
      setAlertMessage('요청 처리 중 오류가 발생했습니다.');
      setShowAlertModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../assets/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>캠퍼스 SOS</HeaderTitle>
      </Header>
      
      <FormContainer>
        <FormTitle>이메일 인증</FormTitle>
        
        {token ? (
          // 토큰이 있는 경우 - 자동 인증 처리
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            {isLoading ? (
              <p style={{ fontSize: '16px', color: '#666' }}>
                이메일 인증 처리 중...
              </p>
            ) : (
              <p style={{ fontSize: '16px', color: '#666' }}>
                {isVerified ? '이메일 인증이 완료되었습니다!' : '인증 처리가 완료되었습니다.'}
              </p>
            )}
          </div>
        ) : (
          // 토큰이 없는 경우 - 이메일 입력 폼
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
        )}
      </FormContainer>
      
      <AlertModal 
        isOpen={showAlertModal}
        message={alertMessage}
        iconSrc={alertMessage === '이메일 인증 완료!' ? 'checkcircle.png' : null}
        iconAlt={alertMessage === '이메일 인증 완료!' ? 'checkcircle' : null}
        layout="horizontal"
        onClose={() => setShowAlertModal(false)}
      />
    </AuthContainer>
  );
};

export default EmailVerification; 