
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
import { useComplianceLists } from "../compliance/hooks/useComplianceLists";
import { Property } from "@/types/property";
import EmptyComplianceLists from "./compliance/EmptyComplianceLists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  console.log("Current user ID:", userId);
  console.log("Type of userId:", typeof userId);

  // Check for additional IDs that might match (for Tristan Gross)
  const possibleIds = [userId, "1743265006833"];
  
  // Try to get the lists with all possible IDs
  let assignedLists: ComplianceList[] = [];
  possibleIds.forEach(id => {
    const lists = getAssignedListsForTech(id);
    console.log(`Lists found for ID ${id}:`, lists);
    assignedLists = [...assignedLists, ...lists];
  });
  
  // Remove duplicates
  assignedLists = assignedLists.filter((list, index, self) => 
    index === self.findIndex(l => l.id === list.id)
  );
  
  console.log("Final assigned lists:", assignedLists);
  
  // Find the current user
  const currentUser = users.find(user => user.id === userId);
  
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            {currentUser && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={currentUser.photo_url} alt={`${currentUser.first_name} ${currentUser.last_name}`} />
                <AvatarFallback>{currentUser.first_name?.[0]}{currentUser.last_name?.[0]}</AvatarFallback>
              </Avatar>
            )}
            <CardTitle>My Compliance Lists</CardTitle>
          </div>
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
