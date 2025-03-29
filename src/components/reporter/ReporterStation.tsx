
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
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

  // Find which property this station is for by looking in local storage
  const [stationProperty, setStationProperty] = useState("");
  
  // Find the property ID for this station from localStorage
  useState(() => {
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
  });

  const form = useForm<ReporterFormValues>({
    defaultValues: {
      reporterName: "",
      propertyId: stationProperty || (properties.length > 0 ? properties[0].id : ""),
      description: ""
    }
  });

  const handleSubmit = (values: ReporterFormValues) => {
    setIsSubmitting(true);
    
    // Ensure an image was captured
    if (!imageUrl) {
      toast({
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
      setImageUrl("");
      setIsSubmitting(false);
      
      toast({
        title: "Report Submitted",
        description: `Your maintenance report for ${propertyName} has been submitted successfully.`
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Report Maintenance Issue</CardTitle>
        <div className="text-sm text-muted-foreground">Station ID: {stationId}</div>
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={true} // Property is predetermined by station
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
