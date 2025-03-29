
import { ComplianceList } from './types';
import { Property } from '@/types/property';
import { useToast } from '@/hooks/use-toast';

// Update property names in compliance lists based on property data
export const updatePropertyNamesInLists = (
  lists: ComplianceList[],
  properties: Property[]
): ComplianceList[] => {
  return lists.map(list => {
    const property = properties.find(p => p.id === list.propertyId);
    return property 
      ? { ...list, propertyName: property.name } 
      : list;
  });
};

// Filter lists by property and status
export const filterComplianceLists = (
  lists: ComplianceList[],
  propertyId: string,
  status: "active" | "archived"
): ComplianceList[] => {
  return lists.filter(list => 
    list.propertyId === propertyId && 
    list.status === status
  );
};

// Toast notifications for compliance list actions
export const useComplianceToasts = () => {
  const { toast } = useToast();
  
  return {
    showFileUploadToast: (fileName: string) => {
      toast({
        title: "File uploaded",
        description: `${fileName} has been uploaded. Please complete the form to create the compliance list.`,
      });
    },
    
    showViewToast: (title: string) => {
      toast({
        title: "Viewing compliance list",
        description: `Viewing ${title}`,
      });
    },
    
    showArchiveToast: () => {
      toast({
        title: "List archived",
        description: "The compliance list has been archived.",
      });
    },
    
    showRestoreToast: () => {
      toast({
        title: "List restored",
        description: "The compliance list has been restored to active status.",
      });
    },
    
    showDeleteToast: () => {
      toast({
        title: "List deleted",
        description: "The compliance list has been permanently deleted.",
      });
    },
    
    showCreateToast: () => {
      toast({
        title: "List created",
        description: "A new compliance list has been created.",
      });
    },
    
    showUpdateToast: () => {
      toast({
        title: "List updated",
        description: "The compliance list has been updated.",
      });
    }
  };
};
