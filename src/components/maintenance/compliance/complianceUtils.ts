
import { ComplianceList, ComplianceStatus } from "./types";
import { Property } from "@/types/property";

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
