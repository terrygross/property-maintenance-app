
import { ComplianceList, ComplianceStatus } from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, PencilIcon, ArchiveIcon, RotateCcw, Trash2, UserCheck, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ComplianceListTableProps {
  lists: ComplianceList[];
  onEdit?: (list: ComplianceList) => void;
  onView: (list: ComplianceList) => void;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onAssign?: (list: ComplianceList) => void;
  onRestoreFromBin?: (id: string) => void;
  onPermanentDelete?: (id: string) => void;
  showArchiveAction: boolean;
  showRestoreAction: boolean;
  showAssignAction?: boolean;
  showRestoreFromBinAction?: boolean;
  showPermanentDeleteAction?: boolean;
}

const ComplianceListTable = ({
  lists,
  onEdit,
  onView,
  onArchive,
  onRestore,
  onDelete,
  onAssign,
  onRestoreFromBin,
  onPermanentDelete,
  showArchiveAction,
  showRestoreAction,
  showAssignAction = false,
  showRestoreFromBinAction = false,
  showPermanentDeleteAction = false,
}: ComplianceListTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">Last Updated</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            {showRestoreFromBinAction && (
              <TableHead className="hidden md:table-cell">Deleted At</TableHead>
            )}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showRestoreFromBinAction ? 6 : 5} className="h-24 text-center">
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
                    {list.assignedToName && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Assigned to: {list.assignedToName}
                      </div>
                    )}
                    {list.status === "deleted" && list.deletedAt && (
                      <div className="text-xs text-muted-foreground mt-1 md:hidden">
                        Deleted: {format(new Date(list.deletedAt), "MMM d, yyyy")}
                      </div>
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
                  <StatusBadge status={list.status} />
                </TableCell>
                {showRestoreFromBinAction && (
                  <TableCell className="hidden md:table-cell">
                    {list.deletedAt && format(new Date(list.deletedAt), "MMM d, yyyy")}
                  </TableCell>
                )}
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
                    
                    {onEdit && showArchiveAction && list.status !== "assigned" && list.status !== "completed" && list.status !== "deleted" && (
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
                    
                    {onAssign && showAssignAction && list.status !== "assigned" && list.status !== "completed" && list.status !== "deleted" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAssign(list)}
                        title="Assign list"
                      >
                        <UserCheck className="h-4 w-4" />
                        <span className="sr-only">Assign</span>
                      </Button>
                    )}
                    
                    {onArchive && showArchiveAction && list.status !== "assigned" && list.status !== "completed" && list.status !== "deleted" && (
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

                    {onRestoreFromBin && showRestoreFromBinAction && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRestoreFromBin(list.id)}
                        title="Restore from bin"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Restore from bin</span>
                      </Button>
                    )}
                    
                    {onDelete && !showRestoreFromBinAction && list.status !== "deleted" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(list.id, list.title)}
                        title="Delete list"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                    
                    {onPermanentDelete && showPermanentDeleteAction && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPermanentDelete(list.id)}
                        title="Permanently delete list"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Permanently delete</span>
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

// Helper component to display status badge
const StatusBadge = ({ status }: { status: ComplianceStatus }) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Active</Badge>;
    case "archived":
      return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Archived</Badge>;
    case "assigned":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Assigned</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Completed</Badge>;
    case "deleted":
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Deleted</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default ComplianceListTable;
