
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ComplianceList } from "../../compliance/types";

interface ComplianceListTableProps {
  lists: ComplianceList[];
  getPropertyName: (propertyId: string) => string;
  onView: (list: ComplianceList) => void;
  onComplete: (list: ComplianceList) => void;
}

const ComplianceListTable = ({
  lists,
  getPropertyName,
  onView,
  onComplete
}: ComplianceListTableProps) => {
  return (
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
        {lists.map((list) => (
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
              {list.updatedAt ? format(new Date(list.updatedAt), "MMM d, yyyy") : "N/A"}
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
                  onClick={() => onView(list)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                
                {list.status !== "completed" && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onComplete(list)}
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
  );
};

export default ComplianceListTable;
