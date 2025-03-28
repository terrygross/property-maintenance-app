
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

// Mock leave data
const mockLeaveData = [
  { id: "1", userId: "1", startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "approved" },
  { id: "2", userId: "2", startDate: new Date(2023, 11, 27), endDate: new Date(2023, 11, 31), status: "pending" },
];

const LeaveCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
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
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Leave Calendar</h3>
        <Dialog open={open} onOpenChange={setOpen}>
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
            {mockLeaveData.map(leave => {
              const tech = MOCK_USERS.find(user => user.id === leave.userId);
              return (
                <div key={leave.id} className="flex justify-between items-center mb-3 pb-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{tech?.first_name} {tech?.last_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.startDate.toLocaleDateString()} - {leave.endDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      leave.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {leave.status === "approved" ? "Approved" : "Pending"}
                    </span>
                    {leave.status === "pending" && (
                      <Button size="sm" variant="outline" onClick={() => {
                        toast({
                          title: "Leave approved",
                          description: "The leave request has been approved.",
                        });
                      }}>
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
