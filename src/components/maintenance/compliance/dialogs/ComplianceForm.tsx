
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ComplianceList, ComplianceFormMode } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, FileText } from "lucide-react";
import { Property } from "@/types/property";

interface ComplianceFormProps {
  mode: ComplianceFormMode;
  initialData: ComplianceList | null;
  onSubmit: (data: Omit<ComplianceList, "id" | "createdAt" | "updatedAt" | "version">) => void;
  onCancel: () => void;
  properties: Property[];
  selectedPropertyId: string;
}

const ComplianceForm = ({ 
  mode, 
  initialData, 
  onSubmit, 
  onCancel,
  properties,
  selectedPropertyId
}: ComplianceFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [propertyId, setPropertyId] = useState(initialData?.propertyId || selectedPropertyId);
  const [fileUrl, setFileUrl] = useState(initialData?.fileUrl || "#");
  const [status, setStatus] = useState(initialData?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status: status as "active" | "archived",
      fileUrl,
      propertyId
    });
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {mode === "create" ? "Create New Compliance List" : "Edit Compliance List"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Create a new compliance checklist for property inspections." 
              : "Edit the details of this compliance checklist."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <PropertySelector 
            properties={properties} 
            propertyId={propertyId} 
            onPropertyChange={setPropertyId} 
          />
          
          <FormFields 
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create List" : "Update List"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Component for property selection
const PropertySelector = ({ 
  properties, 
  propertyId, 
  onPropertyChange 
}: { 
  properties: Property[], 
  propertyId: string, 
  onPropertyChange: (id: string) => void 
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="property">Property</Label>
      <Select 
        value={propertyId} 
        onValueChange={onPropertyChange}
      >
        <SelectTrigger id="property">
          <SelectValue placeholder="Select property" />
        </SelectTrigger>
        <SelectContent>
          {properties.map((property) => (
            <SelectItem key={property.id} value={property.id}>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{property.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Component for title and description fields
const FormFields = ({ 
  title, 
  setTitle, 
  description, 
  setDescription 
}: { 
  title: string, 
  setTitle: (title: string) => void, 
  description: string, 
  setDescription: (description: string) => void 
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">
          Description / Checklist Items
        </Label>
        <div className="text-xs text-muted-foreground mb-1">
          Enter each checklist item on a new line or separate with commas
        </div>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g. Check fire extinguishers, Test emergency lighting, Inspect exit signs"
          rows={5}
        />
      </div>
    </>
  );
};

export default ComplianceForm;
