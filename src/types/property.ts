
export type PropertyType = "residential" | "commercial" | "industrial" | "mixed_use" | "hmo" | "airbnb" | "care_home" | "hotel" | "house" | "apartment" | "retail" | "office" | "warehouse" | "land";
export type LocationType = "usa" | "uk";

export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string; // State for USA, County for UK
  zipCode: string; // ZIP Code for USA, Postcode for UK
  country: LocationType;
  type: PropertyType;
  units: number;
  status: "active" | "inactive" | "maintenance";
  imageUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
};
