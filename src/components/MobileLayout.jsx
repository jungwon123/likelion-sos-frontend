import styled from 'styled-components';

// 모바일 화면 전체를 채우는 컨테이너
export const MobileContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  background: ${props => props.background || '#f8f9fa'};
`;

// 모바일 헤더
export const MobileHeader = styled.header`
  width: 100%;
  padding: 20px;
  background: ${props => props.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

// 모바일 컨텐츠 영역
export const MobileContent = styled.main`
  width: 100%;
  padding: ${props => props.padding || '20px'};
  flex: 1;
  overflow-y: auto;
`;

// 모바일 하단 고정 영역
export const MobileFooter = styled.footer`
  width: 100%;
  padding: 20px;
  background: ${props => props.background || 'white'};
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

// 모바일 버튼
export const MobileButton = styled.button`
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  min-height: 48px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background: ${props => {
    switch (props.variant) {
      case 'primary': return '#667eea';
      case 'danger': return '#ff6b6b';
      case 'success': return '#28a745';
      case 'secondary': return '#6c757d';
      default: return '#667eea';
    }
  }};
  
  color: ${props => props.variant === 'outline' ? '#667eea' : 'white'};
  border: ${props => props.variant === 'outline' ? '2px solid #667eea' : 'none'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

// 모바일 입력 필드
export const MobileInput = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 14px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

// 모바일 텍스트 영역
export const MobileTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 14px 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

// 모바일 카드
export const MobileCard = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  ${props => props.clickable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

// 모바일 그리드
export const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '150px'}, 1fr));
  gap: ${props => props.gap || '16px'};
  width: 100%;
`;

// 모바일 플렉스 박스
export const MobileFlex = styled.div`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '12px'};
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

// 모바일 타이포그래피
export const MobileTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.color || '#333'};
  margin: 0 0 16px 0;
  line-height: 1.2;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const MobileSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.color || '#333'};
  margin: 0 0 12px 0;
  line-height: 1.3;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const MobileText = styled.p`
  font-size: 1rem;
  color: ${props => props.color || '#666'};
  line-height: 1.5;
  margin: 0 0 8px 0;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// 뒤로 가기 버튼
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`; 