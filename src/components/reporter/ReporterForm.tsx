
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import ReporterImageCapture from "./ReporterImageCapture";
import ReporterNameField from "./form-fields/ReporterNameField";
import PropertyField from "./form-fields/PropertyField";
import LocationField from "./form-fields/LocationField";
import DescriptionField from "./form-fields/DescriptionField";
import HighPriorityField from "./form-fields/HighPriorityField";
import ImageField from "./form-fields/ImageField";
import SubmitButton from "./form-fields/SubmitButton";

interface ReporterFormProps {
  stationId: string;
  stationProperty: string;
  propertyName: string;
}

// Form validation schema using zod
const formSchema = z.object({
  reporterName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  propertyId: z.string(),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  description: z.string().min(10, { message: "Please provide a more detailed description (at least 10 characters)" }),
  highPriority: z.boolean(),
  priority: z.string(),
  imageUrl: z.string().optional()
});

// Export this interface for form field components
export interface ReporterFormValues {
  reporterName: string;
  propertyId: string;
  location: string;
  description: string;
  highPriority: boolean;
  priority?: string;
  imageUrl?: string;
}

const ReporterForm = ({ stationId, stationProperty, propertyName }: ReporterFormProps) => {
  const { toast } = useToast();
  const [showCamera, setShowCamera] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<ReporterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reporterName: "",
      propertyId: stationProperty,
      location: "",
      description: "",
      highPriority: false,
      priority: "medium"
    }
  });

  // Handle form submission
  const onSubmit = (data: ReporterFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create timestamp
      const timestamp = new Date().toISOString();
      const reportDate = timestamp.split("T")[0];
      
      // Generate unique ID
      const id = `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Create job object with explicit status and priority
      const jobData = {
        id,
        title: `Maintenance Request - ${propertyName}`,
        description: data.description,
        property: propertyName,
        location: data.location,
        reportDate,
        priority: data.highPriority ? "high" : "medium",
        highPriority: data.highPriority, // Make sure this flag is set explicitly
        status: "unassigned", // Explicitly set status to unassigned
        assignedTo: null, // Explicitly set assignedTo to null
        reportedBy: data.reporterName,
        imageUrl: data.imageUrl,
        timestamp
      };
      
      console.log("ReporterForm - Creating new job:", jobData);
      
      // Save to localStorage
      const existingJobs = localStorage.getItem('reporterJobs');
      const jobs = existingJobs ? JSON.parse(existingJobs) : [];
      jobs.push(jobData);
      
      console.log("ReporterForm - Saving jobs to localStorage, total count:", jobs.length);
      localStorage.setItem('reporterJobs', JSON.stringify(jobs));
      
      // Trigger custom event to refresh jobs list in other components
      document.dispatchEvent(new Event('jobsUpdated'));
      
      // Also trigger a storage event to notify other tabs/windows
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'reporterJobs'
      }));
      
      // Show success message
      toast({
        title: "Maintenance request submitted",
        description: "Your request has been recorded and will be addressed soon.",
      });
      
      // Reset form
      form.reset({
        reporterName: "",
        propertyId: stationProperty,
        location: "",
        description: "",
        highPriority: false,
        priority: "medium"
      });
      
      // Reset image
      form.setValue("imageUrl", undefined);
    } catch (error) {
      console.error("Error saving job:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (imageData: string) => {
    form.setValue("imageUrl", imageData);
    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <ReporterImageCapture 
        imageUrl={form.watch("imageUrl") || ""} 
        onImageChange={handleImageChange} 
      />
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ReporterNameField form={form} />
        <PropertyField form={form} propertyName={propertyName} />
        <LocationField form={form} />
        <DescriptionField form={form} />
        <HighPriorityField form={form} />
        <ImageField 
          imageUrl={form.watch("imageUrl")} 
          setShowCamera={setShowCamera} 
        />
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
};

export default ReporterForm;
