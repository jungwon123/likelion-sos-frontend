import axios from 'axios';

// API 기본 설정
// 개발 환경에서는 프록시 사용, 프로덕션에서는 직접 URL 사용
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? '' // 개발 환경에서는 프록시 사용
  : (process.env.REACT_APP_API_URL || 'http://localhost:8080');

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 백엔드에서 allowCredentials(true)로 설정했으므로 true로 변경
});

// 요청 인터셉터: 인증 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 개발 환경에서 요청 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API 요청:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ API 요청 설정 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    // 개발 환경에서 응답 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API 응답:', response.config.method?.toUpperCase(), response.config.url, response.status);
    }
    return response;
  },
  async (error) => {
    // 개발 환경에서 에러 로깅
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API 에러:', error.config?.method?.toUpperCase(), error.config?.url, error.response?.status);
    }
    
    const originalRequest = error.config;

    // 401 에러 시 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/api/refresh`, {
            refreshToken,
          });
          
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          
          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth';
      }
    }

    return Promise.reject(error);
  }
);

// =============================================================================
// 테스트 및 헬스체크 함수들
// =============================================================================

/**
 * Spring 서버 연결 테스트
 * @returns {Promise} 서버 상태 확인 결과
 */
export const testServerConnection = async () => {
  try {
    console.log('🔄 Spring 서버 연결 테스트 시작...');
    const response = await apiClient.get('/api/health', { timeout: 5000 });
    console.log('✅ Spring 서버 연결 성공:', response.status);
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    console.error('❌ Spring 서버 연결 실패:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Spring 서버가 8080 포트에서 실행되고 있지 않습니다.');
    }
    return { success: false, error: error.message };
  }
};

/**
 * API 테스트 (인증 없이 접근 가능한 엔드포인트)
 * @returns {Promise} API 테스트 결과
 */
export const testApiEndpoint = async () => {
  try {
    console.log('🔄 API 엔드포인트 테스트 시작...');
    const response = await apiClient.get('/api/test');
    console.log('✅ API 엔드포인트 연결 성공:', response.status);
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    console.error('❌ API 엔드포인트 연결 실패:', error.message);
    return { success: false, error: error.message };
  }
};

// =============================================================================
// SOS 관련 API 함수들
// =============================================================================

/**
 * SOS 리스트 전체 조회
 * @returns {Promise} API 응답 데이터
 */
export const getAllSosList = async () => {
  try {
    const response = await apiClient.get('/api/sos');
    return response.data;
  } catch (error) {
    console.error('SOS 리스트 조회 실패:', error);
    throw error;
  }
};

/**
 * SOS 리스트 건물별 조회
 * @param {string} buildingType - 건물 타입 (BuildingType enum 값)
 * @returns {Promise} API 응답 데이터
 */
export const getSosListByBuilding = async (buildingType) => {
  try {
    const response = await apiClient.get(`/api/sos/by-building?building=${buildingType}`);
    return response.data;
  } catch (error) {
    console.error('건물별 SOS 리스트 조회 실패:', error);
    throw error;
  }
};

/**
 * SOS 요청 생성
 * @param {Object} sosData - SOS 요청 데이터
 * @param {string} sosData.building - 건물 타입 (BuildingType enum 값)
 * @param {string} sosData.title - 제목
 * @param {string} sosData.content - 내용
 * @param {string} sosData.openChatUrl - 오픈채팅방 링크
 * @returns {Promise} API 응답 데이터
 */
export const createSosRequest = async (sosData) => {
  try {
    const response = await apiClient.post('/api/sos', sosData);
    return response.data;
  } catch (error) {
    console.error('SOS 요청 생성 실패:', error);
    throw error;
  }
};

/**
 * SOS 글 상세 조회
 * @param {string|number} id - SOS 글 ID
 * @returns {Promise} API 응답 데이터
 */
export const getSosDetail = async (id) => {
  try {
    const response = await apiClient.get(`/api/sos/${id}`);
    return response.data;
  } catch (error) {
    console.error('SOS 상세 조회 실패:', error);
    throw error;
  }
};

/**
 * SOS 글 수정
 * @param {string|number} id - SOS 글 ID
 * @param {Object} sosData - 수정할 SOS 데이터
 * @param {string} sosData.title - 제목
 * @param {string} sosData.content - 내용
 * @param {string} sosData.openChatUrl - 오픈채팅방 링크
 * @param {string} sosData.building - 건물 타입 (BuildingType enum 값)
 * @returns {Promise} API 응답 데이터
 */
export const updateSosRequest = async (id, sosData) => {
  try {
    const response = await apiClient.put(`/api/sos/${id}`, sosData);
    return response.data;
  } catch (error) {
    console.error('SOS 수정 실패:', error);
    throw error;
  }
};

/**
 * SOS 글 삭제
 * @param {string|number} id - SOS 글 ID
 * @returns {Promise} API 응답 데이터
 */
export const deleteSosRequest = async (id) => {
  try {
    const response = await apiClient.delete(`/api/sos/${id}`);
    return response.data;
  } catch (error) {
    console.error('SOS 삭제 실패:', error);
    throw error;
  }
};

// =============================================================================
// 마이페이지 관련 API 함수들
// =============================================================================

/**
 * 사용자 정보 조회
 * @returns {Promise} API 응답 데이터
 */
export const getMyStatus = async () => {
  try {
    const response = await apiClient.get('/api/sos/my-status');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};

/**
 * 나의 도움 내역 조회
 * @returns {Promise} API 응답 데이터
 */
export const getMyHelped = async () => {
  try {
    const response = await apiClient.get('/api/sos/helped');
    return response.data;
  } catch (error) {
    console.error('나의 도움 내역 조회 실패:', error);
    throw error;
  }
};

/**
 * 나의 SOS 내역 조회
 * @returns {Promise} API 응답 데이터
 */
export const getMyPosts = async () => {
  try {
    const response = await apiClient.get('/api/sos/my-posts');
    return response.data;
  } catch (error) {
    console.error('나의 SOS 내역 조회 실패:', error);
    throw error;
  }
};

/**
 * SOS 완료 처리
 * @param {Object} completeData - 완료 처리 데이터
 * @param {string} completeData.helperNickname - 도움을 준 사용자 닉네임
 * @returns {Promise} API 응답 데이터
 */
export const completeSosRequest = async (completeData) => {
  try {
    const response = await apiClient.post('/api/sos/complete', completeData);
    return response.data;
  } catch (error) {
    console.error('SOS 완료 처리 실패:', error);
    throw error;
  }
};

export default apiClient; 