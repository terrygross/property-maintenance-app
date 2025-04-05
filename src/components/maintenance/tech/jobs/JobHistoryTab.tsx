
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Cloud, Calendar } from "lucide-react";
import { Job } from "./JobCardTypes";
import JobsList from "./JobsList";
import { useTechJobs } from "./TechJobsContext";
import { getPriorityColor } from "./JobUtils";
import { exportJobsToFile } from "./utils/exportUtils";
import CloudStorageDialog from "./CloudStorageDialog";

interface JobHistoryTabProps {
  completedJobs: Job[];
}

const JobHistoryTab: React.FC<JobHistoryTabProps> = ({ completedJobs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCloudDialog, setShowCloudDialog] = useState(false);
  const [dateFilter, setDateFilter] = useState<string>("");
  
  const { 
    handleViewDetails, 
    handleViewReporterImage
  } = useTechJobs();
  
  // Filter out high priority unaccepted jobs that should remain in current jobs
  const filteredCompletedJobs = completedJobs.filter(job => {
    // Exclude high priority jobs that haven't been accepted yet
    if (job.priority === "high" && job.status === "completed" && job.accepted === false) {
      return false;
    }
    return true;
  });
  
  // Further filter jobs based on search query and date
  const filteredJobs = filteredCompletedJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDate = !dateFilter || 
      job.dueDate.toISOString().slice(0, 10) === dateFilter;
    
    return matchesSearch && matchesDate;
  });
  
  const handleExportJobs = () => {
    exportJobsToFile(filteredCompletedJobs);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job History ({filteredCompletedJobs.length})</CardTitle>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full sm:w-auto"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleExportJobs}
            >
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowCloudDialog(true)}
            >
              <Cloud className="h-4 w-4" /> Cloud Backup
            </Button>
          </div>
          
          {filteredJobs.length > 0 ? (
            <JobsList 
              jobs={filteredJobs}
              onViewDetails={handleViewDetails}
              onViewReporterImage={handleViewReporterImage}
              onAcceptJob={() => {}}
              onUpdateStatus={() => {}}
              getPriorityColor={getPriorityColor}
            />
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">No matching jobs found</h3>
              <p className="text-muted-foreground">
                {completedJobs.length > 0 
                  ? "Try adjusting your search or date filter" 
                  : "Complete some jobs to build your history"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <CloudStorageDialog 
        open={showCloudDialog} 
        onOpenChange={setShowCloudDialog}
        jobs={filteredCompletedJobs}
      />
    </div>
  );
};

export default JobHistoryTab;
