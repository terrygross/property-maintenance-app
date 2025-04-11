
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import HighPriorityAlert from "@/components/alerts/HighPriorityAlert";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

interface DashboardHeaderProps {
  highPriorityJobs: any[];
  unassignedJobs?: any[]; 
  onAlertClick: () => void;
  onNewTaskClick: () => void;
}

const DashboardHeader = ({ 
  highPriorityJobs, 
  unassignedJobs = [], 
  onAlertClick, 
  onNewTaskClick 
}: DashboardHeaderProps) => {
  const [totalAlertCount, setTotalAlertCount] = useState(0);
  
  // Calculate total alerts dynamically
  useEffect(() => {
    // Calculate from props first
    const highPriorityCount = (highPriorityJobs || []).length;
    
    const highPriorityUnassigned = (unassignedJobs || []).filter(job => 
      job && (job.priority === "high" || job.highPriority === true)
    );
    
    const unassignedCount = highPriorityUnassigned.length;
    const total = highPriorityCount + unassignedCount;
    
    console.log("DashboardHeader - Calculating alert counts:", {
      highPriorityJobsCount: highPriorityCount,
      highPriorityUnassignedCount: unassignedCount,
      total: total
    });
    
    // If we get 0 from props, query the database directly as a backup
    if (total === 0) {
      const checkDatabaseForHighPriorityJobs = async () => {
        try {
          const { data, error } = await reporterJobsTable()
            .select('id, high_priority, priority')
            .or('high_priority.eq.true,priority.eq.high');
            
          if (error) {
            throw error;
          }
          
          if (data && data.length > 0) {
            console.log("DashboardHeader - Found high priority jobs directly from database:", data.length);
            setTotalAlertCount(data.length);
          } else {
            setTotalAlertCount(total);
          }
        } catch (err) {
          console.error("Error checking for high priority jobs:", err);
          setTotalAlertCount(total);
        }
      };
      
      checkDatabaseForHighPriorityJobs();
    } else {
      setTotalAlertCount(total);
    }
  }, [highPriorityJobs, unassignedJobs]);
  
  // Listen for high priority job events
  useEffect(() => {
    const handleHighPriorityJobAdded = (event: any) => {
      console.log("DashboardHeader - High priority job added event received:", event.detail);
      // Increment the alert count when a new high priority job is added
      setTotalAlertCount(prev => prev + 1);
    };
    
    const handleHighPriorityJobsExist = (event: any) => {
      console.log("DashboardHeader - High priority jobs exist event received:", event.detail);
      // Set count based on existing high priority jobs
      if (event.detail && event.detail.count > 0) {
        setTotalAlertCount(event.detail.count);
      }
    };
    
    document.addEventListener('highPriorityJobAdded', handleHighPriorityJobAdded);
    document.addEventListener('highPriorityJobsExist', handleHighPriorityJobsExist);
    
    return () => {
      document.removeEventListener('highPriorityJobAdded', handleHighPriorityJobAdded);
      document.removeEventListener('highPriorityJobsExist', handleHighPriorityJobsExist);
    };
  }, []);
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your maintenance system</p>
        </div>
        {totalAlertCount > 0 && (
          <HighPriorityAlert 
            count={totalAlertCount} 
            onClick={onAlertClick}
          />
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          className="flex items-center gap-2"
          onClick={onNewTaskClick}
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
