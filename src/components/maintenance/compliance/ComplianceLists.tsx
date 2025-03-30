
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, FileText, CheckCircle, Trash } from "lucide-react";
import ComplianceListTable from "./ComplianceListTable";
import ComplianceForm from "./ComplianceForm";
import PropertySelector from "./PropertySelector";
import PropertyDisplay from "./PropertyDisplay";
import ComplianceListActions from "./ComplianceListActions";
import { useComplianceLists } from "./hooks/useComplianceLists";
import CompliancePreview from "./CompliancePreview";
import ComplianceAssignDialog from "./ComplianceAssignDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useState } from "react";
import { ComplianceList } from "./types";
import { useAppState } from "@/context/AppStateContext";

const ComplianceLists = () => {
  // Get properties and users directly from AppState
  const { properties, users } = useAppState();
  
  const {
    activeTab,
    setActiveTab,
    isFormOpen,
    formMode,
    selectedList,
    selectedPropertyId,
    complianceLists,
    fileInputRef,
    selectedProperty,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    handleFileUpload,
    handleFileChange,
    handleCreateNew,
    handleEdit,
    handleView,
    handleArchive,
    handleRestore,
    handleDelete,
    handleFormSubmit,
    handleFormCancel,
    handlePropertyChange,
    handleAssign,
    handleAssignSubmit,
    handleSoftDelete,
    handleRestoreFromBin,
    handlePermanentDelete
  } = useComplianceLists(properties, users);

  // State for preview functionality
  const [previewList, setPreviewList] = useState<ComplianceList | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<{id: string, title: string} | null>(null);

  const handleViewPreview = (list: ComplianceList) => {
    setPreviewList(list);
    setIsPreviewOpen(true);
    handleView(list);
  };

  const handleDeleteClick = (id: string, title: string) => {
    setListToDelete({ id, title });
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (listToDelete) {
      handleSoftDelete(listToDelete.id, listToDelete.title);
      setIsDeleteDialogOpen(false);
      setListToDelete(null);
    }
  };

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
          <ComplianceListActions
            onCreateNew={handleCreateNew}
            onFileUpload={handleFileUpload}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
          />
        </div>

        <PropertySelector
          properties={properties}
          selectedPropertyId={selectedPropertyId}
          onPropertyChange={handlePropertyChange}
        />

        <PropertyDisplay property={selectedProperty} />

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
            <ComplianceListTable 
              lists={complianceLists}
              onEdit={handleEdit}
              onView={handleViewPreview}
              onArchive={handleArchive}
              onDelete={handleDeleteClick}
              onAssign={handleAssign}
              showArchiveAction={true}
              showRestoreAction={false}
              showAssignAction={true}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <ComplianceListTable 
              lists={complianceLists}
              onView={handleViewPreview}
              onArchive={handleArchive}
              onDelete={handleDeleteClick}
              showArchiveAction={true}
              showRestoreAction={false}
            />
          </TabsContent>
          
          <TabsContent value="archived">
            <ComplianceListTable 
              lists={complianceLists}
              onView={handleViewPreview}
              onRestore={handleRestore}
              onDelete={handleDeleteClick}
              showArchiveAction={false}
              showRestoreAction={true}
            />
          </TabsContent>

          <TabsContent value="deleted">
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-amber-800">
              Items in the recycle bin will be permanently deleted after 30 days.
            </div>
            <ComplianceListTable 
              lists={complianceLists}
              onView={handleViewPreview}
              onRestoreFromBin={handleRestoreFromBin}
              onPermanentDelete={handlePermanentDelete}
              showArchiveAction={false}
              showRestoreAction={false}
              showRestoreFromBinAction={true}
              showPermanentDeleteAction={true}
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

        {isPreviewOpen && previewList && (
          <CompliancePreview
            list={previewList}
            isOpen={isPreviewOpen}
            onOpenChange={setIsPreviewOpen}
          />
        )}

        <ComplianceAssignDialog
          isOpen={isAssignDialogOpen}
          onOpenChange={setIsAssignDialogOpen}
          list={selectedList}
          onAssign={handleAssignSubmit}
          technicians={users}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirmDelete={handleConfirmDelete}
          itemName={listToDelete?.title || ""}
        />
      </CardContent>
    </Card>
  );
};

export default ComplianceLists;
