
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ReporterFormValues } from "../ReporterForm";

interface LocationFieldProps {
  form: UseFormReturn<ReporterFormValues>;
}

const LocationField = ({ form }: LocationFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <Input 
              placeholder="Specific location within the property (e.g., Room 101, Lobby, North Wing)" 
              {...field} 
              required 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationField;
