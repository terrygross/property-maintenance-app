
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ReporterFormValues } from "../ReporterForm";

interface PropertyFieldProps {
  form: UseFormReturn<ReporterFormValues>;
  propertyName: string;
}

const PropertyField = ({ form, propertyName }: PropertyFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="propertyId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Property</FormLabel>
          <FormControl>
            <Input 
              value={propertyName} 
              readOnly 
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded" 
            />
          </FormControl>
          <input type="hidden" {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PropertyField;
