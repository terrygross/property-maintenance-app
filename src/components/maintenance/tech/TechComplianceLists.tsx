
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Eye, CheckSquare } from "lucide-react";
import { ComplianceList } from "../compliance/types";
import CompliancePreview from "../compliance/CompliancePreview";
import ComplianceComplete from "../compliance/ComplianceComplete";
import { useAppState } from "@/context/AppStateContext";
import { useComplianceLists } from "../compliance/useComplianceLists";
import { Property } from "@/types/property";
import EmptyComplianceLists from "./compliance/EmptyComplianceLists";

interface TechComplianceListsProps {
  userId: string;
}

const TechComplianceLists = ({ userId }: TechComplianceListsProps) => {
  const { properties, users } = useAppState();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<ComplianceList | null>(null);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  
  const {
    getAssignedListsForTech,
    handleCompleteSubmit
  } = useComplianceLists(properties, users);
  
  // Get lists assigned to this technician
  const assignedLists = getAssignedListsForTech(userId);
  
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Compliance Lists</CardTitle>
        </CardHeader>
        <CardContent>
          {assignedLists.length === 0 ? (
            <EmptyComplianceLists />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>List</TableHead>
                  <TableHead className="hidden md:table-cell">Property</TableHead>
                  <TableHead className="hidden md:table-cell">Assigned Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedLists.map((list) => (
                  <TableRow key={list.id}>
                    <TableCell>
                      <div className="font-medium">{list.title}</div>
                      <div className="text-xs text-muted-foreground md:hidden">
                        {getPropertyName(list.propertyId)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getPropertyName(list.propertyId)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(list.updatedAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={list.status === "completed" 
                          ? "bg-green-50 text-green-600 border-green-200" 
                          : "bg-yellow-50 text-yellow-600 border-yellow-200"
                        }
                      >
                        {list.status === "completed" ? "Completed" : "Assigned"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewList(list)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        
                        {list.status !== "completed" && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleOpenCompleteDialog(list)}
                          >
                            <CheckSquare className="h-4 w-4" />
                            <span className="sr-only">Complete</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Preview Dialog */}
      {selectedList && (
        <CompliancePreview
          list={selectedList}
          isOpen={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
      
      {/* Complete Dialog */}
      {selectedList && (
        <ComplianceComplete
          list={selectedList}
          isOpen={isCompleteDialogOpen}
          onOpenChange={setIsCompleteDialogOpen}
          onComplete={handleCompleteSubmit}
        />
      )}
    </div>
  );
};

export default TechComplianceLists;
