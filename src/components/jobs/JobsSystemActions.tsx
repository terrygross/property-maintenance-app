
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, FileText } from "lucide-react";
import { Job } from "./jobsListUtils";

interface JobsSystemActionsProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const JobsSystemActions = ({ jobs, setJobs }: JobsSystemActionsProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const rows = csvText.split('\n');
        const headers = rows[0].split(',').map(header => 
          header.trim().replace(/^"(.*)"$/, '$1')
        );
        
        const importedJobs: Job[] = [];
        
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue;
          
          const values = rows[i].split(',').map(value => 
            value.trim().replace(/^"(.*)"$/, '$1')
          );
          
          const rowData: Record<string, string> = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index] || '';
          });
          
          const job: Job = {
            id: rowData['ID'] || `imported-${Date.now()}-${i}`,
            title: rowData['Title'] || 'Imported Job',
            location: rowData['Location'] || '',
            priority: (rowData['Priority'] || 'medium') as string,
            status: "completed",
            assignedTo: rowData['AssignedTo'] || '',
            dueDate: new Date(rowData['DueDate'] || Date.now()),
            techRole: "",
            emailSent: false,
            photos: {
              reporter: "",
              before: rowData['HasBeforePhoto'] === 'Yes' ? 'imported-before-photo' : '',
              after: rowData['HasAfterPhoto'] === 'Yes' ? 'imported-after-photo' : ''
            }
          };
          
          importedJobs.push(job);
        }
        
        if (importedJobs.length === 0) {
          toast({
            title: "Import Failed",
            description: "No valid jobs found in the file.",
            variant: "destructive",
          });
          return;
        }
        
        setJobs(prevJobs => {
          const filteredJobs = prevJobs.filter(job => 
            !importedJobs.some(importedJob => importedJob.id === job.id)
          );
          
          const updatedJobs = [...filteredJobs, ...importedJobs];
          
          try {
            const existingData = localStorage.getItem('reporterJobs');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            
            const updatedData = [...parsedData];
            
            importedJobs.forEach(importedJob => {
              const existingIndex = updatedData.findIndex(job => job.id === importedJob.id);
              
              if (existingIndex >= 0) {
                updatedData[existingIndex] = {
                  ...updatedData[existingIndex],
                  status: "completed"
                };
              } else {
                updatedData.push({
                  id: importedJob.id,
                  title: importedJob.title,
                  property: importedJob.location,
                  priority: importedJob.priority,
                  status: "completed",
                  assignedTo: importedJob.assignedTo,
                  reportDate: new Date().toISOString(),
                  beforePhoto: importedJob.photos?.before || "",
                  afterPhoto: importedJob.photos?.after || ""
                });
              }
            });
            
            localStorage.setItem('reporterJobs', JSON.stringify(updatedData));
          } catch (error) {
            console.error("Error updating localStorage:", error);
          }
          
          return updatedJobs;
        });
        
        toast({
          title: "Import Successful",
          description: `${importedJobs.length} jobs imported successfully.`,
        });
        
        if (event.target) {
          event.target.value = '';
        }
      } catch (error) {
        console.error("Error importing jobs:", error);
        toast({
          title: "Import Failed",
          description: "There was an error importing the file.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
  };
  
  return (
    <div className="mb-4 p-4 border rounded-md bg-muted/20">
      <h3 className="text-sm font-medium mb-2">System Actions</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportJobs}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export to Excel
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleImportClick}
          className="flex items-center gap-1"
        >
          <Upload className="h-4 w-4" />
          Import Job History
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".csv,.xlsx,.xls"
          onChange={handleFileImport}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        <FileText className="h-3 w-3 inline mr-1" />
        Export jobs to CSV or import historical job data
      </p>
    </div>
  );
};

export default JobsSystemActions;
