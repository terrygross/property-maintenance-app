
import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { notificationService, EVENTS } from '@/services/notification-service';

type NotificationContextType = {
  showNotification: (title: string, description: string, variant?: 'default' | 'destructive') => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  const showNotification = useCallback(
    (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
      toast({
        title,
        description,
        variant,
      });
    },
    [toast]
  );

  // Listen for compliance list assignment notifications
  useEffect(() => {
    const unsubscribe = notificationService.subscribe(
      EVENTS.COMPLIANCE_LIST_ASSIGNED,
      ({ techId, techName }) => {
        showNotification(
          'List Assigned',
          `A compliance list has been assigned to ${techName}.`
        );
      }
    );
    return unsubscribe;
  }, [showNotification]);

  // Listen for compliance list completion notifications
  useEffect(() => {
    const unsubscribe = notificationService.subscribe(
      EVENTS.COMPLIANCE_LIST_COMPLETED,
      ({ listId, list }) => {
        showNotification(
          'List Completed',
          `"${list?.title || 'Compliance list'}" has been marked as completed.`
        );
      }
    );
    return unsubscribe;
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
