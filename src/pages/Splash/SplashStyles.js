import styled, { keyframes, css } from 'styled-components';
import { MobileContainer } from '../../components/MobileLayout.jsx';

// 로딩 애니메이션
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100vh);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const SplashContainer = styled(MobileContainer)`
  background: #212121D9;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 40px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 9999;
  
  ${props => props.$isExiting && css`
    animation: ${slideUp} 0.8s ease-in-out forwards;
  `}
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1.2s ease-out;
`;

export const SosText = styled.h1`
  font-size: clamp(3rem, 12vw, 4.5rem);
  font-weight: 700;
  color: #FDAC3B;
  margin: 0;
  letter-spacing: 0.05em;
  line-height: 1;
  transition: transform 0.3s ease;
  
  ${props => props.$isExiting && css`
    transform: translateY(-20px);
  `}
`;

export const CampusText = styled.h1`
  font-size: clamp(3rem, 12vw, 4.5rem);
  font-weight: 700;
  color: #FDAC3B;
  margin: 0 0 24px 0;
  letter-spacing: 0.05em;
  line-height: 1;
  animation: ${fadeIn} 1s ease-out 0.3s both;
  transition: transform 0.3s ease;
  
  ${props => props.$isExiting && css`
    transform: translateY(-20px);
  `}
`;

export const Subtitle = styled.p`
  font-size: clamp(1rem, 4vw, 1.2rem);
  color: #FFFFFF;
  margin: 0 0 40px 0;
  font-weight: 400;
  letter-spacing: 0.02em;
  animation: ${fadeIn} 1s ease-out 0.6s both;
  transition: opacity 0.3s ease;
  
  ${props => props.$isExiting && css`
    opacity: 0.7;
  `}
`; 