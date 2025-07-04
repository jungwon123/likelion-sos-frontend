import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatContainer = styled.div`
  min-height: 100vh;
  background: rgb(255, 255, 255);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #FF9500;
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 29px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
padding-bottom: 50px;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;

const MainContent = styled.main`
flex: 1;
  background: #FF9500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  background: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.4;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 40px;
  max-width: 320px;
  text-align: center;
`;

const RequestInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-bottom: 30px;
  max-width: 320px;
    min-height: 350px;
  gap: 40px;

  border: 1px solid #e9ecef;
`;

const RequestTitle = styled.div`
display: flex;
align-items: center;
justify-content: center;
  flex-direction: column;

  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const RequestMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  color: #666;
  margin-bottom: 8px;
   img {
    width: 15px;
    height: 15px;
    object-fit: contain;
  }
`;

const RequestUser = styled.div`
  font-size: 14px;
  color: #999;
`;

const KakaoButton = styled.button`
  background: #ffffff;
  color: #FF9500;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(254, 229, 0, 0.4);
  
  &:hover {
    background: #F9DD00;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(254, 229, 0, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const KakaoIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #191919;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FEE500;
  font-size: 12px;
  font-weight: bold;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #999;
  margin-top: 20px;
  line-height: 1.4;
`;

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
          <img src={require('../../public/images/back.png')} alt="뒤로가기" />
        </BackButton>
      </Header>

      <MainContent>
        <HeaderTitle>
          <img src={require('../../public/images/bell.png')} alt="SOS" />
          SOS 요청
        </HeaderTitle>

     

        {request ? (
          <>
            <RequestInfo>
                
              <RequestTitle>
                <LogoContainer>
                   <img src={require('../../public/images/user1.png')} alt="userprofile" />
                </LogoContainer>
                    <span>{request.title}</span>
              </RequestTitle>
              <RequestMeta>
              <img src={require('../../public/images/mappoint.png')} alt="Map Point" />
                <span> {request.location}</span>
                <img src={require('../../public/images/clockpoint.png')} alt="Clock" />
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