import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MobileContainer, MobileFlex, MobileButton, MobileInput } from '../../components/MobileLayout.jsx';

const AuthContainer = styled(MobileContainer)`
  background: #f8f9fa;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 10;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

// 웰컴 화면 컴포넌트들
const WelcomeContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 300px;
`;

const AppIcon = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  margin-bottom: 20px;
`;

const AppTitle = styled.h1`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
`;

const AppSubtitle = styled.p`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin: 0 0 40px 0;
`;

const StartButton = styled(MobileButton)`
  background: #FF9500E8;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  
  &:hover {
    background: #e6850a;
  }
`;

// 폼 화면 공통 컴포넌트들
const FormContainer = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 20px;
`;

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const FormSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 0 0 40px 0;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const StyledInput = styled(MobileInput)`
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    border-color: #FF9500E8;
  }
`;

const SubmitButton = styled(MobileButton)`
  background: #FF9500E8;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  
  &:hover {
    background: #e6850a;
  }
  
  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #666;
  
  span {
    color: #FF9500E8;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
    
    &:hover {
      color: #e6850a;
    }
  }
`;

const AuthPage = () => {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'signup', 'login'
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStart = () => {
    setCurrentStep('signup');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    setIsLoading(true);
    
    // 실제 회원가입 로직
    setTimeout(() => {
      setIsLoading(false);
      alert('회원가입이 완료되었습니다!');
      setCurrentStep('login');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    }, 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 실제 로그인 로직
    setTimeout(() => {
      setIsLoading(false);
      navigate('/main');
    }, 2000);
  };

  const handleBack = () => {
    if (currentStep === 'signup') {
      setCurrentStep('welcome');
    } else if (currentStep === 'login') {
      setCurrentStep('signup');
    }
  };

  const handleGoToLogin = () => {
    setCurrentStep('login');
  };

  // 웰컴 화면
  if (currentStep === 'welcome') {
    return (
      <AuthContainer>
        <WelcomeContainer>
          <AppIcon src={require('../../public/images/logo.png')} alt="App Icon" />
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
      </AuthContainer>
    );
  }

  // 회원가입 화면
  if (currentStep === 'signup') {
    return (
      <AuthContainer>
        {currentStep !== 'welcome' && (
          <BackButton onClick={handleBack}>
            <img src={require('../../public/images/back.png')} alt="뒤로가기" />
          </BackButton>
        )}
        <FormContainer>
          <FormTitle>안녕하세요!!<br/>학교 이메일 가입해주세요.</FormTitle>
          
          <form onSubmit={handleSignup}>
            <InputGroup>
              <InputLabel>학교 이메일</InputLabel>
              <StyledInput
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <InputLabel>이름</InputLabel>
              <StyledInput
                type="text"
                name="name"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <InputLabel>비밀번호</InputLabel>
              <StyledInput
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
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
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? '가입 중...' : '회원가입 하기'}
            </SubmitButton>
          </form>
          
         
        </FormContainer>
      </AuthContainer>
    );
  }

  // 로그인 화면
  return (
    <AuthContainer>
      <BackButton onClick={handleBack}>
        <img src={require('../../public/images/back.png')} alt="뒤로가기" />
      </BackButton>
      <FormContainer>
        <FormTitle>안녕하세요!!<br/>학교 이메일로 로그인해주세요.</FormTitle>
        
        <form onSubmit={handleLogin}>
          <InputGroup>
            <InputLabel>학교 이메일</InputLabel>
            <StyledInput
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>비밀번호</InputLabel>
            <StyledInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </SubmitButton>
        </form>
      </FormContainer>
    </AuthContainer>
  );
};

export default AuthPage; 