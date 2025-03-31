
/**
 * Re-export the useAssignedJobs hook for backward compatibility
 */

import { useAssignedJobs } from "./jobs/useAssignedJobs";
export { useAssignedJobs };

// Re-export all job-related hooks and types
export * from "./jobs";
