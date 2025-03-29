
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import ReporterImageCapture from "./ReporterImageCapture";
import { useAppState } from "@/context/AppStateContext";

interface ReporterStationProps {
  stationId: string;
}

interface ReporterFormValues {
  reporterName: string;
  propertyId: string;
  description: string;
}

const ReporterStation = ({ stationId }: ReporterStationProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { properties } = useAppState();
  
  // State to store the station's property ID
  const [stationProperty, setStationProperty] = useState("");
  
  // Find the property ID for this station from localStorage
  useEffect(() => {
    try {
      const savedStations = localStorage.getItem('reporterStations');
      if (savedStations) {
        const stations = JSON.parse(savedStations);
        const station = stations.find((s: any) => s.stationId === stationId);
        if (station) {
          setStationProperty(station.propertyId);
        } else {
          // Fallback if station not found
          setStationProperty(properties.length > 0 ? properties[0].id : "");
        }
      }
    } catch (error) {
      console.error("Error finding station property:", error);
      // Fallback if error occurs
      setStationProperty(properties.length > 0 ? properties[0].id : "");
    }
  }, [stationId, properties]);

  const form = useForm<ReporterFormValues>({
    defaultValues: {
      reporterName: "",
      propertyId: "",
      description: ""
    }
  });

  // Update form values when stationProperty changes
  useEffect(() => {
    if (stationProperty) {
      form.setValue("propertyId", stationProperty);
    }
  }, [stationProperty, form]);

  const handleSubmit = (values: ReporterFormValues) => {
    setIsSubmitting(true);
    
    // Ensure an image was captured
    if (!imageUrl) {
      useToast().toast({
        title: "Image Required",
        description: "Please take a photo of the issue before submitting.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Get property name for the toast message
    const propertyName = properties.find(p => p.id === values.propertyId)?.name || "selected property";
    
    // Simulate form submission
    setTimeout(() => {
      console.log({
        ...values,
        imageUrl,
        stationId,
        timestamp: new Date().toISOString()
      });
      
      // Reset form
      form.reset();
      form.setValue("propertyId", stationProperty); // Keep the property ID
      setImageUrl("");
      setIsSubmitting(false);
      
      useToast().toast({
        title: "Report Submitted",
        description: `Your maintenance report for ${propertyName} has been submitted successfully.`
      });
    }, 1500);
  };

  // Get the current property name for display
  const propertyName = properties.find(p => p.id === stationProperty)?.name || "Unknown Property";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Report Maintenance Issue</CardTitle>
        <div className="text-sm text-muted-foreground">
          <div>Station ID: {stationId}</div>
          <div>Property: {propertyName}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <ReporterImageCapture imageUrl={imageUrl} onImageChange={setImageUrl} />
            
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
            
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <FormControl>
                    <Input 
                      value={propertyName} 
                      readOnly 
                      className="bg-gray-100 border border-gray-300 px-4 py-2 rounded" 
                    />
                  </FormControl>
                  <input type="hidden" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReporterStation;
