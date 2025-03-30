
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
      window.open(fileUrl, '_blank');
      
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
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${title}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "File downloading",
          description: `Downloading ${title}.${fileExtension}`,
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
