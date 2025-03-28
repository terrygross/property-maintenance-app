
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/mockProperties";
import ReporterImageCapture from "./ReporterImageCapture";

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

  // Find which property this station is for
  // In a real app, you would fetch this from your backend
  const stationProperty = stationId === "STATION-001" ? "1" : "2";

  const form = useForm<ReporterFormValues>({
    defaultValues: {
      reporterName: "",
      propertyId: stationProperty,
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
    const propertyName = mockProperties.find(p => p.id === values.propertyId)?.name || "selected property";
    
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
                      {mockProperties.map((property) => (
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
