
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { type ThemeFormValues, colorThemeOptions } from "../themeFormSchema";

export function ColorThemeSection() {
  const { control, setValue } = useFormContext<ThemeFormValues>();

  const handleColorThemeChange = (value: string) => {
    // Find the selected theme
    const selectedTheme = colorThemeOptions.find(theme => theme.value === value);
    
    if (selectedTheme) {
      // Update the primary and accent colors to match the theme
      setValue("primaryColor", selectedTheme.primaryColor);
      setValue("accentColor", selectedTheme.accentColor);
    }
  };

  return (
    <FormField
      control={control}
      name="colorTheme"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Color Theme</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                handleColorThemeChange(value);
              }}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              {colorThemeOptions.map((theme) => (
                <FormItem key={theme.value} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={theme.value} />
                  </FormControl>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-200" 
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-200" 
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <FormLabel className="font-normal">
                      {theme.name}
                    </FormLabel>
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>
            Choose a pre-defined color theme or customize your own colors below
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
