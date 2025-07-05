import React, { useState, useEffect } from 'react';
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
  EmailInputContainer,
  EmailInput,
  VerifyButton,
  SubmitButton
} from './AuthStyles.js';

const Signup = ({ onGoToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 페이지 로드 시 URL 파라미터와 localStorage 확인
  useEffect(() => {
    const emailVerified = localStorage.getItem('emailVerified');
    const verifiedEmail = localStorage.getItem('verifiedEmail');
    
    if (emailVerified === 'true') {
      setIsEmailVerified(true);
      setAlertMessage('이메일 인증이 완료되었습니다!\n이제 회원가입을 완료해주세요.');
      setShowAlertModal(true);
      
      // 인증된 이메일 정보를 formData에 설정
      if (verifiedEmail) {
        setFormData(prev => ({ ...prev, email: verifiedEmail }));
      }
      
      // localStorage 정리
      localStorage.removeItem('emailVerified');
      localStorage.removeItem('verifiedEmail');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 이메일이 변경되면 인증 상태 초기화
    if (name === 'email') {
      setIsEmailVerified(false);
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEmailVerification = async () => {
    // 이메일 input 요소를 찾아서 브라우저의 기본 validation 확인
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity(); // 브라우저 기본 validation 메시지 표시
      return;
    }

    if (!formData.email) {
      setAlertMessage('이메일을 입력해주세요.');
      setShowAlertModal(true);
      return;
    }

    navigate(`/emailverification?from=signup&email=${encodeURIComponent(formData.email)}`);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      setAlertMessage('이메일 인증을 완료해주세요');
      setShowAlertModal(true);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setAlertMessage('비밀번호가 일치하지 않습니다');
      setShowAlertModal(true);
      return;
    }
    
    setIsLoading(true);
    
    // 실제 회원가입 로직
    setTimeout(() => {
      setIsLoading(false);
      setAlertMessage('회원가입이 완료되었습니다!');
      setShowAlertModal(true);
      
      // 모달이 닫힌 후 로그인 화면으로 이동
      setTimeout(() => {
        onGoToLogin();
        setFormData({ ...formData, password: '', confirmPassword: '' });
      }, 2000);
    }, 2000);
  };

  const handleBack = () => {
    navigate('/auth');
  };

  return (
    <AuthContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <img src={require('../../public/images/back.png')} alt="뒤로가기" />
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
                placeholder="jj20505@gmail.com"
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
          alertMessage === '이메일로 인증 링크를 보냈습니다' ? 'mail.png' :
          alertMessage === '회원가입이 완료되었습니다!' ? 'checkcircle.png' :
          alertMessage === '이메일 인증이 완료되었습니다!\n이제 회원가입을 완료해주세요.' ? 'checkcircle.png' :
          null
        }
        iconAlt={
          alertMessage === '이메일로 인증 링크를 보냈습니다' ? 'mail' :
          alertMessage === '회원가입이 완료되었습니다!' ? 'checkcircle' :
          alertMessage === '이메일 인증이 완료되었습니다!\n이제 회원가입을 완료해주세요.' ? 'checkcircle' :
          null
        }
        layout={alertMessage === '이메일로 인증 링크를 보냈습니다' ? 'vertical' : 'horizontal'}
        onClose={() => setShowAlertModal(false)}
      />
    </AuthContainer>
  );
};

export default Signup; 