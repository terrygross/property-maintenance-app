
import { ComplianceList } from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, PencilIcon, ArchiveIcon, RotateCcw, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  showRestoreAction,
}: ComplianceListTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">Last Updated</TableHead>
            <TableHead className="hidden md:table-cell">Version</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No compliance lists found.
              </TableCell>
            </TableRow>
          ) : (
            lists.map((list) => (
              <TableRow key={list.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{list.title}</div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {format(new Date(list.updatedAt), "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {list.description}
                    </div>
                    {list.version > 1 && (
                      <Badge variant="outline" className="mt-1 md:hidden">
                        v{list.version}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {list.description}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(list.updatedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {list.version > 1 ? (
                    <Badge variant="outline">v{list.version}</Badge>
                  ) : (
                    "v1"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(list)}
                      title="View list"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    
                    {onEdit && showArchiveAction && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(list)}
                        title="Edit list"
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    )}
                    
                    {onArchive && showArchiveAction && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onArchive(list.id)}
                        title="Archive list"
                      >
                        <ArchiveIcon className="h-4 w-4" />
                        <span className="sr-only">Archive</span>
                      </Button>
                    )}
                    
                    {onRestore && showRestoreAction && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRestore(list.id)}
                        title="Restore list"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span className="sr-only">Restore</span>
                      </Button>
                    )}
                    
                    {onDelete && showRestoreAction && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(list.id)}
                        title="Delete list"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComplianceListTable;
