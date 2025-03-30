
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
      activeTab === "completed" ? ["completed"] : ["archived"]
    );
  };

  return {
    handleAssign,
    handleAssignSubmit,
    handleComplete,
    handleCompleteSubmit,
    getAssignedListsForTech,
    getFilteredLists
  };
};
