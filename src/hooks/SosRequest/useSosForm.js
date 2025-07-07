import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createSosRequest, updateSosRequest } from '../../services/api.js';
import { BUILDING_OPTIONS, getBuildingType } from '../../constants/buildings.js';

export const useSosForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    selectedBuilding: '',
    title: '',
    content: '',
    chatLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 수정 모드 확인
  const editMode = location.state?.editMode || false;
  const requestData = location.state?.requestData || null;

  // 백엔드 BuildingType enum과 일치하는 건물 목록 사용
  const buildings = BUILDING_OPTIONS.map(building => ({
    id: building.type,
    name: building.label
  }));

  // 수정 모드일 경우 기존 데이터로 폼 초기화
  useEffect(() => {
    if (editMode && requestData) {
      setFormData({
        selectedBuilding: requestData.location,
        title: requestData.title,
        content: requestData.description,
        chatLink: requestData.openChatUrl || ''
      });
    }
  }, [editMode, requestData]);

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
      // 선택된 건물 라벨에서 BuildingType enum 값 추출
      const buildingType = getBuildingType(formData.selectedBuilding);
      
      // API 호출용 데이터 구성
      const sosData = {
        building: buildingType,
        title: formData.title,
        content: formData.content,
        openChatUrl: formData.chatLink
      };
      
      console.log('SOS 요청 데이터:', sosData);
      
      let response;
      if (editMode && requestData) {
        // 수정 모드: 업데이트 API 호출
        response = await updateSosRequest(requestData.id, sosData);
      } else {
        // 생성 모드: 생성 API 호출
        response = await createSosRequest(sosData);
      }
      
      if (response.status === 'success') {
        const message = editMode ? '수정이 완료되었습니다!!' : '요청이 등록되었습니다!!';
        showModalMessage(message);
        
        // 폼 초기화 (생성 모드에서만)
        if (!editMode) {
          resetForm();
        }
        
        setTimeout(() => {
          navigate('/main');
        }, 2000);
      } else {
        const message = editMode ? '수정에 실패했습니다.' : '요청 등록에 실패했습니다.';
        showModalMessage(response.message || message);
      }
      
    } catch (error) {
      console.error('SOS 요청 실패:', error);
      
      // 에러 상태에 따른 메시지 처리
      if (error.response?.status === 401) {
        showModalMessage('로그인이 필요합니다. 다시 로그인해주세요.');
        setTimeout(() => {
          navigate('/auth');
        }, 2000);
      } else if (error.response?.status === 403) {
        const message = editMode ? '본인이 작성한 글만 수정할 수 있습니다.' : '권한이 없습니다.';
        showModalMessage(message);
      } else if (error.response?.data?.message) {
        showModalMessage(error.response.data.message);
      } else {
        const message = editMode ? '수정 중 오류가 발생했습니다.' : '요청 등록에 실패했습니다.';
        showModalMessage(message + ' 다시 시도해주세요.');
      }
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
    setShowModal,
    editMode,
    requestData
  };
}; 