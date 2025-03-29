
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property } from "@/types/property";
import { useForm } from "react-hook-form";

// Form schema
export const stationFormSchema = z.object({
  stationId: z.string().min(1, "Station ID is required"),
  companyName: z.string().min(1, "Company name is required"),
  propertyId: z.string().min(1, "Property is required"),
  password: z.string().min(6, "Password must be at least 6 characters").or(z.string().length(0)), // Allow empty for editing
});

export type StationFormValues = z.infer<typeof stationFormSchema>;

interface StationFormProps {
  defaultValues: StationFormValues;
  onChange: (name: string, value: string) => void;
  properties: Property[];
  isEditing: boolean;
}

const StationForm = ({ defaultValues, onChange, properties, isEditing }: StationFormProps) => {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <FormLabel htmlFor="stationId">Station ID</FormLabel>
        <Input 
          id="stationId"
          placeholder="Enter station ID"
          value={defaultValues.stationId}
          onChange={(e) => onChange("stationId", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <FormLabel htmlFor="companyName">Company Name</FormLabel>
        <Input 
          id="companyName"
          placeholder="Enter company name"
          value={defaultValues.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <FormLabel htmlFor="propertyId">Property</FormLabel>
        <Select 
          value={defaultValues.propertyId}
          onValueChange={(value) => onChange("propertyId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            {properties.map(property => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input 
          id="password"
          type="password" 
          placeholder={isEditing ? "Leave blank to keep current password" : "Enter password"} 
          value={defaultValues.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>
    </div>
  );
};

export default StationForm;
