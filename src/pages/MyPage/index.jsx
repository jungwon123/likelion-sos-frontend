import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import {
  MyPageContainer,
  Header,
  BackButton,
  HeaderTitle,
  ContentContainer,
  UserCard,
  UserInfo,
  UserAvatar,
  UserName,
  UserStats,
  StatItem,
  StatGroup,
  StatLabel,
  StatValue,
  LevelIcon,
  PointText,
  TabContainer,
  TabButton,
  CardList,
  HistoryCard,
  CardTitle,
  CardMeta,
  MetaInfo,
  StatusButton,
  LoadingMessage,
  ErrorMessage,
  EmptyMessage
} from './MyPageStyles.js';

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

  // 더미데이터 설정
  useEffect(() => {
    // SOS 내역 더미데이터
    const dummySosHistory = [
      {
        id: 1,
        title: "충전기 빌려줄사람 구합니다",
        building: "학산도서관 1층",
        requesterNickname: "익명",
        requestStatus: "진행중",
        createdAt: "50분 전"
      },
      {
        id: 2,
        title: "노트북 충전기 빌려줄사람 구합니다",
        building: "8호호관 2층",
        requesterNickname: "익명",
        requestStatus: "완료됨",
        createdAt: "2일 전"
      },
      {
        id: 3,
        title: "충전기 빌려줄사람 구합니다",
        building: "정보기술대대 3층",
        requesterNickname: "익명",
        requestStatus: "진행중",
        createdAt: "1시간 전"
      },
      {
        id: 4,
        title: "충전기 빌려줄사람 구합니다",
        building: "학산산도서관 2층",
        requesterNickname: "익명",
        requestStatus: "완료됨",
        createdAt: "3일 전"
      }
    ];

    // 도움 내역 더미데이터
    const dummyHelpHistory = [
      {
        id: 1,
        title: "학생회관에서 우산 빌려드렸어요",
        building: "학생회관 1층",
        requesterNickname: "도움받은학생",
        requestStatus: "완료됨",
        createdAt: "1일 전"
      },
      {
        id: 2,
        title: "도서관에서 노트북 충전기 빌려드렸습니다",
        building: "중앙도서관 3층",
        requesterNickname: "익명학생",
        requestStatus: "완료됨",
        createdAt: "4일 전"
      },
      {
        id: 3,
        title: "공학관에서 계산기 빌려드렸어요",
        building: "공학관 1층",
        requesterNickname: "공대생",
        requestStatus: "완료됨",
        createdAt: "1주일 전"
      }
    ];

    setSosHistory(dummySosHistory);
    setHelpHistory(dummyHelpHistory);
  }, []);

  // 탭 변경 시 해당 데이터 로드
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 더미데이터를 사용하므로 별도 API 호출 없음
  };

  // 상태 텍스트 변환 함수
  const getStatusInfo = (requestStatus) => {
    if (requestStatus === '완료됨') {
      return { text: 'SOS 완료', className: 'completed' };
    }
    return { text: 'SOS 중', className: '' };
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

  // SOS 완료 처리 핸들러 (페이지 이동)
  const handleCompleteRequest = () => {
    // 진행중인 요청만 완료 처리 페이지로 이동
    if (selectedRequest && selectedRequest.requestStatus === '진행중') {
      navigate('/sos-complete', { state: { requestData: selectedRequest } });
    }
    handleCloseModal();
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
                      <img src={require('../../public/images/clockpoint.png')} alt="Clock" />
                      <span>{item.createdAt}</span>
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
        buttonText={selectedRequest?.requestStatus === '완료됨' ? '이미 완료된 요청입니다' : '도움완료처리'}
        onButtonClick={handleCompleteRequest}
        buttonDisabled={selectedRequest?.requestStatus === '완료됨'}
        buttonVariant="success"
      />
    </MyPageContainer>
  );
};

export default MyPage; 