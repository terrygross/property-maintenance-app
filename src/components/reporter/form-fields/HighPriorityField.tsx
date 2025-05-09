
import { FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ReporterFormValues } from "../ReporterForm";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface HighPriorityFieldProps {
  form: UseFormReturn<ReporterFormValues>;
}

const HighPriorityField = ({ form }: HighPriorityFieldProps) => {
  // When highPriority is checked, also set priority to "high"
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "highPriority" && value.highPriority) {
        form.setValue("priority", "high");
        console.log("HighPriorityField - Setting priority to HIGH");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="highPriority"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-amber-50">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                // If checked, also set priority to high
                if (checked) {
                  form.setValue("priority", "high");
                  console.log("HighPriorityField - Checkbox setting priority to HIGH");
                }
              }}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <FormLabel className="font-semibold text-red-500">High Priority Issue</FormLabel>
            </div>
            <FormDescription>
              Check this box if this issue requires immediate attention. This will alert maintenance staff immediately.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default HighPriorityField;
