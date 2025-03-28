
export interface WorkflowRule {
  id: number;
  name: string;
  description: string;
  trigger: string;
  condition: string;
  action: string;
  actionTarget: string;
  isActive: boolean;
}
