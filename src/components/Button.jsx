import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#0056b3' : '#5a6268'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Button = ({ children, primary, disabled, onClick, ...props }) => {
  return (
    <StyledButton 
      primary={primary} 
      disabled={disabled} 
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 