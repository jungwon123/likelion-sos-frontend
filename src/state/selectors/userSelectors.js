import { selector } from 'recoil';
import { userInfoState, userSosPointState } from '../atoms/userAtoms';

// 사용자 레벨 정보 계산
export const userLevelInfoSelector = selector({
  key: 'userLevelInfoSelector',
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    const points = userInfo.sosPoint || get(userSosPointState);
    
    if (points >= 100) {
      return {
        level: 5,
        name: '레전드 학우',
        image: 'reward5.png',
        levelKey: 'LEGEND'
      };
    } else if (points >= 60) {
      return {
        level: 4,
        name: '학우 지킴이',
        image: 'reward4.png',
        levelKey: 'GUARDIAN'
      };
    } else if (points >= 30) {
      return {
        level: 3,
        name: '도움 고수',
        image: 'reward3.png',
        levelKey: 'EXPERT'
      };
    } else if (points >= 10) {
      return {
        level: 2,
        name: 'SOS 입문자',
        image: 'reward2.png',
        levelKey: 'BEGINNER'
      };
    } else {
      return {
        level: 1,
        name: '신입 학우',
        image: 'reward1.png',
        levelKey: 'NEWBIE'
      };
    }
  },
});

// 다음 레벨까지 필요한 포인트 계산
export const pointsToNextLevelSelector = selector({
  key: 'pointsToNextLevelSelector',
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    const points = userInfo.sosPoint || get(userSosPointState);
    
    if (points >= 100) return 0; // 최고 레벨
    if (points >= 60) return 100 - points;
    if (points >= 30) return 60 - points;
    if (points >= 10) return 30 - points;
    return 10 - points;
  },
});

// 사용자 프로필 요약 정보
export const userProfileSummarySelector = selector({
  key: 'userProfileSummarySelector',
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    const levelInfo = get(userLevelInfoSelector);
    const pointsToNext = get(pointsToNextLevelSelector);
    
    return {
      ...userInfo,
      levelInfo,
      pointsToNext,
      progressPercent: pointsToNext > 0 ? 
        ((userInfo.sosPoint % (userInfo.sosPoint + pointsToNext)) / (userInfo.sosPoint + pointsToNext)) * 100 : 100
    };
  },
}); 