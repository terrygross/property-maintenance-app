
/**
 * Re-export the useHighPriorityJobs hook for backward compatibility
 */

import { useHighPriorityJobs } from "./highPriorityJobs/useHighPriorityJobs";
export { useHighPriorityJobs };

// Re-export all high priority job-related hooks and types
export * from "./highPriorityJobs";

