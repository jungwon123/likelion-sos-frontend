import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SosContainer = styled.div`
  min-height: 100vh;
  background: #FBF4E8;
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
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

const BackButton = styled.button`
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

const HeaderTitle = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
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

const DropdownIcon = styled.span`
  font-size: 12px;
  color: #666;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const DropdownMenu = styled.div`
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

const DropdownItem = styled.div`
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

const Input = styled.input`
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

const TextArea = styled.textarea`
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

const SubmitButton = styled.button`
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 167px;
  height: 97px;
  background: #F9A42E;
  border: 1px solid #F9A42E;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 1;
  animation: fadeIn 0.3s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalText = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 5px;
padding: 5px;
  color: white;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  line-height: 1.4;
`;

const SosRequestPage = () => {
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chatLink, setChatLink] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const buildings = [
    { id: 'building8', name: '8호관 (공과대학)' },
    { id: 'irum', name: '이룸관 (학산도서관)' },
    { id: 'building12', name: '12호관 (컨벤션센터)' },
    { id: 'building1', name: '1호관 (본관)' },
    { id: 'building2', name: '2호관 (인문사회관)' },
    { id: 'building3', name: '3호관 (자연과학관)' },
    { id: 'building4', name: '4호관 (경영관)' },
    { id: 'building5', name: '5호관 (체육관)' },
    { id: 'building6', name: '6호관 (학생회관)' },
    { id: 'building7', name: '7호관 (기숙사)' }
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building.name);
    setIsDropdownOpen(false);
  };

  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!selectedBuilding || !title || !content) {
      showModalMessage('건물, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 실제 API 호출 또는 데이터 처리
      console.log('SOS 요청 데이터:', {
        building: selectedBuilding,
        title,
        content,
        chatLink
      });
      
      // 성공 메시지 표시
      showModalMessage('요청이 등록되었습니다!!');
      
      // 모달이 사라진 후 메인 페이지로 이동
      setTimeout(() => {
        navigate('/main');
      }, 2000);
      
    } catch (error) {
      console.error('SOS 요청 실패:', error);
      showModalMessage('요청 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SosContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../public/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>
          <img style={{width: '40px', height: '40px'}} src={require('../../public/images/request.png')} alt="request" />
          SOS 요청하기
          </HeaderTitle>
      </Header>

      <FormContainer>
        <FormField>
          <Label>건물</Label>
          <DropdownContainer>
            <DropdownButton 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
            >
              <span style={{ color: selectedBuilding ? '#333' : '#999' }}>
                {selectedBuilding || '건물을 선택하세요'}
              </span>
              <DropdownIcon isOpen={isDropdownOpen}>▼</DropdownIcon>
            </DropdownButton>
            <DropdownMenu isOpen={isDropdownOpen}>
              {buildings.map(building => (
                <DropdownItem 
                  key={building.id}
                  onClick={() => handleBuildingSelect(building)}
                >
                  {building.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>
        </FormField>

        <FormField>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>내용</Label>
          <TextArea
            placeholder="어떤 도움이 필요한지 자세히 설명해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>오픈채팅방 링크</Label>
          <Input
            type="url"
            placeholder="참여를 위한 오픈채팅방 링크를 입력하세요."
            value={chatLink}
            onChange={(e) => setChatLink(e.target.value)}
          />
        </FormField>

                 <SubmitButton 
           onClick={handleSubmit}
           disabled={isSubmitting}
         >
           {isSubmitting ? '등록 중...' : 'SOS 등록'}
         </SubmitButton>
       </FormContainer>

       {showModal && (
         <ModalOverlay>
           <ModalContent>
             <ModalText><img style={{width: '20px', height: '20px'}} src={require('../../public/images/checkcircle.png')} alt="checkcircle" />{modalMessage}</ModalText>
           </ModalContent>
         </ModalOverlay>
       )}
     </SosContainer>
   );
};

export default SosRequestPage; 