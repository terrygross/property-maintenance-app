
export type UserRole = "admin" | "maintenance_tech" | "maintenance_manager" | "contractor" | "reporter";

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
