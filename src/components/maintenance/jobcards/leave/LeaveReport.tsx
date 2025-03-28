
import React, { useMemo } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, subMonths } from "date-fns";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download } from "lucide-react";
import { MOCK_USERS } from "@/data/mockUsers";

interface LeaveReportProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  leaveRequests: {
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    status: string;
    reason?: string;
  }[];
}

interface LeaveTotal {
  userId: string;
  userName: string;
  totalDaysApproved: number;
  totalDaysPending: number;
  totalDaysDenied: number;
}

const LeaveReport = ({ open, setOpen, leaveRequests }: LeaveReportProps) => {
  const oneMonthAgo = useMemo(() => subMonths(new Date(), 1), []);
  
  const leaveTotals = useMemo(() => {
    // Create a map to store employee leave totals
    const employeeTotals: Record<string, LeaveTotal> = {};
    
    // Filter leave requests from last month onwards
    const recentLeaves = leaveRequests.filter(
      leave => new Date(leave.startDate) >= oneMonthAgo
    );
    
    // Calculate leave totals by employee
    recentLeaves.forEach(leave => {
      if (!employeeTotals[leave.userId]) {
        const user = MOCK_USERS.find(user => user.id === leave.userId);
        employeeTotals[leave.userId] = {
          userId: leave.userId,
          userName: user ? `${user.first_name} ${user.last_name}` : `User ${leave.userId}`,
          totalDaysApproved: 0,
          totalDaysPending: 0,
          totalDaysDenied: 0
        };
      }
      
      // Calculate number of days (including weekends for simplicity)
      const diffTime = Math.abs(new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start date
      
      // Add days to the appropriate total
      if (leave.status === "approved") {
        employeeTotals[leave.userId].totalDaysApproved += diffDays;
      } else if (leave.status === "pending") {
        employeeTotals[leave.userId].totalDaysPending += diffDays;
      } else if (leave.status === "denied") {
        employeeTotals[leave.userId].totalDaysDenied += diffDays;
      }
    });
    
    return Object.values(employeeTotals);
  }, [leaveRequests, oneMonthAgo]);
  
  const handleExportCsv = () => {
    // Create CSV content
    const headers = ["Employee", "Approved Leave Days", "Pending Leave Days", "Denied Leave Days", "Total"];
    const rows = leaveTotals.map(employee => [
      employee.userName,
      employee.totalDaysApproved.toString(),
      employee.totalDaysPending.toString(),
      employee.totalDaysDenied.toString(),
      (employee.totalDaysApproved + employee.totalDaysPending + employee.totalDaysDenied).toString()
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leave_report_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Leave Status Report</DialogTitle>
          <DialogDescription>
            Leave totals by employee for the past month
            (since {format(oneMonthAgo, "MMMM d, yyyy")})
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Approved</TableHead>
                <TableHead className="text-right">Pending</TableHead>
                <TableHead className="text-right">Denied</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveTotals.length > 0 ? (
                leaveTotals.map((employee) => (
                  <TableRow key={employee.userId}>
                    <TableCell className="font-medium">{employee.userName}</TableCell>
                    <TableCell className="text-right">{employee.totalDaysApproved}</TableCell>
                    <TableCell className="text-right">{employee.totalDaysPending}</TableCell>
                    <TableCell className="text-right">{employee.totalDaysDenied}</TableCell>
                    <TableCell className="text-right font-medium">
                      {employee.totalDaysApproved + employee.totalDaysPending + employee.totalDaysDenied}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No leave data for the past month
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={handleExportCsv} className="gap-2">
            <Download size={16} />
            Export CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveReport;
