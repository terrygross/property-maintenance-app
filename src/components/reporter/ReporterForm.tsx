
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import ReporterImageCapture from "./ReporterImageCapture";
import { useAppState } from "@/context/AppStateContext";
import { useToast } from "@/hooks/use-toast";
import ReporterNameField from "./form-fields/ReporterNameField";
import PropertyField from "./form-fields/PropertyField";
import LocationField from "./form-fields/LocationField";
import DescriptionField from "./form-fields/DescriptionField";
import SubmitButton from "./form-fields/SubmitButton";

export interface ReporterFormValues {
  reporterName: string;
  propertyId: string;
  location: string;
  description: string;
}

interface ReporterFormProps {
  stationId: string;
  stationProperty: string;
  propertyName: string;
}

const ReporterForm = ({ stationId, stationProperty, propertyName }: ReporterFormProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { properties } = useAppState();
  const { toast } = useToast();

  const form = useForm<ReporterFormValues>({
    defaultValues: {
      reporterName: "",
      propertyId: "",
      location: "",
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
    
    // Create the job report data
    const reportData = {
      id: `job${Date.now()}`,
      title: `Maintenance Request - ${values.reporterName}`,
      description: values.description,
      property: propertyName,
      location: values.location,
      reportDate: new Date().toISOString().split("T")[0],
      priority: "medium", // Default priority
      status: "unassigned",
      stationId: stationId,
      imageUrl: imageUrl,
      timestamp: new Date().toISOString()
    };
    
    // Get existing reports or initialize empty array
    let existingReports = [];
    try {
      const savedReports = localStorage.getItem('reporterJobs');
      if (savedReports) {
        existingReports = JSON.parse(savedReports);
      }
    } catch (error) {
      console.error("Error parsing saved reports:", error);
    }
    
    // Add new report to the beginning of the array
    const updatedReports = [reportData, ...existingReports];
    
    // Save to localStorage
    localStorage.setItem('reporterJobs', JSON.stringify(updatedReports));
    
    // Log for debugging
    console.log("Saved report job:", reportData);
    
    // Reset form
    form.reset();
    form.setValue("propertyId", stationProperty); // Keep the property ID
    setImageUrl("");
    setIsSubmitting(false);
    
    toast({
      title: "Report Submitted",
      description: `Your maintenance report for ${propertyName} has been submitted successfully.`
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <ReporterImageCapture imageUrl={imageUrl} onImageChange={setImageUrl} />
        
        <ReporterNameField form={form} />
        
        <PropertyField form={form} propertyName={propertyName} />
        
        <LocationField form={form} />
        
        <DescriptionField form={form} />
        
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default ReporterForm;
