
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define types for all the settings sections
export interface GeneralSettings {
  systemName: string;
  logoUrl: string;
  defaultTimezone: string;
  defaultLanguage: string;
  emailTemplateId: string;
}

export interface SecuritySettings {
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecialChars: boolean;
  passwordExpiryDays: number;
  sessionTimeoutMinutes: number;
  enforceMfa: boolean;
  allowedIpRanges: string[];
}

export interface MaintenanceSettings {
  defaultSlaCritical: number;
  defaultSlaHigh: number;
  defaultSlaMedium: number;
  defaultSlaLow: number;
  priorityLevels: { id: string; name: string; color: string }[];
  statusCategories: { id: string; name: string; color: string }[];
  workflowSteps: { id: string; name: string; order: number }[];
}

export interface IntegrationSettings {
  emailServer: {
    host: string;
    port: number;
    username: string;
    useSsl: boolean;
  };
  smsGateway: {
    provider: string;
    apiKey: string;
    senderId: string;
  };
  thirdPartyApiKeys: {
    name: string;
    key: string;
  }[];
  exportFormats: string[];
}

export interface NotificationSettings {
  alertThresholds: {
    criticalJobs: number;
    highPriorityJobs: number;
    pendingApprovals: number;
  };
  escalationPaths: {
    id: string;
    name: string;
    levels: { roleId: string; delayMinutes: number }[];
  }[];
  notificationSchedule: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    daysOfWeek: string[];
  };
  reminderFrequency: {
    pending: number;
    inProgress: number;
    overdue: number;
  };
}

export interface ThemeSettings {
  mode: 'dark' | 'light' | 'system';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    button: string;
  };
  borderRadius: 'small' | 'medium' | 'large';
}

export interface SystemSettings {
  general: GeneralSettings;
  security: SecuritySettings;
  maintenance: MaintenanceSettings;
  integration: IntegrationSettings;
  notification: NotificationSettings;
  theme: ThemeSettings;
}

// Default settings
const defaultSettings: SystemSettings = {
  general: {
    systemName: "Maintenance Management System",
    logoUrl: "/logo.png",
    defaultTimezone: "UTC",
    defaultLanguage: "en",
    emailTemplateId: "default",
  },
  security: {
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    enforceMfa: false,
    allowedIpRanges: ["0.0.0.0/0"],
  },
  maintenance: {
    defaultSlaCritical: 4,
    defaultSlaHigh: 24,
    defaultSlaMedium: 48,
    defaultSlaLow: 72,
    priorityLevels: [
      { id: "critical", name: "Critical", color: "#FF0000" },
      { id: "high", name: "High", color: "#FFA500" },
      { id: "medium", name: "Medium", color: "#FFFF00" },
      { id: "low", name: "Low", color: "#00FF00" },
    ],
    statusCategories: [
      { id: "new", name: "New", color: "#0000FF" },
      { id: "in_progress", name: "In Progress", color: "#FFA500" },
      { id: "completed", name: "Completed", color: "#00FF00" },
      { id: "on_hold", name: "On Hold", color: "#808080" },
    ],
    workflowSteps: [
      { id: "reported", name: "Reported", order: 1 },
      { id: "assigned", name: "Assigned", order: 2 },
      { id: "in_progress", name: "In Progress", order: 3 },
      { id: "review", name: "Review", order: 4 },
      { id: "completed", name: "Completed", order: 5 },
    ],
  },
  integration: {
    emailServer: {
      host: "smtp.example.com",
      port: 587,
      username: "notifications@example.com",
      useSsl: true,
    },
    smsGateway: {
      provider: "Twilio",
      apiKey: "",
      senderId: "Maintenance",
    },
    thirdPartyApiKeys: [
      { name: "Weather API", key: "" },
      { name: "Maps API", key: "" },
    ],
    exportFormats: ["CSV", "PDF", "JSON", "Excel"],
  },
  notification: {
    alertThresholds: {
      criticalJobs: 1,
      highPriorityJobs: 5,
      pendingApprovals: 3,
    },
    escalationPaths: [
      {
        id: "maintenance_issues",
        name: "Maintenance Issues",
        levels: [
          { roleId: "maintenance_tech", delayMinutes: 0 },
          { roleId: "maintenance_manager", delayMinutes: 60 },
          { roleId: "admin", delayMinutes: 120 },
        ],
      },
    ],
    notificationSchedule: {
      enabled: true,
      startTime: "08:00",
      endTime: "18:00",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    reminderFrequency: {
      pending: 24,
      inProgress: 48,
      overdue: 4,
    },
  },
  theme: {
    mode: 'light',
    colors: {
      primary: '#0079FF',
      secondary: '#3A86FF',
      accent: '#8338EC',
      border: '#E2E8F0',
      button: '#0079FF',
    },
    borderRadius: 'medium',
  },
};

export const useSystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [activeSection, setActiveSection] = useState<keyof SystemSettings>("general");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("systemSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error loading settings:", error);
        // If there's an error parsing, use default settings
        setSettings(defaultSettings);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    setIsSaving(true);
    try {
      localStorage.setItem("systemSettings", JSON.stringify(settings));
      toast({
        title: "Settings saved",
        description: "Your system settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Update specific section of settings
  const updateSettings = <T extends keyof SystemSettings>(
    section: T,
    newValues: Partial<SystemSettings[T]>
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newValues,
      },
    }));
  };

  // Reset settings to default values
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("systemSettings");
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  return {
    settings,
    activeSection,
    setActiveSection,
    updateSettings,
    saveSettings,
    resetSettings,
    isSaving,
  };
};
