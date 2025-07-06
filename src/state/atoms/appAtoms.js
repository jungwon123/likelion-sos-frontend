import { atom } from 'recoil';

// 현재 선택된 건물
export const currentBuildingState = atom({
  key: 'currentBuildingState',
  default: '',
});

// 글로벌 로딩 상태
export const globalLoadingState = atom({
  key: 'globalLoadingState',
  default: false,
});

// 알림 목록
export const notificationsState = atom({
  key: 'notificationsState',
  default: [],
});

// SOS 요청 목록 (실시간 업데이트용)
export const sosRequestsState = atom({
  key: 'sosRequestsState',
  default: [],
}); 