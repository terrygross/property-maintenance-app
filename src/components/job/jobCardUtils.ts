
import { MOCK_USERS } from "@/data/mockUsers";

// Filter technicians from MOCK_USERS
export const TECHNICIANS = MOCK_USERS.filter(user => 
  user.role === "maintenance_tech" || user.role === "contractor"
);

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-blue-100 text-blue-800";
  }
};

export const formatStatus = (status: string): string => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const getTechnicianName = (technicianId: string): string => {
  const technician = TECHNICIANS.find(t => t.id === technicianId);
  return technician ? `${technician.first_name} ${technician.last_name}` : "Unknown";
};

export const isTechnicianContractor = (technicianId: string): boolean => {
  const technician = TECHNICIANS.find(t => t.id === technicianId);
  return technician?.role === "contractor" || false;
};

export const isTechnicianMaintenanceTech = (technicianId: string): boolean => {
  const technician = TECHNICIANS.find(t => t.id === technicianId);
  return technician?.role === "maintenance_tech" || false;
};

export const getAssignedTech = (assignedTo?: string) => {
  if (!assignedTo) return null;
  return TECHNICIANS.find(t => t.id === assignedTo);
};
