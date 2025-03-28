
export interface LeaveRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason?: string;
}

export type LeaveAction = "approve" | "deny" | "reschedule";
