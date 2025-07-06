import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFlex } from '../../components/MobileLayout.jsx';
import { useTimer } from '../../hooks/Splash/useTimer.js';
import {
  SplashContainer,
  BrandContainer,
  SosText,
  CampusText,
  Subtitle
} from './SplashStyles.js';

const SplashPage = () => {
  const navigate = useNavigate();
  
  const timerConfig = useMemo(() => [
    { key: 'exit', delay: 2200 },
    { key: 'navigate', delay: 3000, callback: () => navigate('/auth') }
  ], [navigate]);
  
  const { getState } = useTimer(timerConfig);

  const isExiting = getState('exit');

  return (
    <SplashContainer isExiting={isExiting}>
      <MobileFlex direction="column" align="center" justify="center">
        <BrandContainer>
          <SosText isExiting={isExiting}>SOS</SosText>
          <CampusText isExiting={isExiting}>CAMPUS</CampusText>
          <Subtitle isExiting={isExiting}>"Campus. Connected."</Subtitle>
        </BrandContainer>
      </MobileFlex>
    </SplashContainer>
  );
};

export default SplashPage; 