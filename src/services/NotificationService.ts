
import { useToast } from "@/hooks/use-toast";

// Check if Push API is supported in the browser
const isPushSupported = () => {
  return "Notification" in window && "serviceWorker" in navigator;
};

// Request permission for push notifications
export const requestPushPermission = async (): Promise<boolean> => {
  if (!isPushSupported()) {
    console.log("Push notifications not supported");
    return false;
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

// Send a browser push notification
export const sendPushNotification = (title: string, options: NotificationOptions = {}): boolean => {
  if (!isPushSupported() || Notification.permission !== "granted") {
    console.log("Push notification permission not granted");
    return false;
  }
  
  try {
    const notification = new Notification(title, {
      icon: "/favicon.ico",
      ...options
    });
    
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
    return true;
  } catch (error) {
    console.error("Error sending push notification:", error);
    return false;
  }
};

// Register service worker for push notifications (needed for background notifications)
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isPushSupported()) {
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/notification-sw.js');
    return registration;
  } catch (error) {
    console.error("Error registering service worker:", error);
    return null;
  }
};

// Store user notification preferences in localStorage
export const saveNotificationPreferences = (userId: string, preferences: NotificationPreferences): void => {
  try {
    localStorage.setItem(`notificationPreferences:${userId}`, JSON.stringify(preferences));
  } catch (error) {
    console.error("Error saving notification preferences:", error);
  }
};

// Get user notification preferences from localStorage
export const getNotificationPreferences = (userId: string): NotificationPreferences => {
  try {
    const prefs = localStorage.getItem(`notificationPreferences:${userId}`);
    if (prefs) {
      return JSON.parse(prefs);
    }
  } catch (error) {
    console.error("Error getting notification preferences:", error);
  }
  
  // Default preferences
  return {
    pushEnabled: true,
    smsEnabled: true,
    emailEnabled: true,
    highPriorityOnly: false
  };
};

// Interface for notification preferences
export interface NotificationPreferences {
  pushEnabled: boolean;
  smsEnabled: boolean;
  emailEnabled: boolean;
  highPriorityOnly: boolean;
}

// Mock SMS notification function (would be replaced with actual SMS service integration)
export const sendSMSNotification = (phoneNumber: string, message: string): Promise<boolean> => {
  // In a real implementation, this would call a Supabase Edge Function that uses Twilio or another SMS service
  console.log(`[MOCK] Sending SMS to ${phoneNumber}: ${message}`);
  return Promise.resolve(true);
};

// Utility to notify user across multiple channels based on preferences
export const notifyUser = async (
  userId: string,
  title: string,
  message: string,
  phoneNumber?: string,
  priority: 'high' | 'medium' | 'low' = 'medium'
): Promise<void> => {
  const preferences = getNotificationPreferences(userId);
  
  // Only proceed if this is a high priority notification or if user accepts all priorities
  if (priority !== 'high' && preferences.highPriorityOnly) {
    return;
  }
  
  // Send push notification if enabled
  if (preferences.pushEnabled) {
    sendPushNotification(title, {
      body: message,
      tag: `job-${Date.now()}`,
      requireInteraction: priority === 'high'
    });
  }
  
  // Send SMS if enabled and phone number provided
  if (preferences.smsEnabled && phoneNumber) {
    await sendSMSNotification(phoneNumber, `${title}: ${message}`);
  }
};

// Utility to notify all technicians for high priority jobs
export const notifyTechnicianTeam = (
  technicians: any[],
  jobTitle: string,
  property: string
): void => {
  const title = "⚠️ HIGH PRIORITY MAINTENANCE REQUEST";
  const message = `Urgent job reported at ${property}: ${jobTitle}`;
  
  technicians.forEach(tech => {
    if (tech.phone) {
      notifyUser(tech.id, title, message, tech.phone, 'high');
    }
  });
  
  // Also display an in-app toast notification
  const { toast } = useToast();
  toast({
    title,
    description: message,
    variant: "destructive",
    duration: 10000, // Show for 10 seconds
  });
};
