import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFlex } from '../../components/MobileLayout.jsx';
import {
  SplashContainer,
  BrandContainer,
  SosText,
  CampusText,
  Subtitle
} from './SplashStyles.js';

const SplashPage = () => {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 2.2초 후 exit 애니메이션 시작
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    // 3초 후 로그인 페이지로 이동
    const navigateTimer = setTimeout(() => {
      navigate('/auth');
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

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