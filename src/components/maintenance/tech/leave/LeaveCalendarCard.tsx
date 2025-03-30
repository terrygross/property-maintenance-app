
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

interface LeaveCalendarCardProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const LeaveCalendarCard = ({ date, setDate }: LeaveCalendarCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border p-3"
        />
      </CardContent>
    </Card>
  );
};

export default LeaveCalendarCard;
