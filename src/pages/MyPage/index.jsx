import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';

const MyPageContainer = styled.div`
  min-height: 100vh;
  background: #FBF4E8;
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #FBF4E8;
  color: black;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 100px;
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
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 27px;
  font-weight: 500;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  > *:not(:nth-child(2)) {
    margin: 0 20px;
  }
  
  > *:first-child {
    margin-top: 20px;
  }
  
  > *:last-child {
    margin-bottom: 20px;
  }
`;

const UserCard = styled.div`
  background: white;
  border: 2px solid #FF9500;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 12px;
  border-bottom: 1px solid #FF9500;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;

const UserStats = styled.div`
     display: flex;
    gap: 40px;
    padding: 10px 20px
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

const StatGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #666;
`;

const StatValue = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #000000;
`;

const LevelIcon = styled.div`
  width: 24px;
  height: 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const PointText = styled.span`
  font-size: 17px;
  color: #FF9500;
  font-weight: bold;
`;


const TabContainer = styled.div`
  display: flex;
  background: none;
  border-radius: 12px 12px 0 0;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 16px;
  background: none;
  color:${props => props.active ? '#FF9500' : '#9B9B9B'}; 
  border: none;
  border-bottom: ${props => props.active ? '2px solid #FF9500' : '1px solid #9B9B9B'};
  font-size: 17px;
  font-weight: ${props => props.active ? '700' : '600'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-sizing: border-box;
  

`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HistoryCard = styled.div`
  background: white;
  border: 2px solid #FF9500;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
  
  img {
    width: 12px;
    height: 12px;
    object-fit: contain;
  }
`;

const StatusButton = styled.button`
  background: #FF9500;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #e6850a;
  }
  
  &.completed {
    background: #28a745;
    
    &:hover {
      background: #218838;
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
  font-size: 16px;
  line-height: 1.5;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 16px;
  line-height: 1.5;
`;



const MyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sos');
  const [sosHistory, setSosHistory] = useState([]);
  const [helpHistory, setHelpHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 사용자 정보 (실제로는 API에서 받아올 데이터)
  const [userInfo] = useState({
    nickname: '자크 예가',
    sosPoints: 350 // 실제로는 API에서 받아올 포인트
    // 테스트용 포인트 값들:
    // sosPoints: 5    // Lv.1 신입 학우
    // sosPoints: 15   // Lv.2 SOS 입문자  
    // sosPoints: 45   // Lv.3 도움 고수
    // sosPoints: 75   // Lv.4 학우 지킴이
    // sosPoints: 350  // Lv.5 레전드 학우
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  // 포인트에 따른 레벨 계산 함수
  const getLevelInfo = (points) => {
    if (points >= 100) {
      return {
        level: 5,
        name: '레전드 학우',
        image: 'reward5.png'
      };
    } else if (points >= 60) {
      return {
        level: 4,
        name: '학우 지킴이',
        image: 'reward4.png'
      };
    } else if (points >= 30) {
      return {
        level: 3,
        name: '도움 고수',
        image: 'reward3.png'
      };
    } else if (points >= 10) {
      return {
        level: 2,
        name: 'SOS 입문자',
        image: 'reward2.png'
      };
    } else {
      return {
        level: 1,
        name: '신입 학우',
        image: 'reward1.png'
      };
    }
  };

  const currentLevelInfo = getLevelInfo(userInfo.sosPoints);

  // API 호출 함수
  const fetchSosHistory = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/mypage/sos', {
        method: 'GET',
        credentials: 'include', // 세션 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSosHistory(data.data);
      } else {
        setError(data.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('SOS 내역 조회 오류:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHelpHistory = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/mypage/help', {
        method: 'GET',
        credentials: 'include', // 세션 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 'success') {
        setHelpHistory(data.data);
      } else {
        setError(data.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('도움 내역 조회 오류:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 SOS 내역 로드
  useEffect(() => {
    fetchSosHistory();
  }, []);

  // 탭 변경 시 해당 데이터 로드
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'sos') {
      fetchSosHistory();
    } else {
      fetchHelpHistory();
    }
  };

  // 상태 텍스트 변환 함수
  const getStatusInfo = (requestStatus) => {
    if (requestStatus === '완료됨') {
      return { text: 'SOS 완료', className: 'completed' };
    }
    return { text: 'SOS 요청', className: '' };
  };

  // 카드 클릭 핸들러
  const handleCardClick = (request) => {
    // SOS 내역 탭에서만 모달 열기 (완료 처리 가능)
    if (activeTab === 'sos') {
      setSelectedRequest(request);
      setIsModalOpen(true);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // SOS 완료 처리 핸들러
  const handleCompleteRequest = async () => {
    try {
      // 실제로는 API 호출하여 완료 처리
      console.log('SOS 완료 처리:', selectedRequest);
      
      // 성공 후 상태 업데이트
      setSosHistory(prev => 
        prev.map(item => 
          item.id === selectedRequest.id 
            ? { ...item, requestStatus: '완료됨' }
            : item
        )
      );
      
      alert('SOS 요청이 완료 처리되었습니다!');
      handleCloseModal();
    } catch (error) {
      console.error('SOS 완료 처리 오류:', error);
      alert('완료 처리 중 오류가 발생했습니다.');
    }
  };

  const currentHistory = activeTab === 'sos' ? sosHistory : helpHistory;

  return (
    <MyPageContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../public/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>MY PAGE</HeaderTitle>
      </Header>

      <ContentContainer>
        <UserCard>
          <UserInfo>
            <UserAvatar>
              <img src={require('../../public/images/user1.png')} alt="User Profile" />
            </UserAvatar>
            <UserName>USER NAME : {userInfo.nickname}</UserName>
          </UserInfo>
          
          
                      <UserStats>
              <StatGroup>
                <StatLabel>My Level</StatLabel>
                <StatItem>
                  <LevelIcon>
                    <img src={require(`../../public/images/${currentLevelInfo.image}`)} alt={`Level ${currentLevelInfo.level}`} /> 
                  </LevelIcon>
                  <StatValue> : {currentLevelInfo.name}</StatValue>
                </StatItem>
              </StatGroup>
              
              <StatGroup>
                <StatLabel>My SOS Point</StatLabel>
                <StatItem>
                  <PointText>{userInfo.sosPoints} </PointText>
                  <PointText style={{ color: 'black'}}>SOS 포인트</PointText>
                </StatItem>
              </StatGroup>
            </UserStats>
        </UserCard>

        <TabContainer>
          <TabButton 
            active={activeTab === 'sos'} 
            onClick={() => handleTabChange('sos')}
          >
            나의 SOS 내역
          </TabButton>
          <TabButton 
            active={activeTab === 'help'} 
            onClick={() => handleTabChange('help')}
          >
            나의 도움 내역
          </TabButton>
        </TabContainer>

        {loading && (
          <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
        )}

        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}

        {!loading && !error && currentHistory.length === 0 && (
          <EmptyMessage>
            {activeTab === 'sos' ? '아직 SOS 요청 내역이 없습니다.' : '아직 도움 제공 내역이 없습니다.'}
          </EmptyMessage>
        )}

        {!loading && !error && currentHistory.length > 0 && (
          <CardList>
            {currentHistory.map((item, index) => {
              const statusInfo = getStatusInfo(item.requestStatus);
              return (
                <HistoryCard 
                  key={`${activeTab}-${index}`}
                  onClick={() => handleCardClick(item)}
                  style={{ cursor: activeTab === 'sos' ? 'pointer' : 'default' }}
                >
                  <CardTitle>{item.title}</CardTitle>
                  <CardMeta>
                    <MetaInfo>
                      <img src={require('../../public/images/mappoint.png')} alt="Location" />
                      <span>{item.building}</span>
                      <img src={require('../../public/images/clockpoint.png')} alt="Requester" />
                      <span>{item.requesterNickname}</span>
                    </MetaInfo>
                    <StatusButton className={statusInfo.className}>
                      {statusInfo.text}
                    </StatusButton>
                  </CardMeta>
                </HistoryCard>
              );
            })}
          </CardList>
        )}
      </ContentContainer>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen && selectedRequest}
        onClose={handleCloseModal}
        userName={selectedRequest?.requesterNickname || userInfo.nickname}
        userImage="user1.png"
        message={selectedRequest?.title || ''}
        buttonText={selectedRequest?.requestStatus === '완료됨' ? '이미 완료된 요청입니다' : 'SOS 완료 처리'}
        onButtonClick={handleCompleteRequest}
        buttonDisabled={selectedRequest?.requestStatus === '완료됨'}
        buttonVariant="success"
      />
    </MyPageContainer>
  );
};

export default MyPage; 