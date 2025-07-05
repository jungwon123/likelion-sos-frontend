import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  SubmitButton,
  LinkText
} from './AuthStyles.js';

const Login = ({ onGoBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    onGoBack();
  };

  const handleGoToForgotPassword = () => {
    navigate('/forgotpassword');
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
        
        <LinkText>
          비밀번호를 잊으셨나요? <span onClick={handleGoToForgotPassword}>비밀번호 찾기</span>
        </LinkText>
      </FormContainer>
      
      <AlertModal 
        isOpen={showAlertModal}
        message={alertMessage}
        iconSrc={null}
        iconAlt={null}
        onClose={() => setShowAlertModal(false)}
      />
    </AuthContainer>
  );
};

export default Login; 