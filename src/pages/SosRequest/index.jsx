import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../components/AlertModal.jsx';
import { useSosForm } from '../../hooks/SosRequest/useSosForm.js';
import { useDropdown } from '../../hooks/SosRequest/useDropdown.js';
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
  const {
    formData,
    buildings,
    isSubmitting,
    showModal,
    modalMessage,
    updateField,
    submitForm,
    setShowModal
  } = useSosForm();
  const { isOpen: isDropdownOpen, toggle: toggleDropdown, close: closeDropdown } = useDropdown();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBuildingSelect = (building) => {
    updateField('selectedBuilding', building.name);
    closeDropdown();
  };

  const handleSubmit = async () => {
    await submitForm();
  };

  return (
    <SosContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={require('../../assets/images/back.png')} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>
          <img style={{width: '40px', height: '40px'}} src={require('../../assets/images/request.png')} alt="request" />
          SOS 요청하기
        </HeaderTitle>
      </Header>

      <FormContainer>
        <FormField>
          <Label>건물</Label>
          <DropdownContainer>
            <DropdownButton 
              onClick={toggleDropdown}
              type="button"
            >
              <span style={{ color: formData.selectedBuilding ? '#333' : '#999' }}>
                {formData.selectedBuilding || '건물을 선택하세요'}
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
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>내용</Label>
          <TextArea
            placeholder="어떤 도움이 필요한지 자세히 설명해주세요"
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>오픈채팅방 링크</Label>
          <Input
            type="url"
            placeholder="참여를 위한 오픈채팅방 링크를 입력하세요."
            value={formData.chatLink}
            onChange={(e) => updateField('chatLink', e.target.value)}
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