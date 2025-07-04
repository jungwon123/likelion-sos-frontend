import styled from 'styled-components';

const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 16px 0;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }
`;

const CardTitle = styled.h3`
  color: #333;
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 700;
`;

const CardContent = styled.div`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
`;

const Card = ({ title, children, ...props }) => {
  return (
    <StyledCard {...props}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

export default Card; 