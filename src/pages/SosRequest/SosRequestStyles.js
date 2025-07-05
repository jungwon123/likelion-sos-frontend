import styled from 'styled-components';

export const SosContainer = styled.div`
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
  gap: 40px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
`;

export const FormContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 16px;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: #FF9500;
  }
  
  &:focus {
    outline: none;
    border-color: #FF9500;
  }
`;

export const DropdownIcon = styled.span`
  font-size: 12px;
  color: #666;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e9ecef;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF9500;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF9500;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  background: #FF9500E8;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background: #e6850a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 149, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`; 