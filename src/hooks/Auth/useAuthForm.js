import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../state/useUserState.js';
import { sendEmailVerification, completeRegistration, login as apiLogin } from '../../services/authService.js';

export const useAuthForm = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const { login: recoilLogin } = useUserState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setShowAlertModal(true);
  };

  const hideAlert = () => {
    setShowAlertModal(false);
    setAlertMessage('');
  };

  const validateEmail = (email) => {
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity();
      return false;
    }
    return true;
  };

  const login = async (onSuccess) => {
    setIsLoading(true);
    try {
      // 로그인 API 호출
      const result = await apiLogin({
        email: formData.email,
        password: formData.password,
      });
      
      if (result.success) {
        // API 응답에서 사용자 데이터 생성
        const userData = {
          id: Date.now(), // 임시 ID (실제로는 API에서 받아와야 함)
          nickname: result.data.nickname,
          email: formData.email,
          sosPoint: result.data.sospiont, // API에서 받아온 포인트
          level: result.data.level, // API에서 받아온 레벨
        };
        
        const tokenData = {
          token: 'dummy-jwt-token', // 실제로는 API에서 받아와야 함
          refreshToken: 'dummy-refresh-token',
        };
        
        // Recoil 상태 업데이트
        recoilLogin(userData, tokenData);
        
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/main');
        }
      } else {
        showAlert(result.message); // "이메일 또는 비밀번호가 틀렸습니다."
      }
    } catch (error) {
      showAlert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (isEmailVerified, onSuccess) => {
    if (!isEmailVerified) {
      showAlert('이메일 인증을 완료해주세요');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      showAlert('비밀번호가 일치하지 않습니다');
      return;
    }
    
    setIsLoading(true);
    try {
      // 회원가입 완료 API 호출
      const result = await completeRegistration({
        password: formData.password,
        nickname: formData.nickname,
      });
      
      if (result.success) {
        showAlert(result.message); // "회원가입 완료!"
        
        setTimeout(() => {
          if (onSuccess) onSuccess();
          setFormData({ ...formData, password: '', confirmPassword: '' });
        }, 2000);
      } else {
        showAlert(result.message); // "이메일 인증이 필요합니다."
      }
    } catch (error) {
      showAlert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const requestEmailVerification = async (email) => {
    setIsLoading(true);
    try {
      // 이메일 인증 메일 전송 API 호출
      const result = await sendEmailVerification(email);
      
      if (result.success) {
        showAlert(result.message); // "인증 메일을 보냈습니다. 메일함을 확인해주세요."
      } else {
        showAlert(result.message); // "이미 가입된 이메일입니다."
      }
    } catch (error) {
      showAlert('이메일 인증 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    showAlertModal,
    alertMessage,
    handleInputChange,
    showAlert,
    hideAlert,
    validateEmail,
    login,
    signup,
    requestEmailVerification
  };
}; 