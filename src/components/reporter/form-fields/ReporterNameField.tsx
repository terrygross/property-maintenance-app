
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ReporterFormValues } from "../ReporterForm";

interface ReporterNameFieldProps {
  form: UseFormReturn<ReporterFormValues>;
}

const ReporterNameField = ({ form }: ReporterNameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="reporterName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Your Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your name" {...field} required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ReporterNameField;
