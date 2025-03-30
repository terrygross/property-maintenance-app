
import { useRef, useEffect, useState } from "react";

interface ComplianceFileViewerProps {
  fileUrl: string;
  title: string;
}

const ComplianceFileViewer = ({ fileUrl, title }: ComplianceFileViewerProps) => {
  const fileRef = useRef<HTMLIFrameElement>(null);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  // Determine if the file is a PDF based on its extension
  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  useEffect(() => {
    // Log when the component mounts with a file URL
    console.log("ComplianceFileViewer mounted with URL:", fileUrl);
    console.log("File type detection isPDF:", isPdf);
    
    // If file doesn't load properly, we can try to force reload
    if (fileRef.current && loadAttempts < 2) {
      const iframe = fileRef.current;
      iframe.onload = () => {
        console.log("PDF iframe loaded successfully");
      };
      
      iframe.onerror = () => {
        console.error("Error loading PDF in iframe");
        setLoadAttempts(prev => prev + 1);
      };
    }
  }, [fileUrl, isPdf, loadAttempts]);

  // For debugging purposes
  if (!fileUrl || fileUrl === "#") {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500 mb-4">No file URL provided or invalid URL.</p>
        <p className="text-gray-500">URL received: {fileUrl || "none"}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full">
      {isPdf ? (
        <div className="w-full h-full">
          <iframe 
            ref={fileRef}
            src={fileUrl + "#toolbar=1&navpanes=1&scrollbar=1"} 
            className="w-full h-full border rounded"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms"
            allowFullScreen
          />
          <div className="text-xs text-gray-500 mt-1 text-center">
            If the PDF doesn't display correctly, try the "Open in New Tab" button below.
          </div>
        </div>
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
