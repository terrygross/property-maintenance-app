
import { useToast } from "@/hooks/use-toast";
import { Job } from "../jobsListUtils";

export const useImportJobs = (onImport: (importedJobs: Job[]) => void) => {
  const { toast } = useToast();

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
        
        onImport(importedJobs);
        
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

  return {
    handleFileImport
  };
};
