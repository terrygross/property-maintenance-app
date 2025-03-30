
import { useState, useEffect, useRef } from 'react';
import { ComplianceList, ComplianceFormMode } from './types';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { mockComplianceLists } from './mockComplianceLists';
import { updatePropertyNamesInLists, filterComplianceLists, saveComplianceLists, loadComplianceLists } from './complianceUtils';
import { useComplianceFormHandlers } from './useComplianceFormHandlers';
import { useToast } from '@/hooks/use-toast';

export const useComplianceLists = (properties: Property[], users: User[]) => {
  const [activeTab, setActiveTab] = useState("active");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<ComplianceFormMode>("create");
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
  const [complianceLists, setComplianceLists] = useState<ComplianceList[]>(() => {
    return loadComplianceLists(mockComplianceLists);
  });
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Using a ref to track if this is the first render
  const isFirstRender = useRef(true);

  // Set default property selection when properties are loaded
  useEffect(() => {
    if (properties.length > 0) {
      // Only set selectedPropertyId if it's not set yet or if the current selection doesn't exist anymore
      if (!selectedPropertyId || !properties.find(p => p.id === selectedPropertyId)) {
        setSelectedPropertyId(properties[0].id);
      }
      
      // Update property names in compliance lists when properties change
      setComplianceLists(prevLists => updatePropertyNamesInLists(prevLists, properties));
    }
  }, [properties, selectedPropertyId]);

  // Save compliance lists to localStorage whenever they change
  useEffect(() => {
    if (!isFirstRender.current) {
      saveComplianceLists(complianceLists);
    } else {
      isFirstRender.current = false;
    }
  }, [complianceLists]);

  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  // Create a wrapped version of setComplianceLists that also saves to localStorage
  const updateComplianceLists = (listsOrUpdateFn: ComplianceList[] | ((prev: ComplianceList[]) => ComplianceList[])) => {
    setComplianceLists(prev => {
      const newLists = typeof listsOrUpdateFn === 'function' ? listsOrUpdateFn(prev) : listsOrUpdateFn;
      return newLists;
    });
  };

  // Get form handlers
  const {
    fileInputRef,
    handleFileUpload,
    handleFileChange,
    handleCreateNew,
    handleEdit,
    handleView,
    handleArchive,
    handleRestore,
    handleDelete,
    handleFormSubmit,
    handleFormCancel
  } = useComplianceFormHandlers(
    properties,
    complianceLists,
    updateComplianceLists, // Pass our wrapped function instead
    setIsFormOpen,
    setFormMode,
    setSelectedList
  );

  // New handlers for assignment and completion
  const handleAssign = (list: ComplianceList) => {
    setSelectedList(list);
    setIsAssignDialogOpen(true);
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
    setSelectedList(list);
    setIsCompleteDialogOpen(true);
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

  // Filter lists by property and status
  const filteredLists = filterComplianceLists(
    complianceLists,
    selectedPropertyId,
    activeTab === "active" ? ["active", "assigned"] : 
    activeTab === "completed" ? ["completed"] : ["archived"]
  );

  // Filter for technician assigned lists - fixed to correctly check for assigned status
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

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return {
    activeTab,
    setActiveTab,
    isFormOpen,
    formMode,
    selectedList,
    selectedPropertyId,
    properties,
    complianceLists: filteredLists,
    fileInputRef,
    selectedProperty,
    users,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    isCompleteDialogOpen,
    setIsCompleteDialogOpen,
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
    handleComplete,
    handleCompleteSubmit,
    getAssignedListsForTech
  };
};
