
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { Job } from "../jobsListUtils";

interface ExportJobsButtonProps {
  jobs: Job[];
}

const ExportJobsButton = ({ jobs }: ExportJobsButtonProps) => {
  const { toast } = useToast();
  
  const handleExportJobs = () => {
    try {
      const completedJobs = jobs.filter(job => job.status === "completed");
      
      if (completedJobs.length === 0) {
        toast({
          title: "No completed jobs",
          description: "There are no completed jobs to export.",
          variant: "destructive",
        });
        return;
      }
      
      const exportData = completedJobs.map(job => ({
        ID: job.id,
        Title: job.title,
        Location: job.location,
        Priority: job.priority,
        Status: job.status,
        AssignedTo: job.assignedTo,
        DueDate: job.dueDate.toLocaleDateString(),
        CompletionDate: new Date().toLocaleDateString(),
        HasBeforePhoto: job.photos?.before ? "Yes" : "No",
        HasAfterPhoto: job.photos?.after ? "Yes" : "No"
      }));
      
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            const stringValue = String(value).replace(/"/g, '""');
            return `"${stringValue}"`;
          }).join(',')
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `completed_jobs_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: `${completedJobs.length} completed jobs exported to CSV.`,
      });
    } catch (error) {
      console.error("Error exporting jobs:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the jobs.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleExportJobs}
      className="flex items-center gap-1"
    >
      <Download className="h-4 w-4" />
      Export to Excel
    </Button>
  );
};

export default ExportJobsButton;
