
import { useEffect } from 'react';
import { notificationService, EVENTS } from '../services/notification-service';

type NotificationCallback<T = any> = (data: T) => void;

/**
 * Hook to subscribe to notification events
 */
export function useNotification<T = any>(
  eventName: string,
  callback: NotificationCallback<T>
) {
  useEffect(() => {
    // Subscribe to the event when the component mounts
    const unsubscribe = notificationService.subscribe<T>(eventName, callback);
    
    // Return cleanup function to unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, [eventName, callback]);
}

/**
 * Specialized hook for compliance list updates
 */
export function useComplianceListUpdates(callback: NotificationCallback) {
  return useNotification(EVENTS.COMPLIANCE_LISTS_UPDATED, callback);
}

/**
 * Specialized hook for compliance list assignments
 */
export function useComplianceListAssignments(callback: NotificationCallback) {
  return useNotification(EVENTS.COMPLIANCE_LIST_ASSIGNED, callback);
}

/**
 * Specialized hook for compliance list completions
 */
export function useComplianceListCompletions(callback: NotificationCallback) {
  return useNotification(EVENTS.COMPLIANCE_LIST_COMPLETED, callback);
}

