
import { useState, useEffect, useRef } from 'react';
import { ComplianceList, ComplianceFormMode } from '../types';
import { Property } from '@/types/property';
import { loadComplianceLists, saveComplianceLists, updatePropertyNamesInLists } from '../complianceUtils';
import { mockComplianceLists } from '../mockComplianceLists';

export const useComplianceListsState = (properties: Property[]) => {
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

  return {
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
  };
};
