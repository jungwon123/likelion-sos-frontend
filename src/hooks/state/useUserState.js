import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userInfoState,
  authState,
  userNicknameState,
  userSosPointState,
  userLevelInfoSelector,
  userProfileSummarySelector,
} from '../../state';

export const useUserState = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [authInfo, setAuthInfo] = useRecoilState(authState);
  const [nickname, setNickname] = useRecoilState(userNicknameState);
  const [sosPoint, setSosPoint] = useRecoilState(userSosPointState);
  
  const levelInfo = useRecoilValue(userLevelInfoSelector);
  const profileSummary = useRecoilValue(userProfileSummarySelector);

  // 사용자 정보 업데이트
  const updateUserInfo = (newInfo) => {
    setUserInfo(prev => ({ ...prev, ...newInfo }));
    
    // 개별 상태도 동기화
    if (newInfo.nickname) setNickname(newInfo.nickname);
    if (newInfo.sosPoint !== undefined) setSosPoint(newInfo.sosPoint);
  };

  // 로그인
  const login = (userData, tokenData) => {
    setUserInfo(userData);
    setAuthInfo({
      isAuthenticated: true,
      ...tokenData,
    });
    setNickname(userData.nickname);
    setSosPoint(userData.sosPoint);
  };

  // 로그아웃
  const logout = () => {
    setUserInfo({
      id: null,
      nickname: '',
      email: '',
      sosPoint: 0,
      level: 'NEWBIE',
    });
    setAuthInfo({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
    });
    setNickname('');
    setSosPoint(0);
  };

  // SOS 포인트 증가
  const addSosPoint = (points) => {
    const newPoint = sosPoint + points;
    setSosPoint(newPoint);
    setUserInfo(prev => ({ ...prev, sosPoint: newPoint }));
  };

  // 닉네임 변경
  const updateNickname = (newNickname) => {
    setNickname(newNickname);
    setUserInfo(prev => ({ ...prev, nickname: newNickname }));
  };

  return {
    // 상태값들
    userInfo,
    authInfo,
    nickname,
    sosPoint,
    levelInfo,
    profileSummary,
    
    // 액션들
    updateUserInfo,
    login,
    logout,
    addSosPoint,
    updateNickname,
    
    // 계산된 값들
    isAuthenticated: authInfo.isAuthenticated,
    isMaxLevel: levelInfo.level === 5,
  };
}; 