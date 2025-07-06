import { atom } from 'recoil';

// 사용자 기본 정보
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    id: null,
    nickname: '',
    email: '',
    sosPoint: 0,
    level: 'NEWBIE', // NEWBIE, BEGINNER, EXPERT, GUARDIAN, LEGEND
  },
});

// 사용자 인증 상태
export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
  },
});

// 사용자 닉네임 (개별 접근용)
export const userNicknameState = atom({
  key: 'userNicknameState',
  default: '',
});

// 사용자 SOS 포인트 (개별 접근용)
export const userSosPointState = atom({
  key: 'userSosPointState',
  default: 0,
}); 