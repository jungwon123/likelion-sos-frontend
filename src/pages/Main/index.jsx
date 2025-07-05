import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import {
  MainContainer,
  Header,
  HeaderLeft,
  Logo,
  LocationDropdown,
  RefreshButton,
  MainContent,
  RequestCard,
  CardHeader,
  UserInfo,
  UserIcon,
  UserName,
  UserProfile,
  CategoryIcon,
  RequestContent,
  RequestTitle,
  RequestMeta,
  MetaItem,
  HelpButton,
  BottomButtons,
  BottomButton
} from './MainStyles.js';

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