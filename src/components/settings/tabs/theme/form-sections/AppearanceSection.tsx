
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { type ThemeFormValues } from "../themeFormSchema";

export function AppearanceSection() {
  const { control } = useFormContext<ThemeFormValues>();

  return (
    <FormField
      control={control}
      name="theme"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Color Theme</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="light" />
                </FormControl>
                <FormLabel className="font-normal">
                  Light Mode
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="dark" />
                </FormControl>
                <FormLabel className="font-normal">
                  Dark Mode
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="system" />
                </FormControl>
                <FormLabel className="font-normal">
                  Use System Preference
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
