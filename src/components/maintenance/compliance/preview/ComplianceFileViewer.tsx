
import { useRef } from "react";

interface ComplianceFileViewerProps {
  fileUrl: string;
  title: string;
}

const ComplianceFileViewer = ({ fileUrl, title }: ComplianceFileViewerProps) => {
  const fileRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="flex-1 w-full h-full min-h-[500px]">
      <iframe 
        ref={fileRef}
        src={fileUrl} 
        className="w-full h-full border rounded"
        title={title}
      />
    </div>
  );
};

export default ComplianceFileViewer;
