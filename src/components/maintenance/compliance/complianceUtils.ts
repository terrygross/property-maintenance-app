
import { ComplianceList, ComplianceStatus } from "./types";
import { Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";

export const updatePropertyNamesInLists = (
  lists: ComplianceList[],
  properties: Property[]
): ComplianceList[] => {
  return lists.map(list => {
    const property = properties.find(p => p.id === list.propertyId);
    return {
      ...list,
      propertyName: property ? property.name : "Unknown Property",
    };
  });
};

export const filterComplianceLists = (
  lists: ComplianceList[],
  propertyId: string,
  status: ComplianceStatus | ComplianceStatus[]
): ComplianceList[] => {
  const statuses = Array.isArray(status) ? status : [status];
  
  return lists.filter(
    list => 
      list.propertyId === propertyId && 
      statuses.includes(list.status)
  );
};

// Add the missing useComplianceToasts hook
export const useComplianceToasts = () => {
  const { toast } = useToast();
  
  return {
    showFileUploadToast: (fileName: string) => {
      toast({
        title: "File Selected",
        description: `${fileName} ready for upload`,
      });
    },
    showViewToast: (listTitle: string) => {
      toast({
        title: "Viewing List",
        description: `Viewing compliance list: ${listTitle}`,
      });
    },
    showArchiveToast: () => {
      toast({
        title: "List Archived",
        description: "Compliance list has been archived",
      });
    },
    showRestoreToast: () => {
      toast({
        title: "List Restored",
        description: "Compliance list has been restored to active status",
      });
    },
    showDeleteToast: () => {
      toast({
        title: "List Deleted",
        description: "Compliance list has been moved to the recycle bin",
      });
    },
    showPermanentDeleteToast: () => {
      toast({
        title: "List Permanently Deleted",
        description: "Compliance list has been permanently deleted",
      });
    },
    showCreateToast: () => {
      toast({
        title: "List Created",
        description: "New compliance list has been created",
      });
    },
    showUpdateToast: () => {
      toast({
        title: "List Updated",
        description: "Compliance list has been updated",
      });
    },
    showRestoreFromBinToast: () => {
      toast({
        title: "List Restored from Recycle Bin",
        description: "Compliance list has been restored from the recycle bin",
      });
    }
  };
};

// Save compliance lists to localStorage
export const saveComplianceLists = (lists: ComplianceList[]) => {
  localStorage.setItem('complianceLists', JSON.stringify(lists));
};

// Load compliance lists from localStorage or fallback to mock data
export const loadComplianceLists = (mockLists: ComplianceList[]): ComplianceList[] => {
  const savedLists = localStorage.getItem('complianceLists');
  return savedLists ? JSON.parse(savedLists) : mockLists;
};

// Check and purge lists that are over 30 days old in the recycle bin
export const purgeExpiredLists = (lists: ComplianceList[]): ComplianceList[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return lists.filter(list => 
    !(list.status === "deleted" && 
    list.deletedAt && 
    new Date(list.deletedAt) < thirtyDaysAgo)
  );
};
