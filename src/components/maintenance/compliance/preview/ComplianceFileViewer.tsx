
import { useRef, useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ComplianceFileViewerProps {
  fileUrl: string;
  title: string;
}

const ComplianceFileViewer = ({ fileUrl, title }: ComplianceFileViewerProps) => {
  const fileRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset error state when fileUrl changes
    setError(null);
  }, [fileUrl]);

  const handleIframeError = () => {
    setError("Failed to load document. Please check if the file exists and is accessible.");
  };

  return (
    <div className="flex-1 w-full h-full min-h-[500px] flex flex-col">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <iframe 
        ref={fileRef}
        src={fileUrl} 
        className="w-full h-full border rounded"
        title={title}
        onError={handleIframeError}
        onLoad={() => setError(null)}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default ComplianceFileViewer;
