import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';

const MainContainer = styled.div`
  min-height: 100vh;
  background:rgb(255, 255, 255);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  background: #FF9500;
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const LocationDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

const MainContent = styled.main`
  padding: 20px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const RequestCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #C57658;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border-radius: 10px;
  border: 1px solid #C57658;
  padding: 4px 8px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryIcon = styled.div`
display: flex;
gap: 8px;
padding: 4px 8px;
`;

const RequestContent = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const RequestTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const RequestDescription = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

const RequestMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  color: #999;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  img {
    width: 15px;
    height: 15px;
    object-fit: contain;
  }
`;

const HelpButton = styled.button`
  background: #C57658;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  float: right;
  
  &:hover {
    background: #e6850a;
  }
`;

const BottomButtons = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  display: flex;
  gap: 12px;
  padding: 20px;
  background: white;
`;

const BottomButton = styled.button`
  flex: 1;
  background: #FF9500;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #e6850a;
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #e9ecef;
    
    &:hover {
      background: #e9ecef;
    }
  }
`;



const MainPage = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('학산도서관');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [helpRequests] = useState([
    {
      id: 1,
      userName: '옆짚 마테우스',
      title: 'SOS : A4 용지 하나만 빌려주실 천사분을 찾습니다....',
      description: '내일 당장 빅데이터 프로그래밍 시험인데 집에서 스폰지를 못 씻어서 삐걱거리고 빨간주스는 SOS 포인트와 마이 포인트과 시 시계트리가 부족됩니다!',
      location: '이룸관 4층',
      time: '5분 전',
      category: '도움 고수'
    },
    {
      id: 2,
      userName: '인천대 차은우',
      title: 'SOS : 도서관 3층입니다... 노트북 충전기 한 번만 빌려주세요...',
      description: '노트북 배터리가 거의 다 되어가는데 충전기를 깜박하고 안 가져왔습니다. 30분 정도만 빌려주시면 감사하겠습니다.',
      location: '이룸관 3층',
      time: '10분 전',
      category: '학우 지킴이'
    },
    {
      id: 3,
      userName: '몬스터 재윤이',
      title: '너무 추워서 그런데 바람막이 빌려 주실 선생님 계실까요..?',
      description: '갑자기 날씨가 너무 추워져서 얇게 입고 나왔는데 감기 걸릴 것 같습니다. 바람막이나 겉옷 하나만 빌려주실 수 있나요?',
      location: '이룸관 2층',
      time: '1분 전',
      category: 'SOS 입문자'
    }
  ]);

  const handleHelpClick = (requestId) => {
    const selectedRequest = helpRequests.find(req => req.id === requestId);
    navigate('/chat', { state: { request: selectedRequest } });
  };

  const handleLocationClick = () => {
    // 드롭다운 기능은 나중에 구현
    console.log('드롭다운 클릭');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCardClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleModalHelpClick = () => {
    if (selectedRequest) {
      navigate('/chat', { state: { request: selectedRequest } });
      handleCloseModal();
    }
  };

  return (
    <MainContainer>
      <Header>
        <HeaderLeft>
          <Logo>캠퍼스 SOS</Logo>
          <LocationDropdown onClick={handleLocationClick}>
            <img style={{width: '24px', height: '24px'}} src={require('../../public/images/map.png')} alt="Map Point" />
            <span>{selectedLocation}</span>
            <img style={{width: '24px', height: '24px'}} src={require('../../public/images/arrowdown.png')} alt="Down" />
          </LocationDropdown>
        </HeaderLeft>
        <RefreshButton onClick={handleRefresh}>
          <img src={require('../../public/images/retry.png')} alt="Retry" />
        </RefreshButton>
      </Header>

      <MainContent>
        {helpRequests.map(request => (
          <RequestCard key={request.id} onClick={() => handleCardClick(request)}>
            <CardHeader>
              <UserInfo>
                  <UserProfile>
                    <UserIcon>
                      <img src={require('../../public/images/user1.png')} alt="User Icon" />
                    </UserIcon>
                    <UserName>{request.userName}</UserName>
                  </UserProfile>
                  <CategoryIcon>
                    {request.category}
                    <img style={{width: '24px', height: '24px'}} src={require('../../public/images/reward1.png')} alt="User Icon" />
                  </CategoryIcon> {/* 카테고리 아이콘 추가  유저 점수에 따라 변경 */}
              </UserInfo>
            </CardHeader>
            
            <RequestContent>
              <RequestTitle>{request.title}</RequestTitle>
              <RequestMeta>
                <MetaItem>
                  <img src={require('../../public/images/mappoint.png')} alt="Map Point" />
                  {request.location}
                  <img src={require('../../public/images/clockpoint.png')} alt="Clock" />
                  {request.time}
                </MetaItem>
                <HelpButton onClick={(e) => {
                  e.stopPropagation();
                  handleHelpClick(request.id);
                }}>
              도와줄게요
            </HelpButton>
              </RequestMeta>
            </RequestContent>
            
           
            <div style={{ clear: 'both' }}></div>
          </RequestCard>
        ))}
      </MainContent>

      <BottomButtons>
        <BottomButton onClick={() => navigate('/sosrequest')}>
          + SOS 요청하기
        </BottomButton>
        <BottomButton className="secondary" onClick={() => navigate('/mypage')}>
          마이페이지
        </BottomButton>
      </BottomButtons>
      
      <Modal
        isOpen={isModalOpen && selectedRequest}
        onClose={handleCloseModal}
        userName={selectedRequest?.userName || ''}
        userImage="user1.png"
        message={selectedRequest?.description || ''}
        buttonText="도와줄게요"
        onButtonClick={handleModalHelpClick}
        buttonDisabled={false}
        buttonVariant="primary"
      />
    </MainContainer>
  );
};

export default MainPage;