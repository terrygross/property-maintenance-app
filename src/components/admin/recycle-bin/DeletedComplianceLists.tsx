import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { useComplianceOperations } from "@/components/maintenance/compliance/hooks/useComplianceOperations";
import { ComplianceList } from "@/components/maintenance/compliance/types";
import ComplianceListTable from "@/components/maintenance/compliance/ComplianceListTable";
import { useComplianceLists } from "@/components/maintenance/compliance/hooks/useComplianceLists";
import CompliancePreview from "@/components/maintenance/compliance/CompliancePreview";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

const DeletedComplianceLists = () => {
  const { properties, users } = useAppState();
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPermanentDeleteDialogOpen, setIsPermanentDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Get compliance lists operations
  const { complianceLists, handleRestoreFromBin, handlePermanentDelete } = useComplianceLists(properties, users);
  
  // Filter to show only deleted lists
  const deletedLists = complianceLists.filter(list => list.status === "deleted");
  
  const handleViewPreview = (list: ComplianceList) => {
    setSelectedList(list);
    setIsPreviewOpen(true);
  };
  
  const handleRestore = (id: string) => {
    handleRestoreFromBin(id);
  };
  
  const confirmPermanentDelete = (id: string) => {
    setItemToDelete(id);
    setIsPermanentDeleteDialogOpen(true);
  };
  
  const handleConfirmPermanentDelete = () => {
    if (itemToDelete) {
      handlePermanentDelete(itemToDelete);
      setIsPermanentDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };
  
  if (deletedLists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <Trash2 className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">No Deleted Compliance Lists</h3>
        <p className="text-muted-foreground max-w-md">
          There are no deleted compliance lists in the recycle bin.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-amber-800">
        Items in the recycle bin will be permanently deleted after 30 days.
      </div>
      
      <ComplianceListTable 
        lists={deletedLists}
        onView={handleViewPreview}
        onRestoreFromBin={handleRestore}
        onPermanentDelete={confirmPermanentDelete}
        showArchiveAction={false}
        showRestoreAction={false}
        showRestoreFromBinAction={true}
        showPermanentDeleteAction={true}
      />
      
      {selectedList && (
        <CompliancePreview
          list={selectedList}
          isOpen={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
      
      <AlertDialog 
        open={isPermanentDeleteDialogOpen} 
        onOpenChange={setIsPermanentDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently Delete Item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the selected item. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmPermanentDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeletedComplianceLists;
