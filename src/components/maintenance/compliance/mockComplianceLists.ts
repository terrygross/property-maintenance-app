
import { ComplianceList } from './types';

// Mock data for demonstration
export const mockComplianceLists: ComplianceList[] = [
  {
    id: "1",
    title: "Monthly Safety Inspection",
    description: "Standard safety inspection checklist for all properties",
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 15),
    status: "active",
    fileUrl: "#",
    version: 1,
    propertyId: "1",
    propertyName: "Oak Apartments"
  },
  {
    id: "2",
    title: "HVAC Maintenance Checklist",
    description: "Monthly HVAC system inspection requirements",
    createdAt: new Date(2023, 4, 10),
    updatedAt: new Date(2023, 5, 1),
    status: "active",
    fileUrl: "#",
    version: 2,
    propertyId: "2",
    propertyName: "Maple Heights"
  },
  {
    id: "3",
    title: "Fire Safety Compliance",
    description: "Quarterly fire safety equipment inspection",
    createdAt: new Date(2023, 3, 22),
    updatedAt: new Date(2023, 3, 22),
    status: "archived",
    fileUrl: "#",
    version: 1,
    propertyId: "1",
    propertyName: "Oak Apartments"
  },
  {
    id: "4",
    title: "Plumbing System Inspection",
    description: "Monthly plumbing system maintenance checks",
    createdAt: new Date(2023, 5, 5),
    updatedAt: new Date(2023, 5, 5),
    status: "active",
    fileUrl: "#",
    version: 1,
    propertyId: "3",
    propertyName: "Cedar Plaza"
  }
];
