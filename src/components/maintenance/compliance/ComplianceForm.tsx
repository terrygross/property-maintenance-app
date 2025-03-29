
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ComplianceList, ComplianceFormMode } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building } from "lucide-react";
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
          <DialogTitle>
            {mode === "create" ? "Create New Compliance List" : "Edit Compliance List"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="property">Property</Label>
            <Select 
              value={propertyId} 
              onValueChange={setPropertyId}
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create List" : "Update List"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceForm;
