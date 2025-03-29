
export type ComplianceStatus = "active" | "archived" | "assigned" | "completed";

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
}
