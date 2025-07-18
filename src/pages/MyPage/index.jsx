import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import AlertModal from '../../components/AlertModal.jsx';
import { useUserState } from '../../hooks/state/useUserState.js';
import { useMyPageData } from '../../hooks/MyPage/useMyPageData.js';
import { useModal } from '../../hooks/MyPage/useModal.js';
import { useUserLevel } from '../../hooks/MyPage/useUserLevel.js';
import {
  MyPageContainer,
  Header,
  BackButton,
  HeaderTitle,
  LogoutButton,
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  // Recoil 상태 사용
  const { userInfo, logout } = useUserState();
  const {
    userStatus,
    userNickname,
    sosHistory,
    helpHistory,
    loading,
    error,
    fetchSosHistory,
    fetchHelpHistory,
    deleteSosPost,
    getStatusInfo
  } = useMyPageData();
  const { isOpen: isModalOpen, modalData: selectedRequest, openModal, closeModal } = useModal();

  // API에서 받은 사용자 정보로 레벨 정보 계산
  const currentLevelInfo = useUserLevel(userStatus?.point || 0);

  const handleBackClick = () => {
    navigate('/main');
  };

  const handleLogout = () => {
    logout(); // Recoil 상태 초기화
    navigate('/'); // 로그인 페이지로 이동
  };

  // 탭 변경 시 해당 데이터 다시 로드
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'sos') {
      fetchSosHistory();
    } else {
      fetchHelpHistory();
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = (request) => {
    // SOS 내역 탭에서만 모달 열기 (완료 처리 가능)
    if (activeTab === 'sos') {
      openModal(request);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    closeModal();
  };

  // SOS 완료 처리 핸들러 (페이지 이동)
  const handleCompleteRequest = () => {
    if (selectedRequest) {
      navigate('/sos-complete', { state: { requestData: selectedRequest } });
    }
    closeModal();
  };

  // SOS 게시물 수정 핸들러
  const handleEditSosPost = (requestData) => {
    navigate('/sos-request', { 
      state: { 
        editMode: true, 
        requestData: requestData
      } 
    });
    closeModal();
  };

  // SOS 게시물 삭제 핸들러
  const handleDeleteSosPost = async (postId) => {
    const result = await deleteSosPost(postId);
    if (result.success) {
      setAlertMessage('게시물이 삭제되었습니다.');
      setShowAlert(true);
    } else {
      setAlertMessage(result.message);
      setShowAlert(true);
    }
    closeModal();
  };

  // AlertModal 닫기 핸들러
  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const currentHistory = activeTab === 'sos' ? sosHistory : helpHistory;

  return (
    <MyPageContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../assets/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>MY PAGE</HeaderTitle>
        <LogoutButton onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Header>

      <ContentContainer>
        <UserCard>
          <UserInfo>
            <UserAvatar>
              <img src={require('../../assets/images/user1.png')} alt="User Profile" />
            </UserAvatar>
            <UserName>USER NAME : {userInfo?.nickname || '로딩 중...'}</UserName>
          </UserInfo>
          
          <UserStats>
            <StatGroup>
              <StatLabel>My Level</StatLabel>
              <StatItem>
                <LevelIcon>
                  <img src={require(`../../assets/images/${currentLevelInfo.image}`)} alt={`Level ${currentLevelInfo.level}`} /> 
                </LevelIcon>
                <StatValue> : {userStatus?.level || currentLevelInfo.name}</StatValue>
              </StatItem>
            </StatGroup>
            
            <StatGroup>
              <StatLabel>My SOS Point</StatLabel>
              <StatItem>
                <PointText>{userStatus?.point || 0} </PointText>
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
                      <img src={require('../../assets/images/mappoint.png')} alt="Location" />
                      <span>{item.building}</span>
                      <img src={require('../../assets/images/clockpoint.png')} alt="Clock" />
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
        userName={selectedRequest?.requesterNickname || userInfo?.nickname || ''}
        userImage="user1.png"
        message={selectedRequest?.content || selectedRequest?.title || ''}
        buttonText={selectedRequest?.requestStatus === '완료' || selectedRequest?.requestStatus === '완료됨' ? '이미 완료된 요청입니다' : '도움완료처리'}
        onButtonClick={handleCompleteRequest}
        buttonDisabled={selectedRequest?.requestStatus === '완료' || selectedRequest?.requestStatus === '완료됨'}
        buttonVariant="success"
        // 수정/삭제 기능을 위한 props 추가
        requestData={selectedRequest}
        currentUser={userInfo} // userStatus 대신 userInfo 사용
        onDelete={activeTab === 'sos' ? handleDeleteSosPost : null}
        onComplete={activeTab === 'sos' ? handleCompleteRequest : null}
      />

      {/* AlertModal */}
      <AlertModal
        isOpen={showAlert}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </MyPageContainer>
  );
};

export default MyPage; 