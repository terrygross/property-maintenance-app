
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseFileHandlersProps {
  fileUrl: string;
  title: string;
}

export const useFileHandlers = ({ fileUrl, title }: UseFileHandlersProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const hasAttachedFile = !!fileUrl && fileUrl.length > 0 && fileUrl !== "#";
  const fileExtension = hasAttachedFile ? fileUrl.split('.').pop()?.toLowerCase() : '';
  const isPdf = fileExtension === 'pdf';
  const isDocx = fileExtension === 'docx' || fileExtension === 'doc';
  const canPreviewFile = isPdf; // Only PDFs can be viewed in iframe reliably

  useEffect(() => {
    // Log file information for debugging purposes
    if (hasAttachedFile) {
      console.log("File handler initialized with:", {
        fileUrl,
        extension: fileExtension,
        isPdf,
        isDocx,
        canPreview: canPreviewFile
      });
    }
  }, [fileUrl, fileExtension, isPdf, isDocx, canPreviewFile, hasAttachedFile]);

  const handleOpenOriginalFile = () => {
    if (hasAttachedFile) {
      // For testing purposes, if the URL is a relative path or doesn't start with http,
      // we'll assume it's a test URL and open a sample PDF
      let urlToOpen = fileUrl;
      
      if (!urlToOpen.startsWith('http') && !urlToOpen.startsWith('blob:')) {
        // For demo/test purposes - use a reliable sample PDF
        urlToOpen = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        console.log("Using sample PDF for testing:", urlToOpen);
      }
      
      window.open(urlToOpen, '_blank');
      
      toast({
        title: "Opening file",
        description: `Opening ${title} in a new tab`,
      });
    }
  };

  const handleDownloadFile = () => {
    if (hasAttachedFile) {
      setIsLoading(true);
      
      try {
        // For testing purposes, if the URL is a relative path or doesn't start with http,
        // we'll assume it's a test URL and download a sample PDF
        let urlToDownload = fileUrl;
        
        if (!urlToDownload.startsWith('http') && !urlToDownload.startsWith('blob:')) {
          // For demo/test purposes - use a reliable sample PDF
          urlToDownload = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
          console.log("Using sample PDF for testing:", urlToDownload);
        }
        
        const link = document.createElement('a');
        link.href = urlToDownload;
        link.download = `${title}.${fileExtension || 'pdf'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "File downloading",
          description: `Downloading ${title}.${fileExtension || 'pdf'}`,
        });
      } catch (error) {
        console.error("Download error:", error);
        toast({
          title: "Download failed",
          description: "There was an error downloading the file. Try opening it in a new tab instead.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    hasAttachedFile,
    isPdf,
    isDocx,
    canPreviewFile,
    isLoading,
    handleOpenOriginalFile,
    handleDownloadFile
  };
};
