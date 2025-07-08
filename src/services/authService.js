import apiClient from './api.js';

// 회원가입 이메일 인증 메일 전송
export const sendEmailVerification = async (email) => {
  try {
    const response = await apiClient.post('/api/register', { email });
    return {
      success: true,
      message: response.data, // "인증 메일을 보냈습니다. 메일함을 확인해주세요."
    };
  } catch (error) {

      // 상세한 에러 메시지 처리
      let errorMessage = '전송중 오류가 발생했습니다.';
    
      if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || error.response?.data || '잘못된 요청입니다.';
      } else if (error.response?.status === 401) {
        errorMessage = '이메일 인증이 필요합니다.';
      } else if (error.response?.status === 409) {
        errorMessage = '이미 가입된 이메일입니다.';
      } else if (error.response?.data) {
        errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : error.response.data.message || '서버 오류가 발생했습니다.';
      }
    return {
      success: false,
      message: error.response?.data || '이미 가입된 이메일입니다.',
    };
  }
};

// 이메일 인증 확인 (토큰 기반)
export const verifyEmail = async (token) => {
  try {
    const response = await apiClient.get(`/api/verify?token=${token}`);
    return {
      success: true,
      message: response.data, // "이메일 인증 완료!"
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data || '유효하지 않은 토큰입니다.',
    };
  }
};

// 회원가입 완료 (정보 입력)
export const completeRegistration = async (userData) => {
  try {
    // 인증된 이메일 정보를 함께 전송
    const requestData = {
      ...userData,
      email: userData.email // 인증된 이메일 정보 포함
    };
    
    const response = await apiClient.post('/api/complete-register', requestData);
    
    return {
      success: true,
      message: response.data, // "회원가입 완료!"
    };
  } catch (error) {
 
    
    // 상세한 에러 메시지 처리
    let errorMessage = '회원가입 중 오류가 발생했습니다.';
    
    if (error.response?.status === 400) {
      errorMessage = error.response?.data?.message || error.response?.data || '잘못된 요청입니다.';
    } else if (error.response?.status === 401) {
      errorMessage = '이메일 인증이 필요합니다.';
    } else if (error.response?.status === 409) {
      errorMessage = '이미 가입된 이메일입니다.';
    } else if (error.response?.data) {
      errorMessage = typeof error.response.data === 'string' 
        ? error.response.data 
        : error.response.data.message || '서버 오류가 발생했습니다.';
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 로그인
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/login', credentials);
    
    if (response.data.status === 'success') {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || '로그인에 실패했습니다.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || '이메일 또는 비밀번호가 틀렸습니다.',
    };
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await apiClient.post('/api/logout');
    
    // 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    return {
      success: true,
    };
  } catch (error) {
    // 로그아웃은 실패해도 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    return {
      success: false,
      message: error.response?.data || '로그아웃 중 오류가 발생했습니다.',
    };
  }
};

// 비밀번호 재설정 요청 (이메일 전송)
export const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post('/api/reset-password-request', { email });
    
    if (response.data.status === 'success') {
      return {
        success: true,
        message: response.data.message, // "비밀번호 재설정 메일을 보냈습니다."
      };
    } else {
      return {
        success: false,
        message: response.data.message, // "가입된 이메일이 아닙니다."
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || '비밀번호 재설정 요청 중 오류가 발생했습니다.',
    };
  }
};

// 비밀번호 재설정 완료
export const resetPassword = async (email, token, newPassword) => {
  try {
    const response = await apiClient.post('/api/reset-password', {
      email,
      token,
      newPassword,
    });
    
    if (response.data === '비밀번호가 성공적으로 변경되었습니다.') {
      return {
        success: true,
        message: response.data, // "비밀번호가 성공적으로 변경되었습니다."
      };
    } else {
      return {
        success: false,
        message: response.data.message, // "유효하지 않은 토큰입니다." 또는 "사용자를 찾을 수 없습니다."
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || '비밀번호 재설정 중 오류가 발생했습니다.',
    };
  }
}; 