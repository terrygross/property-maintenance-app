
import { ComplianceList } from "../types";
import ComplianceListTable from "../ComplianceListTable";

interface ComplianceTabContentProps {
  activeTab: string;
  lists: ComplianceList[];
  onEdit?: (list: ComplianceList) => void;
  onView: (list: ComplianceList) => void;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onAssign?: (list: ComplianceList) => void;
  onRestoreFromBin?: (id: string) => void;
  onPermanentDelete?: (id: string) => void;
}

const ComplianceTabContent = ({ 
  activeTab,
  lists,
  onEdit,
  onView,
  onArchive,
  onRestore,
  onDelete,
  onAssign,
  onRestoreFromBin,
  onPermanentDelete
}: ComplianceTabContentProps) => {
  // Determine which actions to show based on the active tab
  const showArchiveAction = activeTab === "active" || activeTab === "completed";
  const showRestoreAction = activeTab === "archived";
  const showAssignAction = activeTab === "active";
  const showRestoreFromBinAction = activeTab === "deleted";
  const showPermanentDeleteAction = activeTab === "deleted";

  return (
    <ComplianceListTable 
      lists={lists}
      onEdit={onEdit}
      onView={onView}
      onArchive={onArchive}
      onRestore={onRestore}
      onDelete={onDelete}
      onAssign={onAssign}
      onRestoreFromBin={onRestoreFromBin}
      onPermanentDelete={onPermanentDelete}
      showArchiveAction={showArchiveAction}
      showRestoreAction={showRestoreAction}
      showAssignAction={showAssignAction}
      showRestoreFromBinAction={showRestoreFromBinAction}
      showPermanentDeleteAction={showPermanentDeleteAction}
    />
  );
};

export default ComplianceTabContent;
