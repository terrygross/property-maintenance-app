
export type UserRole = "admin" | "maintenance_manager" | "maintenance_tech" | "contractor" | "reporter";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  phone: string;
  photo_url: string;
  role: UserRole;
}

// Helper functions for role-based access control
export const hasAdminAccess = (role: UserRole): boolean => {
  return role === "admin" || role === "maintenance_manager";
};

export const isTechnician = (role: UserRole): boolean => {
  return role === "maintenance_tech" || role === "contractor";
};

export const isReporter = (role: UserRole): boolean => {
  return role === "reporter";
};
