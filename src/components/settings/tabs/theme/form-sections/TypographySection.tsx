
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

export function TypographySection() {
  const { control } = useFormContext<ThemeFormValues>();

  return (
    <FormField
      control={control}
      name="fontFamily"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Font Family</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="system" />
                </FormControl>
                <FormLabel className="font-normal">
                  System Default
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="inter" />
                </FormControl>
                <FormLabel className="font-normal">
                  Inter
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="roboto" />
                </FormControl>
                <FormLabel className="font-normal">
                  Roboto
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="poppins" />
                </FormControl>
                <FormLabel className="font-normal">
                  Poppins
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
