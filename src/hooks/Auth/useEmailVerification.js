import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useEmailVerification = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const navigate = useNavigate();

  // localStorage에서 이메일 인증 상태 확인 및 감지
  useEffect(() => {
    const checkEmailVerificationStatus = () => {
      const emailVerified = localStorage.getItem('emailVerified');
      const storedEmail = localStorage.getItem('verifiedEmail');
      
      if (emailVerified === 'true') {
        setIsEmailVerified(true);
        if (storedEmail) {
          setVerifiedEmail(storedEmail);
        }
      } else {
        setIsEmailVerified(false);
        setVerifiedEmail('');
      }
    };

    // 초기 확인
    checkEmailVerificationStatus();

    // localStorage 변화 감지
    const handleStorageChange = (e) => {
      if (e.key === 'emailVerified' || e.key === 'verifiedEmail') {
        checkEmailVerificationStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // cleanup 함수
    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
    setVerifiedEmail(email);
  };

  const resetEmailVerification = () => {
    setIsEmailVerified(false);
    setVerifiedEmail('');
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('verifiedEmail');
  };

  const clearEmailVerificationData = () => {
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('verifiedEmail');
    setIsEmailVerified(false);
    setVerifiedEmail('');
  };

  return {
    isEmailVerified,
    isVerifying,
    verifiedEmail,
    setIsVerifying,
    startEmailVerification,
    completeEmailVerification,
    resetEmailVerification,
    clearEmailVerificationData
  };
}; 