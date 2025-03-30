
import { useRef } from "react";

interface ComplianceFileViewerProps {
  fileUrl: string;
  title: string;
}

const ComplianceFileViewer = ({ fileUrl, title }: ComplianceFileViewerProps) => {
  const fileRef = useRef<HTMLIFrameElement>(null);
  
  // Determine if the file is a PDF based on its extension
  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="flex-1 w-full h-full">
      {isPdf ? (
        <iframe 
          ref={fileRef}
          src={fileUrl} 
          className="w-full h-full border rounded"
          title={title}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 mb-4">This file type cannot be previewed directly in the browser.</p>
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Open in New Tab
          </a>
        </div>
      )}
    </div>
  );
};

export default ComplianceFileViewer;
