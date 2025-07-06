import { useState, useEffect, useCallback } from 'react';

export const useTimer = (delays = []) => {
  const [activeStates, setActiveStates] = useState({});

  useEffect(() => {
    // delays가 빈 배열이면 아무것도 하지 않음
    if (!delays || delays.length === 0) {
      return;
    }

    const timers = delays.map(({ key, delay, callback }) => {
      return setTimeout(() => {
        setActiveStates(prev => ({
          ...prev,
          [key]: true
        }));
        
        if (callback) {
          callback();
        }
      }, delay);
    });

    // cleanup 함수 반환
    return () => {
      timers.forEach(timer => {
        if (timer) {
          clearTimeout(timer);
        }
      });
    };
  }, [delays]);

  const getState = useCallback((key) => {
    return activeStates[key] || false;
  }, [activeStates]);

  return {
    activeStates,
    getState
  };
}; 