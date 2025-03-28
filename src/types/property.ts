
export type PropertyType = "residential" | "commercial" | "industrial" | "mixed_use";

export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: PropertyType;
  units: number;
  status: "active" | "inactive" | "maintenance";
  imageUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
};
