
import * as z from "zod";
import { UserRole } from "@/types/user";

export const userFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.enum(["admin", "maintenance_tech", "maintenance_manager", "contractor", "reporter"] as const),
  photo_url: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "maintenance_manager", label: "Maintenance Manager" },
  { value: "maintenance_tech", label: "Maintenance Technician" },
  { value: "contractor", label: "Contractor" },
  { value: "reporter", label: "Reporter" },
];
