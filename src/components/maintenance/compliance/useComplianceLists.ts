
import { useState, useEffect } from 'react';
import { ComplianceList, ComplianceFormMode } from './types';
import { Property } from '@/types/property';
import { mockComplianceLists } from './mockComplianceLists';
import { updatePropertyNamesInLists, filterComplianceLists } from './complianceUtils';
import { useComplianceFormHandlers } from './useComplianceFormHandlers';

export const useComplianceLists = (initialProperties: Property[]) => {
  const [activeTab, setActiveTab] = useState("active");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<ComplianceFormMode>("create");
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [complianceLists, setComplianceLists] = useState<ComplianceList[]>(mockComplianceLists);

  // Update properties when initialProperties changes
  useEffect(() => {
    setProperties(initialProperties);
    
    // Update property names in compliance lists when properties change
    setComplianceLists(prevLists => updatePropertyNamesInLists(prevLists, initialProperties));
  }, [initialProperties]);

  // Set default property selection when properties are loaded
  useEffect(() => {
    if (properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
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

  // Filter lists by property and status
  const filteredLists = filterComplianceLists(
    complianceLists,
    selectedPropertyId,
    activeTab === "active" ? "active" : "archived"
  );

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
    handlePropertyChange
  };
};
