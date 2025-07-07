import styled from 'styled-components';

export const ChatContainer = styled.div`
  min-height: 100vh;
  background: rgb(255, 255, 255);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background: #FF9500;
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 29px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  padding-bottom: 50px;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  background: #FF9500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

export const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  background: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
`;

export const LogoText = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.4;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 40px;
  max-width: 320px;
  text-align: center;
`;

export const RequestInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-bottom: 30px;
  max-width: 320px;
  min-height: 350px;
  gap: 40px;
  border: 1px solid #e9ecef;
`;

export const RequestTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
`;

export const RequestMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: #666;
  margin-bottom: 8px;
  padding: 10px;
  img {
    width: 15px;
    height: 15px;
    object-fit: contain;
  }
`;

export const RequestUser = styled.div`
  font-size: 14px;
  color: #999;
`;

export const KakaoButton = styled.button`
  background: #ffffff;
  color: #FF9500;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(254, 229, 0, 0.4);
  
  &:active {
    transform: translateY(0);
  }
`;

export const KakaoIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #191919;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FEE500;
  font-size: 12px;
  font-weight: bold;
`;

export const InfoText = styled.div`
  font-size: 14px;
  color: #999;
  margin-top: 20px;
  line-height: 1.4;
`; 