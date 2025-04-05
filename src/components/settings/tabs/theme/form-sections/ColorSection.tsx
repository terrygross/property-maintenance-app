import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useThemeContext } from "@/components/settings/tabs/theme/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeColors } from "@/lib/types";
import ColorItem from "../ColorItem";
import PickerToggle from "../PickerToggle";

export function ColorSection() {
  const { control } = useFormContext<ThemeFormValues>();

  return (
    <>
      <FormField
        control={control}
        name="primaryColor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Color</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Input type="color" {...field} className="w-12 h-10" />
                <Input 
                  value={field.value} 
                  onChange={field.onChange}
                  className="flex-1"
                />
              </div>
            </FormControl>
            <FormDescription>
              Main color used for buttons and interactive elements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="accentColor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accent Color</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Input type="color" {...field} className="w-12 h-10" />
                <Input 
                  value={field.value} 
                  onChange={field.onChange}
                  className="flex-1" 
                />
              </div>
            </FormControl>
            <FormDescription>
              Secondary color used for highlights and accents
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="borderRadius"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Border Radius</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    None (Square Corners)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="small" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Small (2px)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="medium" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Medium (4px)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="large" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Large (8px)
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
