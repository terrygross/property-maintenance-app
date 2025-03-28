
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_USERS } from "@/data/mockUsers";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Mock call-out schedule data
const mockCallOutData = [
  { id: "1", userId: "1", date: new Date(2023, 11, 20) },
  { id: "2", userId: "3", date: new Date(2023, 11, 21) },
  { id: "3", userId: "2", date: new Date(2023, 11, 22) },
  { id: "4", userId: "5", date: new Date(2023, 11, 23) },
];

interface CallOutScheduleProps {
  isReadOnly?: boolean;
}

const CallOutSchedule = ({ isReadOnly = false }: CallOutScheduleProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm();

  // Filter maintenance technicians
  const maintenanceTechs = MOCK_USERS.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  const handleSubmit = (data: any) => {
    console.log("Call-out schedule added:", data);
    toast({
      title: "Call-out schedule updated",
      description: "The call-out schedule has been updated successfully.",
    });
    setOpen(false);
  };

  // Get all call-outs for the selected date
  const getCallOutsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    return mockCallOutData.filter(callout => 
      callout.date.toDateString() === selectedDate.toDateString()
    );
  };

  const callOuts = getCallOutsForDate(date);

  // In read-only mode, filter call-outs for current user (for demo, we'll use id "1")
  const currentUserId = "1"; // In a real app, this would come from authentication
  const userCallOuts = isReadOnly 
    ? mockCallOutData.filter(callout => callout.userId === currentUserId)
    : callOuts;

  // Get upcoming call-outs for the current user
  const upcomingCallOuts = isReadOnly
    ? userCallOuts.filter(callout => callout.date >= new Date())
    : [];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{isReadOnly ? "My Call-Out Schedule" : "Call-Out Schedule"}</h3>
        {!isReadOnly && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Schedule Call-Out</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule Call-Out</DialogTitle>
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
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-md border"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Schedule</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
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
          {isReadOnly ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  My Upcoming Call-Out Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingCallOuts.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingCallOuts.map(callout => (
                      <div key={callout.id} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{callout.date.toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">On-call duty</p>
                        </div>
                        <Badge className="bg-blue-500">Scheduled</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming call-outs scheduled for you</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Call-Out Assignments for {date?.toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {callOuts.length > 0 ? (
                  <div className="space-y-3">
                    {callOuts.map(callout => {
                      const tech = MOCK_USERS.find(user => user.id === callout.userId);
                      return (
                        <div key={callout.id} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">{tech?.first_name} {tech?.last_name}</p>
                            <p className="text-sm text-muted-foreground">{tech?.title}</p>
                          </div>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No call-outs scheduled for this date</p>
                    <Button 
                      className="mt-4" 
                      variant="outline" 
                      onClick={() => setOpen(true)}
                    >
                      Schedule Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallOutSchedule;
