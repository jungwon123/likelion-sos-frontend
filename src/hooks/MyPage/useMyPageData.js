import { useState, useEffect } from 'react';

export const useMyPageData = () => {
  const [sosHistory, setSosHistory] = useState([]);
  const [helpHistory, setHelpHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API 호출 함수
  const fetchSosHistory = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/mypage/sos', {
        method: 'GET',
        credentials: 'include',
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
        credentials: 'include',
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
    
    // cleanup 함수 명시적으로 반환
    return () => {
      // cleanup 로직이 필요한 경우 여기에 추가
    };
  }, []);

  // 상태 텍스트 변환 함수
  const getStatusInfo = (requestStatus) => {
    if (requestStatus === '완료됨') {
      return { text: 'SOS 완료', className: 'completed' };
    }
    return { text: 'SOS 중', className: '' };
  };

  return {
    sosHistory,
    helpHistory,
    loading,
    error,
    fetchSosHistory,
    fetchHelpHistory,
    getStatusInfo
  };
}; 