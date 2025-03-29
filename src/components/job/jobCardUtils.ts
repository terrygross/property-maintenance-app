
import { useAppState } from "@/context/AppStateContext";

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

export const isTechnicianContractor = (technicianId: string): boolean => {
  // This function will need to be called from a component that has access to AppStateContext
  // We can't directly access AppStateContext here as this is a utility file
  // The component using this function should pass the users from AppStateContext
  
  // For now, we'll rely on the role check being done in the component itself
  return false;
};

export const isTechnicianMaintenanceTech = (technicianId: string): boolean => {
  // Same issue as above
  return false;
};
