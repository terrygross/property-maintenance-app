
import React, { createContext, useContext, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  autoDismiss?: boolean;
  duration?: number;
}

interface NotificationContextValue {
  notify: (title: string, message: string, type: NotificationType, options?: { autoDismiss?: boolean, duration?: number }) => void;
  notifySuccess: (title: string, message: string) => void;
  notifyError: (title: string, message: string) => void;
  notifyInfo: (title: string, message: string) => void;
  notifyWarning: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
  const notify = useCallback((title: string, message: string, type: NotificationType, options?: { autoDismiss?: boolean, duration?: number }) => {
    const variant = type === "success" ? "default" : type === "error" ? "destructive" : "default";
    
    toast({
      title,
      description: message,
      variant: variant,
      duration: options?.duration || 5000,
    });
  }, [toast]);

  const notifySuccess = useCallback((title: string, message: string) => {
    notify(title, message, "success");
  }, [notify]);

  const notifyError = useCallback((title: string, message: string) => {
    notify(title, message, "error");
  }, [notify]);

  const notifyInfo = useCallback((title: string, message: string) => {
    notify(title, message, "info");
  }, [notify]);

  const notifyWarning = useCallback((title: string, message: string) => {
    notify(title, message, "warning");
  }, [notify]);

  const value = {
    notify,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
