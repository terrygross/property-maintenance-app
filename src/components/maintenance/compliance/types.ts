
export type ComplianceStatus = "active" | "archived";

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
}
