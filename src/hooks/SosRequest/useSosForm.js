import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSosForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    selectedBuilding: '',
    title: '',
    content: '',
    chatLink: ''
  });
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

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const validateForm = () => {
    const { selectedBuilding, title, content } = formData;
    if (!selectedBuilding || !title || !content) {
      showModalMessage('건물, 제목, 내용을 모두 입력해주세요.');
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // 실제 API 호출
      console.log('SOS 요청 데이터:', formData);
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showModalMessage('요청이 등록되었습니다!!');
      
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

  const resetForm = () => {
    setFormData({
      selectedBuilding: '',
      title: '',
      content: '',
      chatLink: ''
    });
  };

  return {
    formData,
    buildings,
    isSubmitting,
    showModal,
    modalMessage,
    updateField,
    submitForm,
    resetForm,
    setShowModal
  };
}; 