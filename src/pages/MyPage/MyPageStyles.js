import styled from 'styled-components';

export const MyPageContainer = styled.div`
  min-height: 100vh;
  background: #FBF4E8;
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background: #FBF4E8;
  color: black;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 27px;
  font-weight: 500;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const LogoutButton = styled.button`
  background: #FF9500;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #E6850C;
  }
  
  &:active {
    background: #CC7409;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  > *:not(:nth-child(2)) {
    margin: 0 20px;
  }
  
  > *:first-child {
    margin-top: 20px;
  }
  
  > *:last-child {
    margin-bottom: 20px;
  }
`;

export const UserCard = styled.div`
  background: white;
  border: 2px solid #FF9500;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 12px;
  border-bottom: 1px solid #FF9500;
`;

export const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;

export const UserStats = styled.div`
  display: flex;
  gap: 40px;
  padding: 10px 20px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

export const StatGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #666;
`;

export const StatValue = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #000000;
`;

export const LevelIcon = styled.div`
  width: 24px;
  height: 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const PointText = styled.span`
  font-size: 17px;
  color: #FF9500;
  font-weight: bold;
`;

export const TabContainer = styled.div`
  display: flex;
  background: none;
  border-radius: 12px 12px 0 0;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 16px;
  background: none;
  color: ${props => props.active ? '#FF9500' : '#9B9B9B'}; 
  border: none;
  border-bottom: ${props => props.active ? '2px solid #FF9500' : '1px solid #9B9B9B'};
  font-size: 17px;
  font-weight: ${props => props.active ? '700' : '600'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-sizing: border-box;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HistoryCard = styled.div`
  background: white;
  border: 2px solid #FF9500;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
  
  img {
    width: 12px;
    height: 12px;
    object-fit: contain;
  }
`;

export const StatusButton = styled.button`
  background: #FF9500;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 80px;
  min-width: 80px;
  text-align: center;
  
  &:hover {
    background: #e6850a;
  }
  
  &.completed {
    background: #28a745;
    
    &:hover {
      background: #218838;
    }
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #dc3545;
  font-size: 16px;
  line-height: 1.5;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 16px;
  line-height: 1.5;
`; 