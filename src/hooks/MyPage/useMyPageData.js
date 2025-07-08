import { useState, useEffect } from 'react';
import { getMyStatus, getMyPosts, getMyHelped, deleteSosRequest } from '../../services/api.js';

export const useMyPageData = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [sosHistory, setSosHistory] = useState([]);
  const [helpHistory, setHelpHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 시간 계산 함수 제거 - 서버에서 제공하는 elapsedTime 사용

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
          id: item.id, // 실제 API의 id 사용
          title: item.title,
          building: item.building,
          requesterNickname: item.requesterNickname,
          requestStatus: item.status, // API 응답의 status 필드 사용
          createdAt: item.elapsedTime, // 서버에서 제공하는 elapsedTime 사용
          content: item.content,
          openChatUrl: item.openChatUrl,
          elapsedTime: item.elapsedTime
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
 
    } finally {
      setLoading(false);
    }
  };

  // 도움 내역 조회 함수
  const fetchHelpHistory = async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMyHelped();
      if (data && Array.isArray(data)) {
        const processedData = data.map(item => ({
          ...item,
          requestStatus: item.status || 'SOS 중',
          createdAt: item.elapsedTime
        }));
        setHelpHistory(processedData);
      } else {
        setHelpHistory([]);
      }
    } catch (err) {
      if (err?.response?.status !== 401) {
        console.error('도움 내역 조회 실패:', err);
        setError('네트워크 오류가 발생했습니다.');
      }
 
    } finally {
      setLoading(false);
    }
  };

  // SOS 게시물 삭제 함수
  const deleteSosPost = async (postId) => {
    try {
      await deleteSosRequest(postId);
      // 삭제 성공 시 목록 새로고침
      await fetchSosHistory();
      return { success: true, message: '게시물이 삭제되었습니다.' };
    } catch (err) {
      console.error('게시물 삭제 실패:', err);
      const errorMessage = err?.response?.data?.message || '게시물 삭제에 실패했습니다.';
      return { success: false, message: errorMessage };
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
    console.log('받은 상태값:', requestStatus);
    if (requestStatus === '완료' || requestStatus === '완료됨') {
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
    fetchSosHistory,
    fetchHelpHistory,
    deleteSosPost,
    getStatusInfo
  };
}; 