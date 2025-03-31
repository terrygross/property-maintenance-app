
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import JobsContainer from "./JobsContainer";
import JobDetailsDialog from "./JobDetailsDialog";
import { Job } from "./jobsListUtils";
import { updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ClipboardList, Download, Upload, FileExcel } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobsList = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState("ongoing");
  const { toast } = useToast();
  const { users } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load jobs from localStorage on component mount
  useEffect(() => {
    try {
      const loadJobs = () => {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          // Format the jobs to match our component's expected structure
          // Only include jobs that have been assigned (not unassigned)
          const formattedJobs = parsedJobs
            .filter((job: any) => job.status !== "unassigned")
            .map((job: any) => {
              // Find the assigned technician
              const assignedTech = job.assignedTo ? 
                users.find((user: any) => user.id === job.assignedTo) : null;
              
              return {
                id: job.id,
                title: job.title,
                location: job.property,
                priority: job.priority || "medium",
                status: job.status,
                assignedTo: assignedTech ? 
                  `${assignedTech.first_name} ${assignedTech.last_name}` : 
                  "Unassigned",
                techId: job.assignedTo,
                techRole: assignedTech?.role || "",
                emailSent: job.emailSent || false,
                dueDate: new Date(new Date(job.reportDate).getTime() + 7 * 24 * 60 * 60 * 1000),
                photos: { 
                  reporter: job.imageUrl,
                  before: job.beforePhoto || "",
                  after: job.afterPhoto || ""
                }
              };
            });
          
          setJobs(formattedJobs);
          console.log("Admin Jobs tab - loaded assigned jobs:", formattedJobs);
        }
      };
      
      loadJobs();
      
      // Setup a listener for localStorage changes
      window.addEventListener('storage', loadJobs);
      
      return () => {
        window.removeEventListener('storage', loadJobs);
      };
    } catch (error) {
      console.error("Error loading assigned jobs:", error);
    }
  }, [users]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };
  
  const handleMarkComplete = (jobId: string) => {
    // Check if the job has an 'after' photo
    const job = jobs.find(j => j.id === jobId);
    
    if (!job?.photos?.after) {
      toast({
        title: "After photo required",
        description: "This job cannot be marked as complete until the technician uploads an 'after' photo.",
        variant: "destructive",
      });
      return;
    }
    
    // Update job status
    const success = updateJobStatus(jobId, "completed");
    
    if (success) {
      // Update local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, status: "completed" } 
            : job
        )
      );
      
      toast({
        title: "Job completed",
        description: "The job has been marked as complete.",
      });
    }
  };

  const handleExportJobs = () => {
    try {
      // Filter to only completed jobs
      const completedJobs = jobs.filter(job => job.status === "completed");
      
      if (completedJobs.length === 0) {
        toast({
          title: "No completed jobs",
          description: "There are no completed jobs to export.",
          variant: "destructive",
        });
        return;
      }
      
      // Format jobs for Excel export
      const exportData = completedJobs.map(job => ({
        ID: job.id,
        Title: job.title,
        Location: job.location,
        Priority: job.priority,
        Status: job.status,
        AssignedTo: job.assignedTo,
        DueDate: job.dueDate.toLocaleDateString(),
        CompletionDate: new Date().toLocaleDateString(), // Approximate completion date
        HasBeforePhoto: job.photos?.before ? "Yes" : "No",
        HasAfterPhoto: job.photos?.after ? "Yes" : "No"
      }));
      
      // Convert to CSV
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(','), // Header row
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            // Escape commas and quotes
            const stringValue = String(value).replace(/"/g, '""');
            return `"${stringValue}"`;
          }).join(',')
        )
      ].join('\n');
      
      // Create blob and download
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
        
        // Parse each row after header
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue; // Skip empty rows
          
          const values = rows[i].split(',').map(value => 
            value.trim().replace(/^"(.*)"$/, '$1')
          );
          
          const rowData: Record<string, string> = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index] || '';
          });
          
          // Create job object from row data
          const job: Job = {
            id: rowData['ID'] || `imported-${Date.now()}-${i}`,
            title: rowData['Title'] || 'Imported Job',
            location: rowData['Location'] || '',
            priority: (rowData['Priority'] || 'medium') as string,
            status: "completed",
            assignedTo: rowData['AssignedTo'] || '',
            dueDate: new Date(rowData['DueDate'] || Date.now()),
            photos: {
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
        
        // Merge imported jobs with existing ones
        setJobs(prevJobs => {
          // Remove any existing jobs with the same IDs
          const filteredJobs = prevJobs.filter(job => 
            !importedJobs.some(importedJob => importedJob.id === job.id)
          );
          
          // Combine filtered existing jobs with imported ones
          const updatedJobs = [...filteredJobs, ...importedJobs];
          
          // Update localStorage
          try {
            const existingData = localStorage.getItem('reporterJobs');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            
            // Update or add imported jobs to localStorage format
            const updatedData = [...parsedData];
            
            importedJobs.forEach(importedJob => {
              const existingIndex = updatedData.findIndex(job => job.id === importedJob.id);
              
              if (existingIndex >= 0) {
                // Update existing job
                updatedData[existingIndex] = {
                  ...updatedData[existingIndex],
                  status: "completed"
                };
              } else {
                // Add new job
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
        
        // Reset file input
        if (event.target) {
          event.target.value = '';
        }
        
        // Switch to completed tab
        setActiveTab("completed");
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

  // Filter jobs based on tab
  const ongoingJobs = jobs.filter(job => job.status !== "completed");
  const completedJobs = jobs.filter(job => job.status === "completed");

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ongoing" className="flex items-center">
            <ClipboardList className="h-4 w-4 mr-2" />
            Ongoing Jobs ({ongoingJobs.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Completed Jobs ({completedJobs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing">
          <JobsContainer 
            jobs={ongoingJobs} 
            onViewDetails={handleViewDetails}
            onMarkComplete={handleMarkComplete}
          />
        </TabsContent>

        <TabsContent value="completed">
          {/* System Actions for completed jobs */}
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
              {/* Hidden file input for import */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".csv,.xlsx,.xls"
                onChange={handleFileImport}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <FileExcel className="h-3 w-3 inline mr-1" />
              Export jobs to CSV or import historical job data
            </p>
          </div>
          
          <JobsContainer 
            jobs={completedJobs} 
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>

      <JobDetailsDialog 
        open={showJobDetails} 
        onOpenChange={setShowJobDetails} 
        job={selectedJob}
        onMarkComplete={handleMarkComplete}
      />
    </>
  );
};

export default JobsList;
