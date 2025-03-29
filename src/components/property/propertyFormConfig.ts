
import * as z from "zod";
import { PropertyType, LocationType } from "@/types/property";

export const propertyFormSchema = z.object({
  name: z.string().min(1, "Property name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/County is required"),
  zipCode: z.string().min(1, "ZIP/Postcode is required"),
  country: z.enum(["usa", "uk"] as const).default("usa"),
  type: z.enum(["residential", "commercial", "industrial", "mixed_use"] as const),
  units: z.coerce.number().min(1, "Number of units is required"),
  status: z.enum(["active", "inactive", "maintenance"] as const),
  contactEmail: z.string().email("Invalid email address").optional(),
  contactPhone: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export const propertyTypeOptions = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "mixed_use", label: "Mixed Use" },
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Maintenance" },
];

export const countryOptions = [
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];
