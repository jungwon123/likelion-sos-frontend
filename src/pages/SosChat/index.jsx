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
    if (request && request.openChatUrl) {
      // 게시물의 실제 오픈채팅 링크로 이동
      window.open(request.openChatUrl, '_blank');
    } else {
      // 오픈채팅 링크가 없는 경우 알림
      alert('오픈채팅방 링크가 설정되지 않았습니다.');
    }
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
                   <img style={{width: '130px', height: '130px'}} src={require('../../assets/images/user1.png')} alt="userprofile" />
                </LogoContainer>
                <div>
                  <span>{request.title}</span>
                </div>
              </RequestTitle>
              <RequestMeta>
                <img src={require('../../assets/images/mappoint.png')} alt="Map Point" />
                <span> {request.location}</span>
                <img style={{width: '10px', height: '10px'}} src={require('../../assets/images/clockpoint.png')} alt="Clock" />
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