
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseFileHandlersProps {
  fileUrl: string;
  title: string;
}

export const useFileHandlers = ({ fileUrl, title }: UseFileHandlersProps) => {
  const [showOriginalFile, setShowOriginalFile] = useState(false);
  const { toast } = useToast();
  
  const hasAttachedFile = !!fileUrl && fileUrl.length > 0;
  const fileExtension = hasAttachedFile ? fileUrl.split('.').pop()?.toLowerCase() : '';
  const isPdf = fileExtension === 'pdf';
  const isDocx = fileExtension === 'docx' || fileExtension === 'doc';
  const canPreviewFile = isPdf; // Only PDFs can be viewed in iframe reliably

  const handleOpenOriginalFile = () => {
    if (hasAttachedFile) {
      if (canPreviewFile) {
        setShowOriginalFile(true);
      } else {
        // For non-previewable files, open in a new tab or download
        window.open(fileUrl, '_blank');
      }
    }
  };

  const handleDownloadFile = () => {
    if (hasAttachedFile) {
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
    }
  };

  return {
    showOriginalFile,
    setShowOriginalFile,
    hasAttachedFile,
    isPdf,
    isDocx,
    canPreviewFile,
    handleOpenOriginalFile,
    handleDownloadFile
  };
};
