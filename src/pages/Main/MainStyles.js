import styled from 'styled-components';

export const MainContainer = styled.div`
  min-height: 100vh;
  background:rgb(255, 255, 255);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
`;

export const Header = styled.header`
  background: #FF9500;
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const LocationDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #3A3535;
  border: 1px solid #555;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  min-width: 200px;
`;

export const DropdownItem = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid #555;
  cursor: pointer;
  color: white;
  background: ${props => props.active ? '#4A4545' : '#3A3535'};
  font-size: 13px;
  
  &:hover {
    background: #4A4545;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const RefreshButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

export const MainContent = styled.main`
  padding: 20px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const RequestCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #C57658;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  border-radius: 10px;
  border: 1px solid #C57658;
  padding: 4px 8px;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryIcon = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 8px;
`;

export const RequestContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RequestTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const RequestDescription = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

export const RequestMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  color: #999;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  img {
    width: 15px;
    height: 15px;
    object-fit: contain;
  }
`;

export const HelpButton = styled.button`
  background: #C57658;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  float: right;
  
  &:hover {
    background: #e6850a;
  }
`;

export const BottomButtons = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  display: flex;
  gap: 12px;
  padding: 20px;
  background: white;
`;

export const BottomButton = styled.button`
  flex: 1;
  background: #FF9500;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #e6850a;
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #e9ecef;
    
    &:hover {
      background: #e9ecef;
    }
  }
`; 