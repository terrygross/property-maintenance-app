
export type ComplianceStatus = "active" | "archived" | "assigned" | "completed" | "deleted";

export type ComplianceFormMode = "create" | "edit";

export interface ComplianceList {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: ComplianceStatus;
  fileUrl: string;
  version: number;
  propertyId: string;   // Property reference
  propertyName?: string; // For display purposes
  assignedTo?: string;  // User ID of assigned technician
  assignedToName?: string; // Name of assigned technician
  completedAt?: Date;  // When the list was marked as completed
  notes?: string;      // Additional notes from the technician
  deletedAt?: Date;    // When the list was moved to recycle bin
  checkedItems?: Record<string, boolean>; // Tracks which items have been checked
  lastUpdatedBy?: string; // User who last updated the list
}
