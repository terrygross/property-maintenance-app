
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import CompliancePreview from "../compliance/CompliancePreview";
import ComplianceComplete from "../compliance/dialogs/ComplianceComplete";
import EmptyComplianceLists from "./compliance/EmptyComplianceLists";
import ComplianceListCard from "./compliance/ComplianceListCard";
import ComplianceListTable from "./compliance/ComplianceListTable";
import { useTechComplianceLists } from "./compliance/useTechComplianceLists";

interface TechComplianceListsProps {
  userId: string;
}

const TechComplianceLists = ({ userId }: TechComplianceListsProps) => {
  const isMobile = useIsMobile();
  
  const {
    assignedLists,
    currentUser,
    isPreviewOpen,
    setIsPreviewOpen,
    selectedList,
    isCompleteDialogOpen,
    setIsCompleteDialogOpen,
    handleViewList,
    handleOpenCompleteDialog,
    handleCompleteSubmit,
    getPropertyName
  } = useTechComplianceLists(userId);

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
          ) : isMobile ? (
            // Mobile view
            <div>
              {assignedLists.map(list => (
                <ComplianceListCard
                  key={list.id}
                  list={list}
                  propertyName={getPropertyName(list.propertyId)}
                  onView={handleViewList}
                  onComplete={handleOpenCompleteDialog}
                />
              ))}
            </div>
          ) : (
            // Desktop view
            <ComplianceListTable
              lists={assignedLists}
              getPropertyName={getPropertyName}
              onView={handleViewList}
              onComplete={handleOpenCompleteDialog}
            />
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
