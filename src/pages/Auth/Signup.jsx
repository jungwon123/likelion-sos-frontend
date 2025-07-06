import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../components/AlertModal.jsx';
import { useAuthForm } from '../../hooks/Auth/useAuthForm.js';
import { useEmailVerification } from '../../hooks/Auth/useEmailVerification.js';
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
  EmailInputContainer,
  EmailInput,
  VerifyButton,
  SubmitButton
} from './AuthStyles.js';

const Signup = ({ onGoToLogin, onGoBack }) => {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    isLoading,
    showAlertModal,
    alertMessage,
    handleInputChange: handleFormInputChange,
    showAlert,
    hideAlert,
    validateEmail,
    signup
  } = useAuthForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });

  const {
    isEmailVerified,
    isVerifying,
    startEmailVerification,
    clearEmailVerificationData,
    resetEmailVerification
  } = useEmailVerification();

  // 페이지 로드 시 localStorage 확인
  useEffect(() => {
    const emailVerified = localStorage.getItem('emailVerified');
    const verifiedEmail = localStorage.getItem('verifiedEmail');
    
    if (emailVerified === 'true') {
      showAlert('이메일 인증이 완료되었습니다!\n이제 회원가입을 완료해주세요.');
      
      // 인증된 이메일 정보를 formData에 설정
      if (verifiedEmail) {
        setFormData(prev => ({ ...prev, email: verifiedEmail }));
      }
      
      // localStorage 정리
      clearEmailVerificationData();
    }
  }, [showAlert, setFormData, clearEmailVerificationData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 이메일이 변경되면 인증 상태 초기화
    if (name === 'email') {
      resetEmailVerification();
    }
    
    handleFormInputChange(e);
  };

  const handleEmailVerification = () => {
    try {
      if (!validateEmail(formData.email)) {
        return;
      }

      if (!formData.email) {
        showAlert('이메일을 입력해주세요.');
        return;
      }

      // 바로 이메일 인증 페이지로 이동 (API 호출은 이메일 인증 페이지에서)
      startEmailVerification(formData.email, 'signup');
    } catch (error) {
      showAlert(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(isEmailVerified, onGoToLogin);
  };

  const handleBack = () => {
    onGoBack();
  };

  return (
    <AuthContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <img src={require('../../assets/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>캠퍼스 SOS</HeaderTitle>
      </Header>
      
      <FormContainer>
        <FormTitle>안녕하세요!!<br/>학교 이메일로 가입해주세요.</FormTitle>
        
        <form onSubmit={handleSignup}>
          <InputGroup>
            <InputLabel>학교 이메일</InputLabel>
            <EmailInputContainer>
              <EmailInput
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <VerifyButton 
                type="button"
                onClick={handleEmailVerification}
                disabled={isVerifying || isEmailVerified}
                verified={isEmailVerified}
              >
                {isVerifying ? '인증 중' : isEmailVerified ? '완료' : '인증'}
              </VerifyButton>
            </EmailInputContainer>
          </InputGroup>
          
          <InputGroup>
            <InputLabel>비밀번호</InputLabel>
            <StyledInput
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>비밀번호 확인</InputLabel>
            <StyledInput
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>닉네임</InputLabel>
            <StyledInput
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          
          <SubmitButton type="submit" disabled={isLoading || !isEmailVerified}>
            {isLoading ? '가입 중...' : '회원가입'}
          </SubmitButton>
        </form>
      </FormContainer>
      
      <AlertModal 
        isOpen={showAlertModal}
        message={alertMessage}
        iconSrc={
          alertMessage === '인증 메일을 보냈습니다. 메일함을 확인해주세요.' ? 'mail.png' :
          alertMessage === '회원가입 완료!' ? 'checkcircle.png' :
          alertMessage === '이메일 인증이 완료되었습니다!\n이제 회원가입을 완료해주세요.' ? 'checkcircle.png' :
          null
        }
        iconAlt={
          alertMessage === '인증 메일을 보냈습니다. 메일함을 확인해주세요.' ? 'mail' :
          alertMessage === '회원가입 완료!' ? 'checkcircle' :
          alertMessage === '이메일 인증이 완료되었습니다!\n이제 회원가입을 완료해주세요.' ? 'checkcircle' :
          null
        }
        layout={alertMessage === '인증 메일을 보냈습니다. 메일함을 확인해주세요.' ? 'vertical' : 'horizontal'}
        onClose={hideAlert}
      />
    </AuthContainer>
  );
};

export default Signup; 