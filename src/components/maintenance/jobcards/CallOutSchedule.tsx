
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import CallOutDialog from "./callout/CallOutDialog";
import CallOutList from "./callout/CallOutList";
import { CallOut, mockCallOutData } from "./callout/callOutTypes";

interface CallOutScheduleProps {
  isReadOnly?: boolean;
}

const CallOutSchedule = ({ isReadOnly = false }: CallOutScheduleProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

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
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Schedule Call-Out</Button>
          </DialogTrigger>
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
          <CallOutList 
            callOuts={callOuts}
            isReadOnly={isReadOnly}
            date={date}
            upcomingCallOuts={upcomingCallOuts}
            openScheduleDialog={() => setOpen(true)}
          />
        </div>
      </div>

      <CallOutDialog 
        open={open} 
        setOpen={setOpen} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default CallOutSchedule;
