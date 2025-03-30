
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { useComplianceListsState } from './useComplianceListsState';
import { useComplianceOperations } from './useComplianceOperations';
import { useComplianceFormHandlers } from '../useComplianceFormHandlers';
import { purgeExpiredLists } from '../complianceUtils';
import { useEffect } from 'react';

export const useComplianceLists = (properties: Property[], users: User[]) => {
  // Get the state management
  const {
    activeTab,
    setActiveTab,
    isFormOpen,
    setIsFormOpen,
    formMode,
    setFormMode,
    selectedList,
    setSelectedList,
    selectedPropertyId,
    complianceLists,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    isCompleteDialogOpen,
    setIsCompleteDialogOpen,
    handlePropertyChange,
    updateComplianceLists
  } = useComplianceListsState(properties);

  // Get operations for assignment and completion
  const {
    handleAssign,
    handleAssignSubmit,
    handleComplete,
    handleCompleteSubmit,
    getAssignedListsForTech,
    getFilteredLists,
    handleSoftDelete,
    handleRestoreFromBin,
    handlePermanentDelete,
    getListsDueForDeletion
  } = useComplianceOperations(complianceLists, updateComplianceLists);

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
    updateComplianceLists,
    setIsFormOpen,
    setFormMode,
    setSelectedList
  );

  // Automatically purge expired lists (older than 30 days) on component mount
  useEffect(() => {
    const purgeOldLists = () => {
      updateComplianceLists(prevLists => purgeExpiredLists(prevLists));
    };
    
    purgeOldLists();
    
    // Also set up a check periodically (once a day is sufficient)
    const interval = setInterval(purgeOldLists, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [updateComplianceLists]);

  // Filter lists by property and status
  const filteredLists = getFilteredLists(selectedPropertyId, activeTab);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return {
    // State
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
    
    // Form handlers
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
    
    // Property handlers
    handlePropertyChange,
    
    // Assignment and completion
    handleAssign,
    handleAssignSubmit,
    handleComplete,
    handleCompleteSubmit,
    
    // Recycle bin operations
    handleSoftDelete,
    handleRestoreFromBin,
    handlePermanentDelete,
    
    // Tech-specific lists
    getAssignedListsForTech
  };
};
