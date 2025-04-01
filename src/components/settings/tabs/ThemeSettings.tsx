
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  primaryColor: z.string().regex(/^#([0-9A-F]{6})$/i, {
    message: "Must be a valid hex color code",
  }),
  accentColor: z.string().regex(/^#([0-9A-F]{6})$/i, {
    message: "Must be a valid hex color code",
  }),
  borderRadius: z.enum(["none", "small", "medium", "large"]),
  enableAnimations: z.boolean(),
  highContrastMode: z.boolean(),
  fontFamily: z.enum(["system", "inter", "roboto", "poppins"]),
  customLogo: z.boolean(),
  logoUrl: z.string().optional(),
  customFavicon: z.boolean(),
  faviconUrl: z.string().optional(),
});

const ThemeSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "light",
      primaryColor: "#2563eb",
      accentColor: "#60a5fa",
      borderRadius: "medium",
      enableAnimations: true,
      highContrastMode: false,
      fontFamily: "system",
      customLogo: false,
      logoUrl: "",
      customFavicon: false,
      faviconUrl: "",
    },
  });
  
  const watchCustomLogo = form.watch("customLogo");
  const watchCustomFavicon = form.watch("customFavicon");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Submitting theme settings:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your theme settings have been saved successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }
  
  // Get preview class names based on form values
  const getPreviewClasses = () => {
    const borderRadiusClasses = {
      none: "rounded-none",
      small: "rounded",
      medium: "rounded-md",
      large: "rounded-lg",
    };
    
    return `${borderRadiusClasses[form.watch("borderRadius")]}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Configuration</CardTitle>
        <CardDescription>
          Customize the look and feel of your maintenance system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
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
                
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
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
                
                <FormField
                  control={form.control}
                  name="enableAnimations"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable Animations
                        </FormLabel>
                        <FormDescription>
                          Show transition animations throughout the interface
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
                
                <FormField
                  control={form.control}
                  name="highContrastMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          High Contrast Mode
                        </FormLabel>
                        <FormDescription>
                          Increase contrast for better accessibility
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
                
                <FormField
                  control={form.control}
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
                    control={form.control}
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
                  control={form.control}
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
                    control={form.control}
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
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <div className="flex items-center justify-center p-6 bg-background border rounded-md">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex space-x-2">
                    <Button
                      style={{ 
                        backgroundColor: form.watch("primaryColor"),
                        color: "#ffffff"
                      }}
                      className={getPreviewClasses()}
                    >
                      Primary Button
                    </Button>
                    <Button
                      variant="outline"
                      className={getPreviewClasses()}
                      style={{ 
                        borderColor: form.watch("accentColor"),
                        color: form.watch("accentColor")
                      }}
                    >
                      Secondary Button
                    </Button>
                  </div>
                  <div
                    className={`bg-card p-4 border shadow-sm ${getPreviewClasses()}`}
                    style={{ 
                      borderColor: form.watch("accentColor") + "33"  // Add transparency
                    }}
                  >
                    <h4 className="font-medium mb-2">Sample Card</h4>
                    <p className="text-sm text-muted-foreground">
                      This is how cards will appear with your selected theme options
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Theme Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
