# 🎯 Recoil 상태 관리 가이드

## 📁 폴더 구조

```
src/state/
├── atoms/              # 원자 단위 상태
│   ├── userAtoms.js    # 사용자 관련 상태
│   └── appAtoms.js     # 앱 전반 상태
├── selectors/          # 파생된 상태
│   └── userSelectors.js # 사용자 관련 계산된 상태
├── index.js           # 모든 상태 export
└── README.md          # 이 파일

src/hooks/state/       # 상태 관리 전용 훅
├── useUserState.js    # 사용자 상태 관리
└── useAppState.js     # 앱 상태 관리
```

## 🔧 주요 상태들

### 👤 사용자 상태 (User State)

#### Atoms
- `userInfoState`: 사용자 기본 정보
- `authState`: 인증 상태
- `userNicknameState`: 닉네임 (개별 접근용)
- `userSosPointState`: SOS 포인트 (개별 접근용)

#### Selectors
- `userLevelInfoSelector`: 포인트 기반 레벨 계산
- `pointsToNextLevelSelector`: 다음 레벨까지 필요한 포인트
- `userProfileSummarySelector`: 사용자 프로필 요약

### 🏢 앱 상태 (App State)

#### Atoms
- `currentBuildingState`: 현재 선택된 건물
- `globalLoadingState`: 글로벌 로딩 상태
- `notificationsState`: 알림 목록
- `sosRequestsState`: SOS 요청 목록

## 🚀 사용법

### 1. 사용자 상태 관리

```jsx
import React from 'react';
import { useUserState } from '../../hooks/state/useUserState.js';

const MyComponent = () => {
  const {
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
    isAuthenticated,
    isMaxLevel,
  } = useUserState();

  const handleAddPoint = () => {
    addSosPoint(10); // 10포인트 추가
  };

  return (
    <div>
      <h1>안녕하세요, {nickname}님!</h1>
      <p>현재 포인트: {sosPoint}</p>
      <p>레벨: {levelInfo.name}</p>
      <button onClick={handleAddPoint}>포인트 추가</button>
    </div>
  );
};
```

### 2. 앱 상태 관리

```jsx
import React from 'react';
import { useAppState } from '../../hooks/state/useAppState.js';

const MainPage = () => {
  const {
    // 상태값들
    currentBuilding,
    isLoading,
    notifications,
    sosRequests,
    
    // 액션들
    setCurrentBuilding,
    setIsLoading,
    addNotification,
    addSosRequest,
    updateSosRequestStatus,
    
    // 계산된 값들
    unreadNotificationCount,
    hasUnreadNotifications,
  } = useAppState();

  const handleNewSosRequest = () => {
    const newRequest = {
      id: Date.now(),
      title: '노트북 충전기 빌려주세요',
      content: '배터리가 부족해요',
      building: currentBuilding,
      status: 'ACTIVE'
    };
    addSosRequest(newRequest);
  };

  return (
    <div>
      <h1>현재 위치: {currentBuilding}</h1>
      <p>읽지 않은 알림: {unreadNotificationCount}개</p>
      <button onClick={handleNewSosRequest}>SOS 요청 추가</button>
    </div>
  );
};
```

### 3. 로그인/로그아웃 처리

```jsx
import React from 'react';
import { useUserState } from '../../hooks/state/useUserState.js';

const AuthComponent = () => {
  const { login, logout, isAuthenticated } = useUserState();

  const handleLogin = async () => {
    const userData = {
      id: 1,
      nickname: '사용자',
      email: 'user@example.com',
      sosPoint: 50,
      level: 'EXPERT',
    };
    
    const tokenData = {
      token: 'jwt-token',
      refreshToken: 'refresh-token',
    };
    
    login(userData, tokenData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}
    </div>
  );
};
```

## 🔥 실제 적용 예시

### MyPage 컴포넌트
```jsx
// 기존: 로컬 상태 사용
const [userInfo] = useState({
  nickname: '자크 예가',
  sosPoints: 350
});

// 변경: Recoil 상태 사용
const { userInfo, levelInfo, updateUserInfo } = useUserState();
```

### Auth 컴포넌트
```jsx
// 로그인 성공 시 Recoil 상태 자동 업데이트
const { login: recoilLogin } = useUserState();

const handleLogin = async () => {
  // API 호출
  const response = await loginAPI(formData);
  
  // Recoil 상태 업데이트
  recoilLogin(response.userData, response.tokenData);
  
  // 메인 페이지로 이동
  navigate('/main');
};
```

### SOS 완료 처리
```jsx
// 포인트 자동 증가
const { addSosPoint } = useUserState();

const handleComplete = () => {
  addSosPoint(10); // 완료 시 10포인트 증가
};
```

## 💡 장점

1. **일관된 상태 관리**: 모든 컴포넌트에서 동일한 사용자 정보 공유
2. **자동 동기화**: 포인트 변경 시 레벨 자동 계산
3. **성능 최적화**: selector를 통한 메모이제이션
4. **타입 안정성**: 중앙화된 상태 타입 관리
5. **테스트 용이성**: 격리된 상태 로직

## 🚨 주의사항

1. **atom key 중복 방지**: 각 atom의 key는 고유해야 함
2. **selector 의존성**: selector는 순환 참조를 피해야 함
3. **상태 초기화**: 로그아웃 시 모든 상태 초기화 필요
4. **메모리 누수 방지**: 컴포넌트 언마운트 시 구독 정리

## 📋 TODO

- [ ] 상태 지속성 (localStorage 연동)
- [ ] 상태 디버깅 도구 추가
- [ ] 에러 바운더리 구현
- [ ] 상태 마이그레이션 로직 