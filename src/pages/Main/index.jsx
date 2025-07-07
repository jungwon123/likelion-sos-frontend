import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../state/atoms/userAtoms.js';
import { getAllSosList, getSosListByBuilding, deleteSosRequest, getMyStatus, testServerConnection } from '../../services/api.js';
import { getBuildingLabel, getBuildingType, BUILDING_OPTIONS } from '../../constants/buildings.js';
import Modal from '../../components/Modal.jsx';
import AlertModal from '../../components/AlertModal.jsx';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentBuilding, setCurrentBuilding] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState('확인 중...');
  const dropdownRef = React.useRef(null);

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

  // 페이지 로드시 서버 연결 상태 확인
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const result = await testServerConnection();
        if (result.success) {
          setServerStatus('서버 연결됨');
          console.log('🎉 Spring 서버 연결 성공!');
        } else {
          setServerStatus('서버 연결 실패');
          console.error('🚨 Spring 서버 연결 실패:', result.error);
        }
      } catch (error) {
        setServerStatus('서버 연결 실패');
        console.error('🚨 서버 연결 테스트 중 오류:', error);
      }
    };

    checkServerConnection();
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
          title: item.title,
          description: item.content,
          location: item.building,
          time: '방금 전', // API에서 시간 정보가 없으므로 임시로 설정
          category: '도움 요청',
          openChatUrl: item.openChatUrl,
          requestStatus: item.status // 서버에서 status 필드로 오므로 수정
        }));
        
        console.log('🔄 변환된 요청 데이터:', transformedRequests);
        setRequests(transformedRequests);
      } else {
        setError(response.message || '데이터를 불러오는 중 오류가 발생했습니다.');
        setRequests([]);
      }
    } catch (error) {
      console.error('SOS 리스트 조회 실패:', error);
      setError('네트워크 오류가 발생했습니다. Spring 서버가 실행되고 있는지 확인해주세요.');
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 진행 중인 요청만 필터링
  const activeRequests = requests.filter(request => 
    request.requestStatus === 'SOS 중' || request.requestStatus === '진행중'
  );

  // 게시물이 존재하는 건물만 필터링
  const availableBuildings = React.useMemo(() => {
    const buildingsWithRequests = new Set(activeRequests.map(request => request.location));
    return BUILDING_OPTIONS.filter(building => buildingsWithRequests.has(building.label));
  }, [activeRequests]);

  const handleHelpClick = (requestId) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setIsModalOpen(true);
    }
  };

  const handleEdit = (requestData) => {
    navigate('/sosrequest', { state: { editData: requestData } });
    setIsModalOpen(false);
  };

  const handleDelete = async (requestId) => {
    try {
      const response = await deleteSosRequest(requestId);
      if (response.status === 'success') {
        // 모달 닫기
        setIsModalOpen(false);
        setSelectedRequest(null);
        // 목록 새로고침
        if (currentBuilding === '전체') {
          fetchSosList();
        } else {
          const buildingType = getBuildingType(currentBuilding);
          fetchSosList(buildingType);
        }
      } else {
        console.error('삭제 실패:', response.message || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      if (error.response?.status === 403) {
        console.error('본인이 작성한 게시물만 삭제할 수 있습니다.');
      } else {
        console.error('삭제 중 오류가 발생했습니다.');
      }
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

  const handleRefresh = () => {
    if (currentBuilding === '전체') {
      fetchSosList();
    } else {
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
      if (selectedRequest.openChatUrl) {
        window.open(selectedRequest.openChatUrl, '_blank');
      } else {
        navigate('/chat', { state: { request: selectedRequest } });
      }
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
          
          {/* 서버 상태 표시 */}
          <div style={{
            fontSize: '12px',
            color: serverStatus === '서버 연결됨' ? '#4CAF50' : 
                   serverStatus === '서버 연결 실패' ? '#f44336' : '#666',
            marginLeft: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: serverStatus === '서버 연결됨' ? '#4CAF50' : 
                             serverStatus === '서버 연결 실패' ? '#f44336' : '#666'
            }}></div>
            {serverStatus}
          </div>
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
                    {request.category}
                    <img style={{width: '24px', height: '24px'}} src={require('../../assets/images/reward1.png')} alt="User Icon" />
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
      
      {/* 향상된 Modal 컴포넌트 */}
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
        requestData={selectedRequest}
        currentUser={currentUser}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

     
    </MainContainer>
  );
};

export default MainPage;