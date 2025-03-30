
import { ComplianceList } from "../types";

interface CompliancePreviewHeaderProps {
  data: ComplianceList;
}

const CompliancePreviewHeader = ({ data }: CompliancePreviewHeaderProps) => {
  // Ensure propertyName has a fallback value
  const propertyName = data.propertyName || "Unknown Property";
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-1">{data.title}</h2>
      <div className="text-sm text-muted-foreground mb-2">
        <span className="font-medium">Property:</span> {propertyName}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <div>
          <span className="font-medium">Updated:</span>{" "}
          {new Date(data.updatedAt).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Version:</span> {data.version}
        </div>
      </div>
    </div>
  );
};

export default CompliancePreviewHeader;
