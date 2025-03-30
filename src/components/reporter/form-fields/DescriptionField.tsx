
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ReporterFormValues } from "../ReporterForm";

interface DescriptionFieldProps {
  form: UseFormReturn<ReporterFormValues>;
}

const DescriptionField = ({ form }: DescriptionFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Issue Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Please describe the maintenance issue" 
              className="min-h-[120px]" 
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

export default DescriptionField;
