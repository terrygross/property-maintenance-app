
import { v4 as uuidv4 } from "uuid";

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
  "Building A, Apt 101", "Building B, Apt 205", "Main Lobby", 
  "Parking Garage", "Pool Area", "Roof Access", "Utility Room",
  "3rd Floor Hallway", "Building C, Apt 310", "Fitness Center"
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

/**
 * Generates a set of mock maintenance jobs for testing
 */
export const generateMockJobs = (options: MockJobOptions = {}): MockJob[] => {
  const {
    count = 15,
    includeHighPriority = 3,
    includePhotos = true,
    properties = ["Sunset Apartments", "Downtown Plaza", "Riverfront Warehouse"]
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
    
    // Select random property
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
    
    // Create the job
    const job: MockJob = {
      id: `job${Date.now()}-${i}`,
      title: `Maintenance Request - ${reporterName}`,
      description: `${issue.title}: ${issue.description} at ${location}`,
      property: property,
      reportDate: reportDate.toISOString().split("T")[0],
      priority: isHighPriority ? "high" : Math.random() > 0.5 ? "medium" : "low",
      status: "unassigned", // Make sure all newly generated jobs are unassigned
      imageUrl: imageUrl,
      timestamp: new Date().toISOString(),
      highPriority: isHighPriority,
      alertsSent: isHighPriority ? 1 : 0,
      lastAlertTime: isHighPriority ? new Date().toISOString() : null,
      alertShown: false
    };
    
    jobs.push(job);
  }
  
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
  
  console.log(`Reset system with ${mockJobs.length} new mock jobs`);
};
