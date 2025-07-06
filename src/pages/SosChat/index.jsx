import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChatContainer,
  Header,
  BackButton,
  HeaderTitle,
  MainContent,
  LogoContainer,
  LogoText,
  Title,
  Description,
  RequestInfo,
  RequestTitle,
  RequestMeta,
  RequestUser,
  KakaoButton,
  KakaoIcon,
  InfoText
} from './SosChatStyles.js';

const SosChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = location.state?.request;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleKakaoClick = () => {
    // 실제 카카오톡 오픈채팅방 링크로 교체해주세요
    // 예: https://open.kakao.com/o/gXXXXXXXx
    const kakaoOpenChatLink = 'https://open.kakao.com/o/gXXXXXXXx';
    
    // 알림 메시지 (실제 링크 설정 전까지 임시)
    alert('카카오톡 오픈채팅방 링크를 설정해주세요!\n\n코드에서 handleKakaoClick 함수의 kakaoOpenChatLink 변수를 실제 오픈채팅방 링크로 교체하세요.');
    
    // 실제 사용할 때는 아래 주석을 해제하고 위의 alert는 제거하세요
    // window.open(kakaoOpenChatLink, '_blank');
  };

  return (
    <ChatContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../assets/images/back.png')} alt="뒤로가기" />
        </BackButton>
      </Header>

      <MainContent>
        <HeaderTitle>
          <img src={require('../../assets/images/bell.png')} alt="SOS" />
          SOS 요청
        </HeaderTitle>

        {request ? (
          <>
            <RequestInfo>
              <RequestTitle>
                <LogoContainer>
                   <img src={require('../../assets/images/user1.png')} alt="userprofile" />
                </LogoContainer>
                <span>{request.title}</span>
              </RequestTitle>
              <RequestMeta>
                <img src={require('../../assets/images/mappoint.png')} alt="Map Point" />
                <span> {request.location}</span>
                <img src={require('../../assets/images/clockpoint.png')} alt="Clock" />
                <span>{request.time}</span>
                요청자: {request.userName}
              </RequestMeta>
            </RequestInfo>
          </>
        ) : (
          <>
            <Title>도움을 요청하세요!</Title>
            <Description>
              카카오톡 오픈채팅으로 연결하여<br />
              실시간으로 도움을 받아보세요
            </Description>
          </>
        )}

        <KakaoButton onClick={handleKakaoClick}>
          오픈채팅방 입장하기
        </KakaoButton>
      </MainContent>
    </ChatContainer>
  );
};

export default SosChatPage; 