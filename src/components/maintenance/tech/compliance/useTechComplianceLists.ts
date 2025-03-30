
import { useState, useEffect, useCallback } from "react";
import { ComplianceList } from "../../compliance/types";
import { useAppState } from "@/context/AppStateContext";
import { useComplianceLists } from "../../compliance/hooks/useComplianceLists";
import { Property } from "@/types/property";
import { useComplianceListUpdates } from "@/hooks/use-notifications";

export const useTechComplianceLists = (userId: string) => {
  const { properties, users } = useAppState();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const {
    getAssignedListsForTech,
    handleCompleteSubmit
  } = useComplianceLists(properties, users);
  
  // Get lists assigned to this technician
  console.log("Current user ID:", userId);
  console.log("Type of userId:", typeof userId);

  // Check for additional IDs that might match (for Tristan Gross)
  const possibleIds = [userId, "1743265006833"];
  
  // Try to get the lists with all possible IDs
  let assignedLists: ComplianceList[] = [];
  possibleIds.forEach(id => {
    const lists = getAssignedListsForTech(id);
    console.log(`Lists found for ID ${id}:`, lists);
    assignedLists = [...assignedLists, ...lists];
  });
  
  // Remove duplicates
  assignedLists = assignedLists.filter((list, index, self) => 
    index === self.findIndex(l => l.id === list.id)
  );
  
  console.log("Final assigned lists:", assignedLists);
  
  // Handler for compliance list updates
  const handleListsUpdated = useCallback(() => {
    console.log("ComplianceLists updated notification received");
    setRefreshTrigger(prev => prev + 1);
  }, []);
  
  // Use our custom hook instead of DOM events
  useComplianceListUpdates(handleListsUpdated);
  
  // Find the current user
  const currentUser = users.find(user => user.id === userId);
  
  const handleViewList = (list: ComplianceList) => {
    setSelectedList(list);
    setIsPreviewOpen(true);
  };
  
  const handleOpenCompleteDialog = (list: ComplianceList) => {
    setSelectedList(list);
    setIsCompleteDialogOpen(true);
  };
  
  const getPropertyName = (propertyId: string): string => {
    const property = properties.find((p: Property) => p.id === propertyId);
    return property ? property.name : "Unknown Property";
  };

  return {
    assignedLists,
    currentUser,
    isPreviewOpen,
    setIsPreviewOpen,
    selectedList,
    isCompleteDialogOpen,
    setIsCompleteDialogOpen,
    handleViewList,
    handleOpenCompleteDialog,
    handleCompleteSubmit,
    getPropertyName
  };
};
