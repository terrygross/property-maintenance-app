
import { useState, useEffect, useRef } from 'react';
import { ComplianceList, ComplianceFormMode } from './types';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { mockComplianceLists } from './mockComplianceLists';
import { updatePropertyNamesInLists, filterComplianceLists } from './complianceUtils';
import { useComplianceFormHandlers } from './useComplianceFormHandlers';
import { useToast } from '@/hooks/use-toast';

export const useComplianceLists = (properties: Property[], users: User[]) => {
  const [activeTab, setActiveTab] = useState("active");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<ComplianceFormMode>("create");
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
  const [complianceLists, setComplianceLists] = useState<ComplianceList[]>(mockComplianceLists);
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

  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
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
    setComplianceLists,
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
    setComplianceLists(prevLists => 
      prevLists.map(list => 
        list.id === listId 
          ? { 
              ...list, 
              status: "assigned", 
              assignedTo: techId, 
              assignedToName: techName,
              updatedAt: new Date()
            } 
          : list
      )
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
    setComplianceLists(prevLists => 
      prevLists.map(list => 
        list.id === listId 
          ? { 
              ...list, 
              status: "completed", 
              completedAt: new Date(),
              notes: notes,
              updatedAt: new Date()
            } 
          : list
      )
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

  // Filter for technician assigned lists
  const getAssignedListsForTech = (techId: string) => {
    return complianceLists.filter(list => 
      list.assignedTo === techId && 
      (list.status === "assigned" || list.status === "completed")
    );
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
