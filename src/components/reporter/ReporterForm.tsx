
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReporterImageCapture from "./ReporterImageCapture";
import { useAppState } from "@/context/AppStateContext";

interface ReporterFormProps {
  stationId: string;
  stationProperty: string;
  propertyName: string;
}

// Export this interface for form field components
export interface ReporterFormValues {
  reporterName: string;
  propertyId: string;
  location: string;
  description: string;
  highPriority: boolean;
  imageUrl?: string;
}

const ReporterForm = ({ stationId, stationProperty, propertyName }: ReporterFormProps) => {
  const { properties } = useAppState();
  const { toast } = useToast();
  
  // Form fields
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [isHighPriority, setIsHighPriority] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState(stationProperty);
  
  // Reset form when the station changes
  useEffect(() => {
    setSelectedProperty(stationProperty);
  }, [stationProperty]);

  // Get current property name for display
  const currentPropertyName = properties.find(p => p.id === selectedProperty)?.name || propertyName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create timestamp
    const timestamp = new Date().toISOString();
    const reportDate = timestamp.split("T")[0];
    
    // Generate unique ID
    const id = `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Create job object
    const jobData = {
      id,
      title: `Maintenance Request - ${currentPropertyName}`,
      description: issue,
      property: currentPropertyName,
      location: location,
      reportDate,
      priority: isHighPriority ? "high" : "medium",
      status: "unassigned",
      reportedBy: name,
      imageUrl: capturedImage,
      timestamp
    };
    
    // Save to localStorage
    try {
      const existingJobs = localStorage.getItem('reporterJobs');
      const jobs = existingJobs ? JSON.parse(existingJobs) : [];
      jobs.push(jobData);
      localStorage.setItem('reporterJobs', JSON.stringify(jobs));
      
      // Trigger custom event to refresh jobs list in other components
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
      
      // Show success message
      toast({
        title: "Maintenance request submitted",
        description: "Your request has been recorded and will be addressed soon.",
      });
      
      // Reset form
      setName("");
      setLocation("");
      setIssue("");
      setIsHighPriority(false);
      setCapturedImage(null);
      setShowCamera(false);
    } catch (error) {
      console.error("Error saving job:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  };

  return (
    <>
      {showCamera ? (
        <ReporterImageCapture 
          imageUrl={capturedImage || ""} 
          onImageChange={handleImageChange} 
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="property">Property</Label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={currentPropertyName} />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[200px]">
                    <SelectGroup>
                      <SelectLabel>Properties</SelectLabel>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location in Property</Label>
              <Input
                id="location"
                placeholder="e.g., Apartment 2B, Main Lobby, etc."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issue">Describe the Issue</Label>
              <Textarea
                id="issue"
                placeholder="Please describe the maintenance issue in detail"
                rows={4}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="priority"
                checked={isHighPriority}
                onCheckedChange={setIsHighPriority}
              />
              <Label htmlFor="priority">This is a high-priority issue</Label>
            </div>
            
            <div className="space-y-2">
              <Label>Add a Photo</Label>
              {capturedImage ? (
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="w-full h-auto" 
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => setShowCamera(true)}
                      >
                        Retake
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-32 flex flex-col items-center justify-center gap-2"
                  onClick={() => setShowCamera(true)}
                >
                  <Camera className="h-6 w-6" />
                  <span>Take Photo</span>
                </Button>
              )}
            </div>
            
            <Button type="submit" className="w-full">Submit Maintenance Request</Button>
          </div>
        </form>
      )}
    </>
  );
};

export default ReporterForm;
