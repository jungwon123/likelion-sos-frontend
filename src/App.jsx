import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Pages
import SplashPage from './pages/Splash/index.jsx';
import AuthPage from './pages/Auth/index.jsx';
import ForgotPasswordPage from './pages/Auth/ForgotPassword.jsx';
import EmailVerification from './pages/Auth/EmailVerification.jsx';
import PasswordReset from './pages/Auth/PasswordReset.jsx';
import MainPage from './pages/Main/index.jsx';
import MyPage from './pages/MyPage/index.jsx';
import SosRequestPage from './pages/SosRequest/index.jsx';
import SosChatPage from './pages/SosChat/index.jsx';
import SosCompletePage from './pages/SosComplete/index.jsx';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    height: 100%;
  }
  
  body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* 모바일 최적화 */
    max-width: 430px;
    margin: 0 auto;
    background-color: #f8f9fa;
    
    /* 데스크톱에서 모바일 뷰 시뮬레이션 */
    @media (min-width: 431px) {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
  }
  
  #root {
    height: 100%;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const AppContainer = styled.div`
  height: 100%;
  background-color: #f8f9fa;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Routes>
            {/* 기본 라우트 - 스플래쉬 페이지로 리다이렉트 */}
            <Route path="/" element={<Navigate to="/splash" replace />} />
            
            {/* 스플래쉬 페이지 */}
            <Route path="/splash" element={<SplashPage />} />
            
            {/* 로그인/회원가입 페이지 */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* 비밀번호 찾기 페이지 */}
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            
            {/* 이메일 인증 페이지 */}
            <Route path="/emailverification" element={<EmailVerification />} />
            
            {/* 비밀번호 재설정 페이지 */}
            <Route path="/passwordreset" element={<PasswordReset />} />
            
            {/* 메인 페이지 */}
            <Route path="/main" element={<MainPage />} />
            
            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />} />
            
            {/* SOS 요청 페이지 */}
            <Route path="/sosrequest" element={<SosRequestPage />} />
            
            {/* SOS 채팅 페이지 */}
            <Route path="/chat" element={<SosChatPage />} />
            
            {/* SOS 완료 처리 페이지 */}
            <Route path="/sos-complete" element={<SosCompletePage />} />
            
            {/* 404 페이지 - 메인으로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/main" replace />} />
          </Routes>
        </Router>
      </AppContainer>
    </>
  );
}

export default App;
