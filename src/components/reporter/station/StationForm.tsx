
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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { mockProperties } from "@/data/mockProperties";
import { ReporterStation } from "./types";

// Form schema
export const stationFormSchema = z.object({
  stationId: z.string().min(1, "Station ID is required"),
  companyName: z.string().min(1, "Company name is required"),
  propertyId: z.string().min(1, "Property is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type StationFormValues = z.infer<typeof stationFormSchema>;

interface StationFormProps {
  onSubmit: (data: StationFormValues) => void;
  onCancel: () => void;
  defaultValues: StationFormValues;
  isEditing: boolean;
}

const StationForm = ({ onSubmit, onCancel, defaultValues, isEditing }: StationFormProps) => {
  const form = useForm<StationFormValues>({
    resolver: zodResolver(stationFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="stationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Station ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter station ID" {...field} />
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
                <Input placeholder="Enter company name" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockProperties.map(property => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
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
        
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Station" : "Create Station"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default StationForm;
