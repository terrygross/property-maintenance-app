
import { v4 as uuidv4 } from "uuid";
import { mockProperties } from "@/data/mockProperties";
import { useToast } from "@/hooks/use-toast";

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

// Sample job titles for better demo data
const sampleJobTitles = [
  "Leaking faucet in kitchen",
  "Broken window in living room",
  "HVAC system not working",
  "Garage door opener malfunctioning",
  "Water damage on ceiling",
  "Electrical outlet not working",
  "Clogged toilet in master bathroom",
  "Broken lock on front door",
  "Pest infestation in kitchen",
  "Damaged flooring in entryway"
];

// Generate a predefined set of jobs instead of random ones
export const generateMockJobs = (options: MockJobOptions = {}): MockJob[] => {
  const { count = 5, includeHighPriority = 1, properties = mockProperties.map(p => p.id) } = options;
  
  const defaultJobs: MockJob[] = [];
  
  for (let i = 0; i < count; i++) {
    const isHighPriority = i < includeHighPriority;
    const propertyId = properties[i % properties.length];
    
    defaultJobs.push({
      id: uuidv4(),
      title: sampleJobTitles[i % sampleJobTitles.length],
      description: `This is a sample maintenance job for demonstration purposes. Job #${i + 1}`,
      property: propertyId,
      reportDate: new Date(Date.now() - i * 86400000).toISOString(),
      priority: isHighPriority ? "high" : i % 3 === 0 ? "medium" : "low",
      status: i % 4 === 0 ? "completed" : i % 3 === 0 ? "in_progress" : i % 2 === 0 ? "assigned" : "unassigned",
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      highPriority: isHighPriority,
      alertsSent: isHighPriority ? Math.floor(Math.random() * 3) : 0,
      lastAlertTime: isHighPriority ? new Date().toISOString() : null,
    });
  }
  
  return defaultJobs;
};

// Store jobs in localStorage to maintain state between page refreshes
export const resetJobsWithMockData = (): void => {
  try {
    const jobs = generateMockJobs({ count: 10, includeHighPriority: 2 });
    localStorage.setItem("mockJobs", JSON.stringify(jobs));
    console.log("Demo data has been loaded successfully");
    
    // The useToast hook can only be used within a component, 
    // so this is commented out and would need to be implemented where this function is called
    // toast({
    //   title: "Demo data loaded",
    //   description: "Sample maintenance jobs have been generated.",
    // });
  } catch (error) {
    console.error("Failed to reset jobs with mock data:", error);
  }
};

// Helper function to get saved jobs
export const getSavedJobs = (): MockJob[] => {
  try {
    const savedJobs = localStorage.getItem("mockJobs");
    if (savedJobs) {
      return JSON.parse(savedJobs);
    }
  } catch (error) {
    console.error("Error retrieving saved jobs:", error);
  }
  
  // If no saved jobs or error, generate new ones
  const newJobs = generateMockJobs();
  localStorage.setItem("mockJobs", JSON.stringify(newJobs));
  return newJobs;
};
