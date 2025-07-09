import styled from 'styled-components';
import { MobileContainer, MobileButton, MobileInput } from '../../components/MobileLayout.jsx';

// 기본 Auth 컨테이너
export const AuthContainer = styled(MobileContainer)`
  background: #f8f9fa;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  &.welcome {
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
  }
`;

// 헤더 컴포넌트들
export const Header = styled.header`
  background: #f8f9fa;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 100px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #ddd;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 25px;
  font-weight: 600;
  color: #FF9500;
`;

// 폼 컨테이너 및 제목
export const FormContainer = styled.div`
  flex: 1;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const FormTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
  color: #333;
  margin: 0 0 40px 0;
  line-height: 1.4;
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 40px 0;
  line-height: 1.6;
`;

export const FormSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 40px 0;
  line-height: 1.4;
`;

// 입력 관련 컴포넌트들
export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
  padding-left: 7px;
`;

export const StyledInput = styled(MobileInput)`
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  
  &:focus {
    border-color: #FF9500;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

// 이메일 입력 관련 컴포넌트들
export const EmailInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const EmailInput = styled(StyledInput)`
  width: 100%;
  padding-right: 70px; // 버튼 공간 확보
`;

export const VerifyButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #FF9500;
  color: white;
  border: none;
  border-radius: 0;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  min-width: 50px;
  
  &:hover {
    background: #e6850a;
  }
  
  &:disabled {
    background: ${props => props.verified ? '#FF9500' : '#ccc'};
    cursor: not-allowed;
  }
`;

// 버튼 컴포넌트들
export const SubmitButton = styled(MobileButton)`
  background: #FF9500;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  margin-top: 40px;
  padding: 16px;
  border-radius: 0;
  
  &:hover {
    background: #e6850a;
  }
  
  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

// 조건부 활성화 버튼 (EmailVerification, PasswordReset용)
export const ConditionalButton = styled(MobileButton)`
  background: #ccc;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  margin-top: 40px;
  padding: 16px;
  border-radius: 0;
  color: white;
  
  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#FF9500'};
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  &:not(:disabled) {
    background: #FF9500;
    
    &:hover {
      background: #e6850a;
    }
  }
`;

// 링크 텍스트
export const LinkText = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #666;
  
  span {
    color: #FF9500;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
    
    &:hover {
      color: #e6850a;
    }
  }
`;

// 웰컴 화면 전용 컴포넌트들
export const WelcomeContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 320px;
  padding: 0 20px;
`;

export const AppIcon = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  margin-bottom: 20px;
`;

export const AppTitle = styled.h1`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
`;

export const AppSubtitle = styled.p`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin: 0 0 40px 0;
`;

export const StartButton = styled(MobileButton)`
  background: #FF9500;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 0;
  
  &:hover {
    background: #e6850a;
  }
`; 