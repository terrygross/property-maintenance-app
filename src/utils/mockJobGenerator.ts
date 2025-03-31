import { v4 as uuidv4 } from "uuid";
import { mockProperties } from "@/data/mockProperties";

interface MockJobOptions {
  count?: number;
  includeHighPriority?: number;
  includePhotos?: boolean;
  properties?: string[];
}

export interface MockJob {
  id: string;
  title: string;
  description: string;
  property: string;
  reportDate: string;
  priority: "low" | "medium" | "high";
  status: "unassigned" | "assigned" | "in_progress" | "completed";
  assignedTo?: string;
  emailSent?: boolean;
  imageUrl?: string;
  alertShown?: boolean;
  timestamp: string;
  highPriority?: boolean;
  alertsSent?: number;
  lastAlertTime?: string | null;
}

// These functions now do nothing but remain for backward compatibility
export const generateMockJobs = (options: MockJobOptions = {}): MockJob[] => {
  console.log("Mock job generation has been disabled");
  return [];
};

export const resetJobsWithMockData = (): void => {
  console.log("Job reset functionality has been disabled");
};
