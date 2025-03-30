
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ComplianceList } from "../types";
import { useAppState } from "@/context/AppStateContext";
import { useComplianceLists } from "../hooks/useComplianceLists";
import ComplianceForm from "../dialogs/ComplianceForm";
import PropertySelector from "../PropertySelector";
import PropertyDisplay from "../PropertyDisplay";
import CompliancePreview from "../CompliancePreview";
import ComplianceAssignDialog from "../dialogs/ComplianceAssignDialog";
import DeleteConfirmDialog from "../dialogs/DeleteConfirmDialog";
import ComplianceListsHeader from "./ComplianceListsHeader";
import ComplianceTabsContainer from "./ComplianceTabsContainer";

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
        <ComplianceListsHeader
          onCreateNew={handleCreateNew}
          onFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />

        <PropertySelector
          properties={properties}
          selectedPropertyId={selectedPropertyId}
          onPropertyChange={handlePropertyChange}
        />

        <PropertyDisplay property={selectedProperty} />

        <ComplianceTabsContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          complianceLists={complianceLists}
          handleEdit={handleEdit}
          handleViewPreview={handleViewPreview}
          handleArchive={handleArchive}
          handleRestore={handleRestore}
          handleDeleteClick={handleDeleteClick}
          handleAssign={handleAssign}
          handleRestoreFromBin={handleRestoreFromBin}
          handlePermanentDelete={handlePermanentDelete}
        />

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
