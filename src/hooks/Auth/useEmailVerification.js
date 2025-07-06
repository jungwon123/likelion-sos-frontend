import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useEmailVerification = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // localStorage에서 이메일 인증 상태 확인
  useEffect(() => {
    const emailVerified = localStorage.getItem('emailVerified');
    const verifiedEmail = localStorage.getItem('verifiedEmail');
    
    if (emailVerified === 'true') {
      setIsEmailVerified(true);
    }
    
    // cleanup 함수 명시적으로 반환
    return () => {
      // cleanup 로직이 필요한 경우 여기에 추가
    };
  }, []);

  const startEmailVerification = (email, from = 'signup') => {
    if (!email) {
      throw new Error('이메일을 입력해주세요.');
    }

    // 이메일 인증 페이지로 이동 (API 호출은 이메일 인증 페이지에서)
    navigate(`/emailverification?from=${from}&email=${encodeURIComponent(email)}`);
  };

  const completeEmailVerification = (email) => {
    localStorage.setItem('emailVerified', 'true');
    localStorage.setItem('verifiedEmail', email);
    setIsEmailVerified(true);
  };

  const resetEmailVerification = () => {
    setIsEmailVerified(false);
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('verifiedEmail');
  };

  const clearEmailVerificationData = () => {
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('verifiedEmail');
  };

  return {
    isEmailVerified,
    isVerifying,
    setIsVerifying,
    startEmailVerification,
    completeEmailVerification,
    resetEmailVerification,
    clearEmailVerificationData
  };
}; 