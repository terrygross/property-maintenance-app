
import { ComplianceList } from '../types';
import { useToast } from '@/hooks/use-toast';
import { filterComplianceLists } from '../complianceUtils';

export const useComplianceOperations = (
  complianceLists: ComplianceList[],
  updateComplianceLists: (listsOrUpdateFn: ComplianceList[] | ((prev: ComplianceList[]) => ComplianceList[])) => void
) => {
  const { toast } = useToast();

  const handleAssign = (list: ComplianceList) => {
    return list;
  };

  const handleAssignSubmit = (listId: string, techId: string, techName: string) => {
    updateComplianceLists(prevLists => 
      prevLists.map(list => {
        if (list.id === listId) {
          return { 
            ...list, 
            status: "assigned", 
            assignedTo: techId, 
            assignedToName: techName,
            updatedAt: new Date() // Use Date object, this will be serialized properly when saved
          };
        }
        return list;
      })
    );
    
    toast({
      title: "List Assigned",
      description: `Compliance list has been assigned to ${techName}.`,
    });
  };

  const handleComplete = (list: ComplianceList) => {
    return list;
  };

  const handleCompleteSubmit = (listId: string, notes: string) => {
    updateComplianceLists(prevLists => 
      prevLists.map(list => {
        if (list.id === listId) {
          return { 
            ...list, 
            status: "completed", 
            completedAt: new Date(), // Use Date object, this will be serialized properly when saved
            notes: notes,
            updatedAt: new Date() // Use Date object, this will be serialized properly when saved
          };
        }
        return list;
      })
    );
    
    toast({
      title: "List Completed",
      description: "Compliance list has been marked as completed.",
    });
  };

  // Move item to recycle bin (soft delete)
  const handleSoftDelete = (listId: string, itemName: string) => {
    updateComplianceLists(prevLists => 
      prevLists.map(list => {
        if (list.id === listId) {
          return { 
            ...list, 
            status: "deleted", 
            deletedAt: new Date(),
            updatedAt: new Date()
          };
        }
        return list;
      })
    );
    
    toast({
      title: "List Moved to Recycle Bin",
      description: `"${itemName}" will be permanently deleted after 30 days.`,
    });
  };

  // Restore item from recycle bin
  const handleRestoreFromBin = (listId: string) => {
    updateComplianceLists(prevLists => 
      prevLists.map(list => {
        if (list.id === listId) {
          return { 
            ...list, 
            status: "active", 
            deletedAt: undefined,
            updatedAt: new Date()
          };
        }
        return list;
      })
    );
    
    toast({
      title: "List Restored",
      description: "The list has been restored from the recycle bin.",
    });
  };

  // Permanently delete item
  const handlePermanentDelete = (listId: string) => {
    updateComplianceLists(prevLists => 
      prevLists.filter(list => list.id !== listId)
    );
    
    toast({
      title: "List Permanently Deleted",
      description: "The list has been permanently deleted.",
    });
  };

  // Helper function to filter lists for a specific technician
  const getAssignedListsForTech = (techId: string) => {
    console.log("Filtering lists for techId:", techId);
    console.log("All compliance lists:", complianceLists);
    
    // Check both string and number types for assignedTo since the userId could be either
    const filtered = complianceLists.filter(list => {
      // Make sure to convert all IDs to strings for comparison
      const listAssignedTo = String(list.assignedTo || "");
      const techIdString = String(techId);
      
      return listAssignedTo === techIdString && 
        (list.status === "assigned" || list.status === "completed");
    });
    
    console.log("Filtered lists:", filtered);
    return filtered;
  };

  // Filter lists by property and status
  const getFilteredLists = (
    selectedPropertyId: string,
    activeTab: string
  ) => {
    return filterComplianceLists(
      complianceLists,
      selectedPropertyId,
      activeTab === "active" ? ["active", "assigned"] : 
      activeTab === "completed" ? ["completed"] : 
      activeTab === "deleted" ? ["deleted"] :
      ["archived"]
    );
  };

  // Get lists that are due for permanent deletion (older than 30 days)
  const getListsDueForDeletion = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return complianceLists.filter(list => 
      list.status === "deleted" && 
      list.deletedAt && 
      new Date(list.deletedAt) < thirtyDaysAgo
    );
  };

  return {
    handleAssign,
    handleAssignSubmit,
    handleComplete,
    handleCompleteSubmit,
    handleSoftDelete,
    handleRestoreFromBin,
    handlePermanentDelete,
    getAssignedListsForTech,
    getFilteredLists,
    getListsDueForDeletion
  };
};
