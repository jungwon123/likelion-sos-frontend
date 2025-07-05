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
  FormDescription,
  InputGroup,
  InputLabel,
  StyledInput,
  SubmitButton
} from './AuthStyles.js';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/auth');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setAlertMessage('이메일을 입력해주세요.');
      setShowAlertModal(true);
      return;
    }

    if (!email.includes('@')) {
      setAlertMessage('올바른 이메일 형식을 입력해주세요.');
      setShowAlertModal(true);
      return;
    }

    setIsLoading(true);
    navigate(`/emailverification?from=forgot&email=${encodeURIComponent(email)}`);

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
        <FormTitle>비밀번호 찾기</FormTitle>
        <FormDescription>
          비밀번호를 잊으셨나요?<br/>
          이메일을 적어주세요.
        </FormDescription>
        
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>학교 이메일</InputLabel>
            <StyledInput
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </InputGroup>
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '이메일 발송 중...' : '비밀번호 찾기'}
          </SubmitButton>
        </form>
      </FormContainer>
    
    </AuthContainer>
  );
};

export default ForgotPasswordPage; 