
/**
 * A simple pub/sub notification service for managing application events
 */

type Subscriber<T = any> = (data: T) => void;

interface SubscriptionMap {
  [eventName: string]: Subscriber[];
}

class NotificationService {
  private subscribers: SubscriptionMap = {};

  /**
   * Subscribe to an event
   * @param eventName The event to subscribe to
   * @param callback The callback to execute when the event is published
   * @returns A function to unsubscribe
   */
  subscribe<T = any>(eventName: string, callback: Subscriber<T>): () => void {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }

    this.subscribers[eventName].push(callback as Subscriber);

    // Return an unsubscribe function
    return () => {
      this.subscribers[eventName] = this.subscribers[eventName].filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Publish an event with optional data
   * @param eventName The event to publish
   * @param data Optional data to pass to subscribers
   */
  publish<T = any>(eventName: string, data?: T): void {
    if (!this.subscribers[eventName]) {
      return;
    }

    this.subscribers[eventName].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${eventName} event handler:`, error);
      }
    });
  }

  /**
   * Remove all subscribers for an event
   * @param eventName The event to clear subscribers for
   */
  clearEvent(eventName: string): void {
    this.subscribers[eventName] = [];
  }

  /**
   * Check if an event has subscribers
   * @param eventName The event to check
   * @returns True if the event has subscribers
   */
  hasSubscribers(eventName: string): boolean {
    return !!this.subscribers[eventName]?.length;
  }
}

// Create a singleton instance
export const notificationService = new NotificationService();

// Define common event names as constants to prevent typos
export const EVENTS = {
  COMPLIANCE_LISTS_UPDATED: 'compliance-lists-updated',
  COMPLIANCE_LIST_ASSIGNED: 'compliance-list-assigned',
  COMPLIANCE_LIST_COMPLETED: 'compliance-list-completed',
  COMPLIANCE_LIST_DELETED: 'compliance-list-deleted',
  COMPLIANCE_LIST_RESTORED: 'compliance-list-restored',
};

