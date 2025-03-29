
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, ClipboardList, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ComplianceListTable from "./ComplianceListTable";
import ComplianceForm from "./ComplianceForm";
import { ComplianceList, ComplianceFormMode } from "./types";

const ComplianceLists = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<ComplianceFormMode>("create");
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
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
      version: 1
    },
    {
      id: "2",
      title: "HVAC Maintenance Checklist",
      description: "Monthly HVAC system inspection requirements",
      createdAt: new Date(2023, 4, 10),
      updatedAt: new Date(2023, 5, 1),
      status: "active",
      fileUrl: "#",
      version: 2
    },
    {
      id: "3",
      title: "Fire Safety Compliance",
      description: "Quarterly fire safety equipment inspection",
      createdAt: new Date(2023, 3, 22),
      updatedAt: new Date(2023, 3, 22),
      status: "archived",
      fileUrl: "#",
      version: 1
    }
  ]);

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
      const newList: ComplianceList = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
      };
      setComplianceLists(prev => [...prev, newList]);
      toast({
        title: "List created",
        description: "A new compliance list has been created.",
      });
    } else if (formMode === "edit" && selectedList) {
      setComplianceLists(prev => 
        prev.map(list => 
          list.id === selectedList.id 
            ? { 
                ...list, 
                ...data, 
                updatedAt: new Date(),
                version: list.version + 1
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

  const activeComplianceLists = complianceLists.filter(list => list.status === "active");
  const archivedComplianceLists = complianceLists.filter(list => list.status === "archived");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Compliance Lists</h2>
            <p className="text-muted-foreground">
              Manage monthly maintenance compliance checklists
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
              lists={activeComplianceLists}
              onEdit={handleEdit}
              onView={handleView}
              onArchive={handleArchive}
              showArchiveAction={true}
              showRestoreAction={false}
            />
          </TabsContent>
          
          <TabsContent value="archived">
            <ComplianceListTable 
              lists={archivedComplianceLists}
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
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceLists;
