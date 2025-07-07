import { useMemo } from 'react';

export const useUserLevel = (points) => {
  const levelInfo = useMemo(() => {
    if (points >= 100) {
      return {
        level: 5,
        name: '레전드 학우',
        image: 'reward5.png'
      };
    } else if (points >= 60) {
      return {
        level: 4,
        name: '학우 지킴이',
        image: 'reward4.png'
      };
    } else if (points >= 30) {
      return {
        level: 3,
        name: '도움 고수',
        image: 'reward3.png'
      };
    } else if (points >= 10) {
      return {
        level: 2,
        name: 'SOS 입문자',
        image: 'reward2.png'
      };
    } else {
      return {
        level: 1,
        name: '신입 학우',
        image: 'reward1.png'
      };
    }
  }, [points]);

  return levelInfo;
};

// 레벨명으로 이미지를 가져오는 함수
export const getLevelImageByName = (levelName) => {
  const levelImageMap = {
    '레전드 학우': 'reward5.png',
    '학우 지킴이': 'reward4.png',
    '도움 고수': 'reward3.png',
    'SOS 입문자': 'reward2.png',
    '신입 학우': 'reward1.png'
  };
  
  return levelImageMap[levelName] || 'reward1.png'; // 기본값은 reward1.png
}; 