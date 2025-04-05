
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { type ThemeFormValues } from "../themeFormSchema";

interface BrandingSectionProps {
  watchCustomLogo: boolean;
  watchCustomFavicon: boolean;
}

export function BrandingSection({ watchCustomLogo, watchCustomFavicon }: BrandingSectionProps) {
  const { control } = useFormContext<ThemeFormValues>();

  return (
    <>
      <FormField
        control={control}
        name="customLogo"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Use Custom Logo
              </FormLabel>
              <FormDescription>
                Replace default logo with your company logo
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      {watchCustomLogo && (
        <FormField
          control={control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL or Upload</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input 
                    {...field}
                    className="flex-1" 
                    placeholder="https://your-company.com/logo.png"
                  />
                  <Button type="button" variant="outline">
                    Upload
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                URL to your company logo (SVG or PNG recommended)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={control}
        name="customFavicon"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Use Custom Favicon
              </FormLabel>
              <FormDescription>
                Replace default browser tab icon
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      {watchCustomFavicon && (
        <FormField
          control={control}
          name="faviconUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favicon URL or Upload</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input 
                    {...field}
                    className="flex-1" 
                    placeholder="https://your-company.com/favicon.ico"
                  />
                  <Button type="button" variant="outline">
                    Upload
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                URL to your favicon (ICO or PNG format)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
