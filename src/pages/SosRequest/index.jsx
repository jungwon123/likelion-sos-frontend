import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../components/AlertModal.jsx';
import {
  SosContainer,
  Header,
  BackButton,
  HeaderTitle,
  FormContainer,
  FormField,
  Label,
  DropdownContainer,
  DropdownButton,
  DropdownIcon,
  DropdownMenu,
  DropdownItem,
  Input,
  TextArea,
  SubmitButton
} from './SosRequestStyles.js';

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

      <AlertModal 
        isOpen={showModal}
        message={modalMessage}
        iconSrc="checkcircle.png"
        iconAlt="checkcircle"
        onClose={() => setShowModal(false)}
      />
    </SosContainer>
  );
};

export default SosRequestPage; 