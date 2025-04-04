
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  onChange: (values: StationFormValues) => void;
  properties: Property[];
  isEditing: boolean;
}

const StationForm = ({ defaultValues, onChange, properties, isEditing }: StationFormProps) => {
  const form = useForm<StationFormValues>({
    resolver: zodResolver(stationFormSchema),
    defaultValues,
    mode: "onChange"
  });

  // Watch form values and call onChange when they change
  const watchedValues = form.watch();
  
  // Update parent component when form values change
  useEffect(() => {
    onChange(watchedValues);
  }, [watchedValues, onChange]);

  return (
    <Form {...form}>
      <div className="space-y-4 py-2">
        <FormField
          control={form.control}
          name="stationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Station ID</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter station ID"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter company name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {properties.length > 0 ? (
                    properties.map(property => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-properties">
                      No properties available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder={isEditing ? "Leave blank to keep current password" : "Enter password"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default StationForm;
