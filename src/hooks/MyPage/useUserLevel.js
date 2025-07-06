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