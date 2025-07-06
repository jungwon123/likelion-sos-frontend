import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentBuildingState,
  globalLoadingState,
  notificationsState,
  sosRequestsState,
} from '../../state';

export const useAppState = () => {
  const [currentBuilding, setCurrentBuilding] = useRecoilState(currentBuildingState);
  const [isLoading, setIsLoading] = useRecoilState(globalLoadingState);
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const [sosRequests, setSosRequests] = useRecoilState(sosRequestsState);

  // 알림 추가
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // 알림 읽음 처리
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // 모든 알림 읽음 처리
  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // SOS 요청 목록 업데이트
  const updateSosRequests = (requests) => {
    setSosRequests(requests);
  };

  // 새 SOS 요청 추가
  const addSosRequest = (request) => {
    setSosRequests(prev => [request, ...prev]);
  };

  // SOS 요청 상태 업데이트
  const updateSosRequestStatus = (requestId, status) => {
    setSosRequests(prev =>
      prev.map(request =>
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  return {
    // 상태값들
    currentBuilding,
    isLoading,
    notifications,
    sosRequests,
    
    // 액션들
    setCurrentBuilding,
    setIsLoading,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    updateSosRequests,
    addSosRequest,
    updateSosRequestStatus,
    
    // 계산된 값들
    unreadNotificationCount: notifications.filter(n => !n.read).length,
    hasUnreadNotifications: notifications.some(n => !n.read),
  };
}; 