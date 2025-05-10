
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { NOTIFICATION_ENDPOINTS, apiRequest } from '@/config/api';

// Types for our notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: Date;
  read: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    // In a real app, you might set up polling or websockets here
    // for real-time notifications
  }, []);

  // Function to fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // INTEGRATION POINT: Backend API call to fetch notifications
      // Connect to your actual backend API here
      // const data = await apiRequest(NOTIFICATION_ENDPOINTS.LIST);
      // setNotifications(data);
      
      // Mock data for frontend development
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'New Issue Match',
          message: 'Found a new issue matching your skills!',
          type: 'info',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          title: 'Contribution Approved',
          message: 'Your pull request was merged!',
          type: 'success',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          read: true
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Couldn't load notifications",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      // INTEGRATION POINT: Backend API call to mark notification as read
      // await apiRequest(NOTIFICATION_ENDPOINTS.READ(notificationId), {
      //   method: 'PUT'
      // });
      
      // Update local state
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: "Couldn't update notification",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  return {
    notifications,
    loading,
    fetchNotifications,
    markAsRead
  };
};
