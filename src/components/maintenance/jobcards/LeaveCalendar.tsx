
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { MOCK_USERS } from "@/data/mockUsers";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckIcon, X, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LeaveRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason?: string;
}

interface LeaveCalendarProps {
  leaveRequests?: LeaveRequest[];
  onLeaveAction?: (leaveId: string, action: "approve" | "deny" | "reschedule", newDates?: { startDate: Date, endDate: Date }) => void;
  isAdmin?: boolean;
}

const LeaveCalendar = ({ 
  leaveRequests = [], 
  onLeaveAction, 
  isAdmin = false 
}: LeaveCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openRequest, setOpenRequest] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [newStartDate, setNewStartDate] = useState<Date | undefined>(undefined);
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  const form = useForm();

  // Filter maintenance technicians
  const maintenanceTechs = MOCK_USERS.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  const handleSubmit = (data: any) => {
    console.log("Leave request submitted:", data);
    toast({
      title: "Leave request submitted",
      description: "Your leave request has been submitted for approval.",
    });
    setOpenRequest(false);
  };

  const handleApprove = (leaveId: string) => {
    onLeaveAction?.(leaveId, "approve");
    toast({
      title: "Leave approved",
      description: "The leave request has been approved.",
    });
  };

  const handleDeny = (leaveId: string) => {
    onLeaveAction?.(leaveId, "deny");
    toast({
      title: "Leave denied",
      description: "The leave request has been denied.",
    });
  };

  const openRescheduleDialog = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setNewStartDate(leave.startDate);
    setNewEndDate(leave.endDate);
    setOpenReschedule(true);
  };

  const handleReschedule = () => {
    if (selectedLeave && newStartDate && newEndDate) {
      onLeaveAction?.(selectedLeave.id, "reschedule", { startDate: newStartDate, endDate: newEndDate });
      toast({
        title: "Leave rescheduled",
        description: "The leave request has been rescheduled.",
      });
      setOpenReschedule(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "approved": return "bg-green-100 text-green-800";
      case "denied": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Leave Calendar</h3>
        <Dialog open={openRequest} onOpenChange={setOpenRequest}>
          <DialogTrigger asChild>
            <Button>Request Leave</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="technician"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technician</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select technician" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {maintenanceTechs.map(tech => (
                            <SelectItem key={tech.id} value={tech.id}>
                              {tech.first_name} {tech.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Reason for leave" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border p-3"
          />
        </div>
        <div className="flex-1">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-4">Leave Requests</h4>
            {leaveRequests.length > 0 ? (
              leaveRequests.map(leave => {
                const tech = MOCK_USERS.find(user => user.id === leave.userId);
                return (
                  <div key={leave.id} className="flex justify-between items-center mb-3 pb-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{tech?.first_name} {tech?.last_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {leave.startDate.toLocaleDateString()} - {leave.endDate.toLocaleDateString()}
                      </p>
                      {leave.reason && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Reason:</span> {leave.reason}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                      <Badge className={getStatusColor(leave.status)}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </Badge>
                      
                      {isAdmin && leave.status === "pending" && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => handleApprove(leave.id)}>
                            <CheckIcon className="h-3 w-3" />
                            <span>Approve</span>
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => handleDeny(leave.id)}>
                            <X className="h-3 w-3" />
                            <span>Deny</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center gap-1"
                            onClick={() => openRescheduleDialog(leave)}
                          >
                            <Clock className="h-3 w-3" />
                            <span>Reschedule</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No leave requests found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={openReschedule} onOpenChange={setOpenReschedule}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Leave</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <FormLabel>New Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newStartDate ? format(newStartDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newStartDate}
                    onSelect={setNewStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <FormLabel>New End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newEndDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newEndDate ? format(newEndDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newEndDate}
                    onSelect={setNewEndDate}
                    initialFocus
                    disabled={newStartDate ? (date) => date < newStartDate : undefined}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenReschedule(false)}>
              Cancel
            </Button>
            <Button onClick={handleReschedule} disabled={!newStartDate || !newEndDate}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveCalendar;
