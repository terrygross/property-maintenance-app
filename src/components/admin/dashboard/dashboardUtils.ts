
// Utility functions for dashboard components

import { useAppState } from "@/context/AppStateContext";

// Count users by role
export const countUsersByRole = (users: any[], role: string): number => {
  return users.filter(user => user.role === role).length;
};

// Get counts for various sections
export const getTabCount = (tabId: string, users: any[], properties: any[], unassignedJobs: any[]): number | null => {
  const technicianCount = countUsersByRole(users, "maintenance_tech");
  const contractorCount = countUsersByRole(users, "contractor");
  
  switch (tabId) {
    case "users": return technicianCount;
    case "properties": return properties.length;
    case "maintenance": return contractorCount;
    case "reporter": return unassignedJobs.length > 0 ? unassignedJobs.length : 0; // Ensure we return 0 if no jobs
    case "tech-view": return technicianCount;
    case "reports": return 4;
    case "chat": return 12;
    case "compliance": return 3;
    case "billing": return 1;
    case "maintenance-jobcards": return 8;
    default: return null;
  }
};

// Get descriptions for various cards
export const getCardDescription = (tabId: string): string => {
  switch (tabId) {
    case "users": return "Maintenance technicians";
    case "properties": return "Registered properties";
    case "maintenance": return "Registered contractors";
    case "reporter": return "Unassigned jobs";
    case "tech-view": return "Technician views";
    case "reports": return "Report categories";
    case "chat": return "New messages";
    case "compliance": return "Active lists";
    case "billing": return "Active subscription";
    case "reporter-management": return "Base (2) + (1) Additional station";
    case "jobs": return "Active jobs";
    case "maintenance-jobcards": return "Assigned job cards";
    case "settings": return "System configurations";
    case "logs": return "System events";
    case "backup": return "Backup operations";
    case "recycle-bin": return "Deleted items";
    default: return "";
  }
};

// Get background colors for cards
export const getCardStyles = (index: number, hasAlert: boolean = false): string => {
  if (hasAlert) {
    return "bg-white hover:bg-red-50 border-red-400 animate-pulse";
  }
  
  const colorClasses = [
    "bg-white hover:bg-blue-50 border-blue-300",
    "bg-white hover:bg-green-50 border-blue-300",
    "bg-white hover:bg-purple-50 border-blue-300",
    "bg-white hover:bg-yellow-50 border-blue-300",
    "bg-white hover:bg-red-50 border-blue-300",
    "bg-white hover:bg-teal-50 border-blue-300",
    "bg-white hover:bg-slate-50 border-blue-300",
    "bg-white hover:bg-indigo-50 border-blue-300",
    "bg-white hover:bg-orange-50 border-blue-300",
    "bg-white hover:bg-emerald-50 border-blue-300",
    "bg-white hover:bg-pink-50 border-blue-300",
    "bg-white hover:bg-cyan-50 border-blue-300",
    "bg-white hover:bg-amber-50 border-blue-300",
    "bg-white hover:bg-lime-50 border-blue-300",
    "bg-white hover:bg-violet-50 border-blue-300",
    "bg-white hover:bg-fuchsia-50 border-blue-300",
    "bg-white hover:bg-rose-50 border-blue-300"
  ];
  return colorClasses[index % colorClasses.length];
};

// Get text colors for icons
export const getIconColor = (index: number): string => {
  const colorClasses = [
    "text-blue-500",
    "text-green-500",
    "text-purple-500",
    "text-yellow-500",
    "text-red-500",
    "text-teal-500",
    "text-slate-500",
    "text-indigo-500",
    "text-orange-500",
    "text-emerald-500",
    "text-pink-500",
    "text-cyan-500",
    "text-amber-500",
    "text-lime-500",
    "text-violet-500",
    "text-fuchsia-500",
    "text-rose-500"
  ];
  return colorClasses[index % colorClasses.length];
};

// Check if any jobs are high priority
export const hasHighPriorityJobs = (jobs: any[]): boolean => {
  return jobs.some(job => job.priority === "high" || job.highPriority === true);
};
