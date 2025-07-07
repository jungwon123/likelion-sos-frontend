import { useState, useEffect } from 'react';
import { getMyStatus, getMyPosts, getMyHelped } from '../../services/api.js';

export const useMyPageData = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [sosHistory, setSosHistory] = useState([]);
  const [helpHistory, setHelpHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 사용자 정보 조회
  const fetchUserStatus = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await getMyStatus();
      
      if (response.status === 'success') {
        setUserStatus(response.data);
      } else {
        setError(response.message || '사용자 정보를 불러오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error);
      if (error.response?.status === 401) {
        setError('로그인이 필요합니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 나의 SOS 내역 조회
  const fetchSosHistory = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await getMyPosts();
      
      if (response.status === 'success') {
        // API 응답 데이터를 컴포넌트에서 사용하는 형태로 변환
        const transformedData = response.data.map((item, index) => ({
          id: index + 1,
          title: item.title,
          building: item.building,
          requesterNickname: item.requesterNickname,
          requestStatus: item.requestStatus,
          createdAt: '방금 전', // API에서 시간 정보가 없으므로 임시로 설정
          content: item.content,
          openChatUrl: item.openChatUrl
        }));
        setSosHistory(transformedData);
      } else {
        setError(response.message || 'SOS 내역을 불러오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('SOS 내역 조회 오류:', error);
      if (error.response?.status === 401) {
        setError('로그인이 필요합니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
      // 개발 중에는 더미 데이터를 사용
      const dummySosHistory = [
        {
          id: 1,
          title: "충전기 빌려줄사람 구합니다",
          building: "학산도서관 1층",
          requesterNickname: "익명",
          requestStatus: "SOS 중",
          createdAt: "50분 전"
        },
        {
          id: 2,
          title: "노트북 충전기 빌려줄사람 구합니다",
          building: "8호관 2층",
          requesterNickname: "익명",
          requestStatus: "완료됨",
          createdAt: "2일 전"
        }
      ];
      setSosHistory(dummySosHistory);
    } finally {
      setLoading(false);
    }
  };

  // 나의 도움 내역 조회
  const fetchHelpHistory = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await getMyHelped();
      
      if (response.status === 'success') {
        // API 응답 데이터를 컴포넌트에서 사용하는 형태로 변환
        const transformedData = response.data.map((item, index) => ({
          id: index + 1,
          title: item.title,
          building: item.building,
          requesterNickname: item.requesterNickname,
          requestStatus: item.requestStatus,
          createdAt: '방금 전', // API에서 시간 정보가 없으므로 임시로 설정
          content: item.content,
          openChatUrl: item.openChatUrl
        }));
        setHelpHistory(transformedData);
      } else {
        setError(response.message || '도움 내역을 불러오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('도움 내역 조회 오류:', error);
      if (error.response?.status === 401) {
        setError('로그인이 필요합니다.');
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
      // 개발 중에는 더미 데이터를 사용
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
        }
      ];
      setHelpHistory(dummyHelpHistory);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchUserStatus();
    fetchSosHistory();
    fetchHelpHistory();
  }, []);

  // 상태 텍스트 변환 함수
  const getStatusInfo = (requestStatus) => {
    if (requestStatus === '완료됨') {
      return { text: 'SOS 완료', className: 'completed' };
    }
    return { text: 'SOS 중', className: '' };
  };

  return {
    userStatus,
    sosHistory,
    helpHistory,
    loading,
    error,
    fetchUserStatus,
    fetchSosHistory,
    fetchHelpHistory,
    getStatusInfo
  };
}; 