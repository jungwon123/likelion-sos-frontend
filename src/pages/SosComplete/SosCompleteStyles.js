import styled from 'styled-components';

export const SosCompleteContainer = styled.div`
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
  gap: 100px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #ddd;
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
  font-size: 20px;
  font-weight: 600;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WelcomeMessage = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 10px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  box-sizing: border-box;
  
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
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  
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
  padding: 16px;
  background: #FF9500;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background: #e6850a;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`; 