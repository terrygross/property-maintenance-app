
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, ClipboardList, FileText, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ComplianceListTable from "./ComplianceListTable";
import ComplianceForm from "./ComplianceForm";
import { ComplianceList, ComplianceFormMode } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property } from "@/types/property";
import { mockProperties } from "@/data/mockProperties";

const ComplianceLists = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<ComplianceFormMode>("create");
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock data for demonstration
  const [complianceLists, setComplianceLists] = useState<ComplianceList[]>([
    {
      id: "1",
      title: "Monthly Safety Inspection",
      description: "Standard safety inspection checklist for all properties",
      createdAt: new Date(2023, 5, 15),
      updatedAt: new Date(2023, 5, 15),
      status: "active",
      fileUrl: "#",
      version: 1,
      propertyId: "1",
      propertyName: "Oak Apartments"
    },
    {
      id: "2",
      title: "HVAC Maintenance Checklist",
      description: "Monthly HVAC system inspection requirements",
      createdAt: new Date(2023, 4, 10),
      updatedAt: new Date(2023, 5, 1),
      status: "active",
      fileUrl: "#",
      version: 2,
      propertyId: "2",
      propertyName: "Maple Heights"
    },
    {
      id: "3",
      title: "Fire Safety Compliance",
      description: "Quarterly fire safety equipment inspection",
      createdAt: new Date(2023, 3, 22),
      updatedAt: new Date(2023, 3, 22),
      status: "archived",
      fileUrl: "#",
      version: 1,
      propertyId: "1",
      propertyName: "Oak Apartments"
    },
    {
      id: "4",
      title: "Plumbing System Inspection",
      description: "Monthly plumbing system maintenance checks",
      createdAt: new Date(2023, 5, 5),
      updatedAt: new Date(2023, 5, 5),
      status: "active",
      fileUrl: "#",
      version: 1,
      propertyId: "3",
      propertyName: "Cedar Plaza"
    }
  ]);

  // Set default property selection when properties are loaded
  useEffect(() => {
    if (properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, this would upload the file to storage
      // and then create a new compliance list in the database
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded. Please complete the form to create the compliance list.`,
      });
      
      setFormMode("create");
      setSelectedList(null);
      setIsFormOpen(true);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCreateNew = () => {
    setFormMode("create");
    setSelectedList(null);
    setIsFormOpen(true);
  };

  const handleEdit = (list: ComplianceList) => {
    setFormMode("edit");
    setSelectedList(list);
    setIsFormOpen(true);
  };

  const handleView = (list: ComplianceList) => {
    // In a real implementation, this would open the document for viewing
    toast({
      title: "Viewing compliance list",
      description: `Viewing ${list.title}`,
    });
  };

  const handleArchive = (id: string) => {
    setComplianceLists(prev => 
      prev.map(list => 
        list.id === id ? { ...list, status: "archived" } : list
      )
    );
    toast({
      title: "List archived",
      description: "The compliance list has been archived.",
    });
  };

  const handleRestore = (id: string) => {
    setComplianceLists(prev => 
      prev.map(list => 
        list.id === id ? { ...list, status: "active" } : list
      )
    );
    toast({
      title: "List restored",
      description: "The compliance list has been restored to active status.",
    });
  };

  const handleDelete = (id: string) => {
    setComplianceLists(prev => prev.filter(list => list.id !== id));
    toast({
      title: "List deleted",
      description: "The compliance list has been permanently deleted.",
    });
  };

  const handleFormSubmit = (data: Omit<ComplianceList, "id" | "createdAt" | "updatedAt" | "version">) => {
    if (formMode === "create") {
      const propertyName = properties.find(p => p.id === data.propertyId)?.name || "";
      
      const newList: ComplianceList = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        propertyName
      };
      setComplianceLists(prev => [...prev, newList]);
      toast({
        title: "List created",
        description: "A new compliance list has been created.",
      });
    } else if (formMode === "edit" && selectedList) {
      const propertyName = properties.find(p => p.id === data.propertyId)?.name || "";
      
      setComplianceLists(prev => 
        prev.map(list => 
          list.id === selectedList.id 
            ? { 
                ...list, 
                ...data, 
                updatedAt: new Date(),
                version: list.version + 1,
                propertyName
              } 
            : list
        )
      );
      toast({
        title: "List updated",
        description: "The compliance list has been updated.",
      });
    }
    setIsFormOpen(false);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  // Filter lists by property and status
  const filteredLists = complianceLists.filter(list => 
    list.propertyId === selectedPropertyId && 
    list.status === (activeTab === "active" ? "active" : "archived")
  );

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Compliance Lists</h2>
            <p className="text-muted-foreground">
              Manage property-specific maintenance compliance checklists
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleCreateNew}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Create New</span>
            </Button>
            <Button 
              onClick={handleFileUpload}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload File</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="property-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Property
          </label>
          <div className="flex items-center gap-2">
            <Select value={selectedPropertyId} onValueChange={handlePropertyChange}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select a property" />
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
        </div>

        {selectedProperty && (
          <div className="mb-4">
            <div className="bg-muted/50 p-3 rounded-md">
              <h3 className="font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                {selectedProperty.name}
              </h3>
              <p className="text-sm text-muted-foreground">{selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state}</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              <span>Active Lists</span>
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Archived Lists</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <ComplianceListTable 
              lists={filteredLists}
              onEdit={handleEdit}
              onView={handleView}
              onArchive={handleArchive}
              showArchiveAction={true}
              showRestoreAction={false}
            />
          </TabsContent>
          
          <TabsContent value="archived">
            <ComplianceListTable 
              lists={filteredLists}
              onView={handleView}
              onRestore={handleRestore}
              onDelete={handleDelete}
              showArchiveAction={false}
              showRestoreAction={true}
            />
          </TabsContent>
        </Tabs>

        {isFormOpen && (
          <ComplianceForm
            mode={formMode}
            initialData={selectedList}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            properties={properties}
            selectedPropertyId={selectedPropertyId}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceLists;
