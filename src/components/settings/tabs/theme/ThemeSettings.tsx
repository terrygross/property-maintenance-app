
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeForm } from "./ThemeForm";
import { themeFormSchema, type ThemeFormValues } from "./themeFormSchema";
import { ThemePreview } from "./ThemePreview";

const ThemeSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeFormSchema),
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

  function onSubmit(values: ThemeFormValues) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Configuration</CardTitle>
        <CardDescription>
          Customize the look and feel of your maintenance system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ThemeForm />
            <ThemePreview />
            
            <button 
              type="submit" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Theme Settings"}
            </button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
