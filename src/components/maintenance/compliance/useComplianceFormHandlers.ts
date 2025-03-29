import { useState, useRef } from 'react';
import { ComplianceList, ComplianceFormMode } from './types';
import { Property } from '@/types/property';
import { useComplianceToasts } from './complianceUtils';

export const useComplianceFormHandlers = (
  properties: Property[],
  complianceLists: ComplianceList[],
  setComplianceLists: React.Dispatch<React.SetStateAction<ComplianceList[]>>,
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setFormMode: React.Dispatch<React.SetStateAction<ComplianceFormMode>>,
  setSelectedList: React.Dispatch<React.SetStateAction<ComplianceList | null>>
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toasts = useComplianceToasts();
  
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toasts.showFileUploadToast(file.name);
      
      setFormMode("create");
      setSelectedList(null);
      setIsFormOpen(true);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCreateNew = () => {
    setFormMode("create");
    setSelectedList(null);
    setIsFormOpen(true);
  };

  const handleEdit = (list: ComplianceList) => {
    setFormMode("edit");
    setSelectedList(list);
    setIsFormOpen(true);
  };

  const handleView = (list: ComplianceList) => {
    toasts.showViewToast(list.title);
  };

  const handleArchive = (id: string) => {
    setComplianceLists(prev => 
      prev.map(list => 
        list.id === id ? { ...list, status: "archived" } : list
      )
    );
    toasts.showArchiveToast();
  };

  const handleRestore = (id: string) => {
    setComplianceLists(prev => 
      prev.map(list => 
        list.id === id ? { ...list, status: "active" } : list
      )
    );
    toasts.showRestoreToast();
  };

  const handleDelete = (id: string) => {
    setComplianceLists(prev => prev.filter(list => list.id !== id));
    toasts.showDeleteToast();
  };

  const handleFormSubmit = (data: Omit<ComplianceList, "id" | "createdAt" | "updatedAt" | "version">) => {
    if (data.propertyId) {
      const propertyName = properties.find(p => p.id === data.propertyId)?.name || "";
      
      if (formMode === "create") {
        const newList: ComplianceList = {
          ...data,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          propertyName
        };
        setComplianceLists(prev => [...prev, newList]);
        toasts.showCreateToast();
      } else if (formMode === "edit" && selectedList) {
        setComplianceLists(prev => 
          prev.map(list => 
            list.id === selectedList.id 
              ? { 
                  ...list, 
                  ...data, 
                  updatedAt: new Date(),
                  version: list.version + 1,
                  propertyName
                } 
              : list
          )
        );
        toasts.showUpdateToast();
      }
      setIsFormOpen(false);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  // We need to use formMode and selectedList in the handlers
  const [formMode, setFormModeState] = useState<ComplianceFormMode>("create");
  const [selectedList, setSelectedListState] = useState<ComplianceList | null>(null);

  // Keep these in sync with the parent state
  const setFormModeWrapper = (mode: ComplianceFormMode) => {
    setFormModeState(mode);
    setFormMode(mode);
  };

  const setSelectedListWrapper = (list: ComplianceList | null) => {
    setSelectedListState(list);
    setSelectedList(list);
  };

  return {
    fileInputRef,
    formMode,
    selectedList,
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
    setFormMode: setFormModeWrapper,
    setSelectedList: setSelectedListWrapper
  };
};
