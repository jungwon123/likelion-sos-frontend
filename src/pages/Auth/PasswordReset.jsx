import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertModal from '../../components/AlertModal.jsx';
import { resetPassword } from '../../services/authService.js';
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

const PasswordReset = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleBackClick = () => {
    navigate('/forgotpassword');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.newPassword || !formData.confirmPassword) {
      setAlertMessage('모든 필드를 입력해주세요');
      setShowAlertModal(true);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setAlertMessage('비밀번호가 일치하지 않습니다');
      setShowAlertModal(true);
      return;
    }

    if (formData.newPassword.length < 6) {
      setAlertMessage('비밀번호는 6자 이상이어야 합니다');
      setShowAlertModal(true);
      return;
    }

    if (!token || !email) {
      setAlertMessage('비밀번호 재설정 정보가 올바르지 않습니다');
      setShowAlertModal(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // 비밀번호 재설정 API 호출
      const result = await resetPassword(email, token, formData.newPassword);
      console.log(result.message);

      if (result.message === '비밀번호가 성공적으로 변경되었습니다.') {
        setAlertMessage(result.message); // "비밀번호가 성공적으로 변경되었습니다."
        setShowAlertModal(true);
        // 성공 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/auth');
        }, 2000);
      } else {
        setAlertMessage(result.message); // "유효하지 않은 토큰입니다." 또는 "사용자를 찾을 수 없습니다."
        setShowAlertModal(true);
      }
    } catch (error) {
      setAlertMessage('비밀번호 변경 중 오류가 발생했습니다');
      setShowAlertModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.newPassword && formData.confirmPassword;

  return (
    <AuthContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../assets/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>캠퍼스 SOS</HeaderTitle>
      </Header>
      
      <FormContainer>
        <FormTitle>비밀번호 재설정</FormTitle>
        
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>새 비밀번호</InputLabel>
            <StyledInput
              type="password"
              name="newPassword"
              placeholder="새 비밀번호를 입력하세요"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>새 비밀번호 확인</InputLabel>
            <StyledInput
              type="password"
              name="confirmPassword"
              placeholder="새 비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
          
          <ConditionalButton 
            type="submit" 
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? '변경 중...' : '재설정하기'}
          </ConditionalButton>
        </form>
      </FormContainer>
      
      <AlertModal 
        isOpen={showAlertModal}
        message={alertMessage}
        iconSrc={alertMessage === '비밀번호가 성공적으로 변경되었습니다.' ? 'checkcircle.png' : null}
        iconAlt={alertMessage === '비밀번호가 성공적으로 변경되었습니다.' ? 'checkcircle' : null}
        layout="horizontal"
        onClose={() => setShowAlertModal(false)}
      />
    </AuthContainer>
  );
};

export default PasswordReset; 