import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../state/atoms/userAtoms.js';
import { getAllSosList, getSosListByBuilding, getMyStatus, testServerConnection } from '../../services/api.js';
import { getBuildingLabel, getBuildingType, BUILDING_OPTIONS } from '../../constants/buildings.js';
import { getLevelImageByName } from '../../hooks/MyPage/useUserLevel.js';
import Modal from '../../components/Modal.jsx';
import {
  MainContainer,
  Header,
  HeaderLeft,
  Logo,
  LocationDropdown,
  DropdownMenu,
  DropdownItem,
  RefreshButton,
  MainContent,
  RequestCard,
  CardHeader,
  UserInfo,
  UserProfile,
  UserIcon,
  UserName,
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
  const userInfo = useRecoilValue(userInfoState);
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]); // 전체 요청 목록 저장
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentBuilding, setCurrentBuilding] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState('확인 중...');
  const dropdownRef = React.useRef(null);

  // 시간 계산 함수
  const getRelativeTime = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return '방금 전';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // 페이지 로드시 현재 사용자 정보 가져오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getMyStatus();
        if (response.status === 'success') {
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        // 에러가 발생해도 기본 기능은 동작하도록 함
      }
    };

    fetchCurrentUser();
  }, []);

  // 페이지 로드 시 SOS 리스트 가져오기
  useEffect(() => {
    fetchSosList();
  }, []);

  // SOS 리스트 가져오기
  const fetchSosList = async (buildingType = null) => {
    try {
      setIsLoading(true);
      setError('');
      
      let response;
      if (buildingType) {
        response = await getSosListByBuilding(buildingType);
      } else {
        response = await getAllSosList();
      }

      if (response.status === 'success') {
        // API 응답 데이터를 UI에 맞게 변환
        const transformedRequests = response.data.map((item, index) => ({
          id: item.id, // 서버에서 제공하는 실제 ID 사용
          userName: item.requesterNickname,
          userLevel: item.requesterLevel, // 요청자 레벨 추가
          title: item.title,
          description: item.content,
          location: item.building,
          time: getRelativeTime(item.createdAt), // 실제 생성 시간을 기반으로 상대적 시간 계산
          category: '도움 요청',
          openChatUrl: item.openChatUrl,
          requestStatus: item.status // 서버에서 status 필드로 오므로 수정
        }));
        
        console.log('🔄 변환된 요청 데이터:', transformedRequests);
        setRequests(transformedRequests);
        
        // 전체 요청을 불러온 경우에만 allRequests 업데이트
        if (!buildingType) {
          setAllRequests(transformedRequests);
        }
        
        return transformedRequests; // 성공 시 데이터 반환
      } else {
        setError(response.message || '데이터를 불러오는 중 오류가 발생했습니다.');
        setRequests([]);
        return [];
      }
    } catch (error) {
      console.error('SOS 리스트 조회 실패:', error);
      setError('네트워크 오류가 발생했습니다. Spring 서버가 실행되고 있는지 확인해주세요.');
      setRequests([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // 진행 중인 요청만 필터링
  const activeRequests = requests.filter(request => 
    request.requestStatus === 'SOS 중' || request.requestStatus === '진행중'
  );

  // 게시물이 존재하는 건물만 필터링 (전체 요청 기준)
  const availableBuildings = React.useMemo(() => {
    const allActiveRequests = allRequests.filter(request => 
      request.requestStatus === 'SOS 중' || request.requestStatus === '진행중'
    );
    const buildingsWithRequests = new Set(allActiveRequests.map(request => request.location));
    return BUILDING_OPTIONS.filter(building => buildingsWithRequests.has(building.label));
  }, [allRequests]);

  const handleHelpClick = (requestId) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      // 바로 SosChat 화면으로 이동
      navigate('/chat', { state: { request: request } });
    }
  };

  const handleLocationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBuildingSelect = (buildingLabel) => {
    setCurrentBuilding(buildingLabel);
    setIsDropdownOpen(false);
    
    // 선택한 건물에 따라 데이터 다시 로드
    if (buildingLabel === '전체') {
      fetchSosList();
    } else {
      const buildingType = getBuildingType(buildingLabel);
      fetchSosList(buildingType);
    }
  };

  const handleRefresh = async () => {
    // 새로고침할 때는 항상 전체 요청을 먼저 불러와서 allRequests 업데이트
    await fetchSosList();
    
    // 현재 선택된 건물이 '전체'가 아니면 추가로 필터링
    if (currentBuilding !== '전체') {
      const buildingType = getBuildingType(currentBuilding);
      fetchSosList(buildingType);
    }
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
      // 항상 SosChat 화면으로 이동하고 게시물 정보를 전달
      navigate('/chat', { state: { request: selectedRequest } });
      handleCloseModal();
    }
  };

  return (
    <MainContainer>
      <Header>
        <HeaderLeft>
          <Logo>캠퍼스 SOS</Logo>
          <LocationDropdown onClick={handleLocationClick} ref={dropdownRef}>
            <img style={{width: '24px', height: '24px'}} src={require('../../assets/images/map.png')} alt="Map Point" />
            <span>{currentBuilding}</span>
            <img style={{width: '24px', height: '24px'}} src={require('../../assets/images/arrowdown.png')} alt="Down" />
            
            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem 
                  onClick={() => handleBuildingSelect('전체')}
                  active={currentBuilding === '전체'}
                >
                  전체
                </DropdownItem>
                {availableBuildings.map((building) => (
                  <DropdownItem 
                    key={building.type}
                    onClick={() => handleBuildingSelect(building.label)}
                    active={currentBuilding === building.label}
                  >
                    {building.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </LocationDropdown>
      
        </HeaderLeft>
        <RefreshButton onClick={handleRefresh}>
          <img src={require('../../assets/images/retry.png')} alt="Retry" />
        </RefreshButton>
      </Header>

      <MainContent>
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            로딩 중...
          </div>
        )}
        
        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#ff4444' }}>
            {error}
          </div>
        )}
        
        {!isLoading && !error && activeRequests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
            현재 등록된 SOS 요청이 없습니다.
          </div>
        )}
        
        {!isLoading && activeRequests.map(request => (
          <RequestCard key={request.id} onClick={() => handleCardClick(request)}>
            <CardHeader>
              <UserInfo>
                  <UserProfile>
                    <UserIcon>
                      <img src={require('../../assets/images/user1.png')} alt="User Icon" />
                    </UserIcon>
                    <UserName>{request.userName}</UserName>
                  </UserProfile>
                  <CategoryIcon>
                    {request.userLevel}
                    <img style={{width: '24px', height: '24px'}} src={require(`../../assets/images/${getLevelImageByName(request.userLevel)}`)} alt="Level Icon" />
                  </CategoryIcon>
              </UserInfo>
            </CardHeader>
            
            <RequestContent>
              <RequestTitle>{request.title}</RequestTitle>
              <RequestMeta>
                <MetaItem>
                  <img src={require('../../assets/images/mappoint.png')} alt="Map Point" />
                  {request.location}
                  <img src={require('../../assets/images/clockpoint.png')} alt="Clock" />
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
      
      {/* 간단한 Modal 컴포넌트 */}
      <Modal
        isOpen={isModalOpen && selectedRequest}
        onClose={handleCloseModal}
        userName={selectedRequest?.userName || ''}
        userImage="user1.png"
        message={selectedRequest?.description || ''}
        buttonText="도와줄게요"
        onButtonClick={handleModalHelpClick}
        buttonDisabled={false}
      />

     
    </MainContainer>
  );
};

export default MainPage;