
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Eye, 
  Archive, 
  RefreshCw, 
  Trash2 
} from "lucide-react";
import { ComplianceList } from "./types";
import { format } from "date-fns";

interface ComplianceListTableProps {
  lists: ComplianceList[];
  onEdit?: (list: ComplianceList) => void;
  onView: (list: ComplianceList) => void;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDelete?: (id: string) => void;
  showArchiveAction: boolean;
  showRestoreAction: boolean;
}

const ComplianceListTable = ({
  lists,
  onEdit,
  onView,
  onArchive,
  onRestore,
  onDelete,
  showArchiveAction,
  showRestoreAction
}: ComplianceListTableProps) => {
  if (lists.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No compliance lists found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Version</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.map((list) => (
            <TableRow key={list.id}>
              <TableCell className="font-medium">{list.title}</TableCell>
              <TableCell>{list.description}</TableCell>
              <TableCell>{format(list.updatedAt, 'MMM d, yyyy')}</TableCell>
              <TableCell>v{list.version}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(list)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(list)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  )}
                  
                  {showArchiveAction && onArchive && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onArchive(list.id)}
                    >
                      <Archive className="h-4 w-4" />
                      <span className="sr-only">Archive</span>
                    </Button>
                  )}
                  
                  {showRestoreAction && onRestore && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRestore(list.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Restore</span>
                    </Button>
                  )}
                  
                  {onDelete && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(list.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComplianceListTable;
