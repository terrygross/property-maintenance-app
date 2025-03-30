
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, FileText, CheckCircle, Trash } from "lucide-react";
import { ComplianceList } from "../types";
import ComplianceTabContent from "./ComplianceTabContent";

interface ComplianceTabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  complianceLists: ComplianceList[];
  handleEdit?: (list: ComplianceList) => void;
  handleViewPreview: (list: ComplianceList) => void;
  handleArchive?: (id: string) => void;
  handleRestore?: (id: string) => void;
  handleDeleteClick?: (id: string, title: string) => void;
  handleAssign?: (list: ComplianceList) => void;
  handleRestoreFromBin?: (id: string) => void;
  handlePermanentDelete?: (id: string) => void;
}

const ComplianceTabsContainer = ({
  activeTab,
  setActiveTab,
  complianceLists,
  handleEdit,
  handleViewPreview,
  handleArchive,
  handleRestore,
  handleDeleteClick,
  handleAssign,
  handleRestoreFromBin,
  handlePermanentDelete
}: ComplianceTabsContainerProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="active" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          <span>Active Lists</span>
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Completed</span>
        </TabsTrigger>
        <TabsTrigger value="archived" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Archived</span>
        </TabsTrigger>
        <TabsTrigger value="deleted" className="flex items-center gap-2">
          <Trash className="h-4 w-4" />
          <span>Recycle Bin</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="active">
        <ComplianceTabContent 
          activeTab="active"
          lists={complianceLists}
          onEdit={handleEdit}
          onView={handleViewPreview}
          onArchive={handleArchive}
          onDelete={handleDeleteClick}
          onAssign={handleAssign}
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <ComplianceTabContent 
          activeTab="completed"
          lists={complianceLists}
          onView={handleViewPreview}
          onArchive={handleArchive}
          onDelete={handleDeleteClick}
        />
      </TabsContent>
      
      <TabsContent value="archived">
        <ComplianceTabContent 
          activeTab="archived"
          lists={complianceLists}
          onView={handleViewPreview}
          onRestore={handleRestore}
          onDelete={handleDeleteClick}
        />
      </TabsContent>

      <TabsContent value="deleted">
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-amber-800">
          Items in the recycle bin will be permanently deleted after 30 days.
        </div>
        <ComplianceTabContent 
          activeTab="deleted"
          lists={complianceLists}
          onView={handleViewPreview}
          onRestoreFromBin={handleRestoreFromBin}
          onPermanentDelete={handlePermanentDelete}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ComplianceTabsContainer;
