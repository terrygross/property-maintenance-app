
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, FileText, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ComplianceFileViewerProps {
  fileUrl: string;
  title: string;
  onOpenInNewTab: () => void;
  onDownload: () => void;
}

const ComplianceFileViewer = ({ 
  fileUrl, 
  title, 
  onOpenInNewTab,
  onDownload
}: ComplianceFileViewerProps) => {
  const fileRef = useRef<HTMLIFrameElement>(null);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Determine if the file is a PDF based on its extension
  const isPdf = fileUrl?.toLowerCase().endsWith('.pdf');

  useEffect(() => {
    // Log when the component mounts with a file URL
    console.log("ComplianceFileViewer mounted with URL:", fileUrl);
    console.log("File type detection isPDF:", isPdf);
    console.log("Device is mobile:", isMobile);
    
    // Reset error state when file URL changes
    setLoadError(false);
    setIsLoading(true);
    
    // For mobile devices, we'll skip trying to embed PDFs directly
    if (!isMobile && isPdf && fileRef.current) {
      const iframe = fileRef.current;
      
      const handleIframeError = () => {
        console.error("Error loading PDF in iframe");
        setLoadError(true);
      };
      
      iframe.onerror = handleIframeError;
      
      // Handle iframe load events
      const handleLoad = () => {
        setIsLoading(false);
        // Check if the iframe content actually loaded properly
        try {
          if (iframe.contentDocument && iframe.contentDocument.body.innerHTML === '') {
            handleIframeError();
          }
        } catch (e) {
          // Cross-origin issues might prevent checking the iframe content
          console.log("Cross-origin issue or other error:", e);
        }
      };
      
      iframe.onload = handleLoad;
      
      // Also set a timeout to detect loading issues
      const timeout = setTimeout(() => {
        setIsLoading(false);
        if (fileRef.current) {
          try {
            if (!fileRef.current.contentDocument || 
                fileRef.current.contentDocument.body.innerHTML === '') {
              handleIframeError();
            }
          } catch (e) {
            // If we can't access contentDocument, assume there's an issue
            handleIframeError();
          }
        }
      }, 5000);
      
      return () => {
        clearTimeout(timeout);
        if (iframe) {
          iframe.onload = null;
          iframe.onerror = null;
        }
      };
    } else {
      // For non-PDF or mobile, we don't need to wait
      setIsLoading(false);
    }
  }, [fileUrl, isPdf, isMobile]);

  // For debugging purposes
  if (!fileUrl || fileUrl === "#") {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <FileText className="h-16 w-16 text-gray-400 mb-2" />
        <p className="text-gray-500 mb-4">No document attached to this compliance list.</p>
        <p className="text-sm text-gray-400">You can still use the checklist tab.</p>
      </div>
    );
  }

  // For mobile devices or if we've encountered load errors, show mobile-friendly view
  if (isMobile || loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="bg-gray-100 rounded-lg p-6 mb-6 text-center w-full max-w-md">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-500 mb-6">
            {isPdf ? "PDF document" : "Document"}
            <span className="block text-sm">
              For better viewing experience on mobile devices, please use one of the options below:
            </span>
          </p>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button 
              onClick={onOpenInNewTab}
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Browser
            </Button>
            <Button 
              onClick={onDownload}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // For desktop, try to use iframe for PDFs
  return (
    <div className="flex-1 w-full h-full">
      {isPdf ? (
        <div className="w-full h-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Loading document...</p>
              </div>
            </div>
          )}
          
          <iframe 
            ref={fileRef}
            src={`${fileUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border rounded"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms"
            allowFullScreen
          />
          
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="bg-gray-100 rounded-lg p-6 text-center max-w-md">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Unable to preview PDF</h3>
                <p className="text-gray-500 mb-4">The PDF couldn't be loaded directly in the app.</p>
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={onOpenInNewTab}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </Button>
                  <Button 
                    onClick={onDownload}
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {!loadError && !isLoading && (
            <div className="text-xs text-gray-500 mt-1 text-center">
              If the PDF doesn't display correctly, try the "Open in New Tab" button below.
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 mb-4">This file type cannot be previewed directly in the browser.</p>
          <div className="flex gap-3">
            <Button 
              onClick={onOpenInNewTab}
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
            <Button 
              onClick={onDownload}
              variant="outline" 
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceFileViewer;
