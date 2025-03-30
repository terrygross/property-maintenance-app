
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckSquare } from "lucide-react";
import { format } from "date-fns";
import { ComplianceList } from "../../compliance/types";

interface ComplianceListCardProps {
  list: ComplianceList;
  propertyName: string;
  onView: (list: ComplianceList) => void;
  onComplete: (list: ComplianceList) => void;
}

const ComplianceListCard = ({ 
  list, 
  propertyName, 
  onView, 
  onComplete 
}: ComplianceListCardProps) => {
  return (
    <div className="bg-white rounded-lg border p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{list.title}</h3>
          <p className="text-sm text-muted-foreground mb-1">{propertyName}</p>
        </div>
        <Badge 
          variant="outline" 
          className={list.status === "completed" 
            ? "bg-green-50 text-green-600 border-green-200" 
            : "bg-yellow-50 text-yellow-600 border-yellow-200"
          }
        >
          {list.status === "completed" ? "Completed" : "Assigned"}
        </Badge>
      </div>
      
      <div className="text-xs text-muted-foreground mb-3">
        Updated: {list.updatedAt ? format(new Date(list.updatedAt), "MMM d, yyyy") : "N/A"}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onView(list)}
          className="flex items-center gap-1"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View</span>
        </Button>
        
        {list.status !== "completed" && (
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onComplete(list)}
            className="flex items-center gap-1"
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span>Complete</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ComplianceListCard;
