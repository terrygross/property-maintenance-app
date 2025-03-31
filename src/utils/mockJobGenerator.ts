
import { v4 as uuidv4 } from "uuid";
import { mockProperties } from "@/data/mockProperties";

interface MockJobOptions {
  count?: number;
  includeHighPriority?: number; // Number of high priority jobs
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

// Common maintenance issues that can occur at properties
const maintenanceIssues = [
  { title: "Leaking Faucet", description: "Kitchen faucet is constantly dripping" },
  { title: "Broken A/C", description: "Air conditioning unit not cooling properly" },
  { title: "Toilet Clog", description: "Toilet in main bathroom is clogged and overflowing" },
  { title: "Electrical Outlet", description: "Outlet in living room not working" },
  { title: "Window Damage", description: "Cracked window in bedroom needs replacement" },
  { title: "Broken Lock", description: "Front door lock is jammed and difficult to open" },
  { title: "Light Fixture", description: "Ceiling light in hallway flickering and making noise" },
  { title: "Water Heater", description: "No hot water from any faucets" },
  { title: "Smoke Detector", description: "Smoke detector beeping intermittently" },
  { title: "Dishwasher Leak", description: "Water leaking from dishwasher during cycles" },
  { title: "Garbage Disposal", description: "Disposal jammed and making loud noises" },
  { title: "HVAC Issues", description: "Heating system not working as temperatures drop" },
  { title: "Mold Growth", description: "Black mold forming in bathroom ceiling" },
  { title: "Carpet Damage", description: "Large stain and tear in living room carpet" },
  { title: "Pest Problem", description: "Signs of rodent activity in kitchen area" }
];

// Random reporter names
const reporterNames = [
  "John Smith", "Maria Garcia", "Wei Chen", "Aisha Johnson", 
  "Carlos Rodriguez", "Sarah Kim", "Mohammed Ali", "Emma Brown",
  "Raj Patel", "Olivia Wilson", "Diego Hernandez", "Fatima Hassan"
];

// Sample property locations
const locations = [
  "Apt 101", "Apt 205", "Main Lobby", 
  "Parking Garage", "Pool Area", "Roof Access", "Utility Room",
  "3rd Floor Hallway", "Apt 310", "Fitness Center"
];

// Sample image URLs (placeholder images)
const sampleImages = [
  "https://placehold.co/600x400?text=Leaking+Pipe",
  "https://placehold.co/600x400?text=Broken+Window",
  "https://placehold.co/600x400?text=Electrical+Issue",
  "https://placehold.co/600x400?text=HVAC+Problem",
  "https://placehold.co/600x400?text=Plumbing+Issue",
  "https://placehold.co/600x400?text=Damage+Report"
];

// Helper function to get actual property names from mockProperties
const getActualPropertyNames = (): string[] => {
  // Filter only active properties
  return mockProperties
    .filter(property => property.status === "active")
    .map(property => property.name);
};

/**
 * Generates a set of mock maintenance jobs for testing
 */
export const generateMockJobs = (options: MockJobOptions = {}): MockJob[] => {
  // Get actual property names for generating realistic mock data
  const actualPropertyNames = getActualPropertyNames();
  
  const {
    count = 15,
    includeHighPriority = 3,
    includePhotos = true,
    // Use actual property names if available, otherwise fallback to provided ones
    properties = actualPropertyNames.length > 0 ? actualPropertyNames : ["Sunset Apartments", "Downtown Plaza", "Riverfront Warehouse"]
  } = options;
  
  const jobs: MockJob[] = [];
  const now = new Date();
  
  // Create the specified number of jobs
  for (let i = 0; i < count; i++) {
    // Get random issue
    const issueIndex = Math.floor(Math.random() * maintenanceIssues.length);
    const issue = maintenanceIssues[issueIndex];
    
    // Generate random date within the last 7 days
    const randomDaysAgo = Math.floor(Math.random() * 7);
    const reportDate = new Date(now);
    reportDate.setDate(reportDate.getDate() - randomDaysAgo);
    
    // Determine if this should be a high priority job
    const isHighPriority = i < includeHighPriority;
    
    // Select random property from actual properties list
    const propertyIndex = Math.floor(Math.random() * properties.length);
    const property = properties[propertyIndex];
    
    // Select random location
    const locationIndex = Math.floor(Math.random() * locations.length);
    const location = locations[locationIndex];
    
    // Generate reporter name
    const reporterIndex = Math.floor(Math.random() * reporterNames.length);
    const reporterName = reporterNames[reporterIndex];
    
    // Image URL
    const imageIndex = Math.floor(Math.random() * sampleImages.length);
    const imageUrl = includePhotos ? sampleImages[imageIndex] : undefined;
    
    // Create the job - CRITICAL FIX: explicitly set status to "unassigned"
    const job: MockJob = {
      id: `job-${Date.now()}-${i}`,
      title: `${issue.title} - Reported by ${reporterName}`,
      description: `${issue.description} at ${property}, ${location}`,
      property: property, // Now using validated property names
      reportDate: reportDate.toISOString().split("T")[0],
      priority: isHighPriority ? "high" : Math.random() > 0.5 ? "medium" : "low",
      status: "unassigned", // Explicitly set to unassigned
      imageUrl: imageUrl,
      timestamp: new Date().toISOString(),
      highPriority: isHighPriority,
      alertsSent: isHighPriority ? 1 : 0,
      lastAlertTime: isHighPriority ? new Date().toISOString() : null,
      alertShown: false
    };
    
    jobs.push(job);
  }
  
  console.log(`Generated ${jobs.length} mock jobs with actual property names, all with 'unassigned' status`);
  return jobs;
};

/**
 * Clears all existing jobs and initializes the system with fresh mock jobs
 */
export const resetJobsWithMockData = (): void => {
  // Generate new mock jobs
  const mockJobs = generateMockJobs();
  
  // Save to localStorage
  localStorage.setItem('reporterJobs', JSON.stringify(mockJobs));
  
  // Dispatch an event to notify any listeners
  const event = new Event('jobsUpdated');
  document.dispatchEvent(event);
  
  // Also update localStorage to trigger other components
  const storageEvent = new StorageEvent('storage', { key: 'reporterJobs' });
  window.dispatchEvent(storageEvent);
  
  console.log(`Reset system with ${mockJobs.length} new mock jobs using actual property names, all unassigned`);
};
