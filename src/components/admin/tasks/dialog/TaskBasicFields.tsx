
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property } from "@/types/property";

interface TaskBasicFieldsProps {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  jobLocation: string;
  setJobLocation: (value: string) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  activeProperties: Property[];
}

const TaskBasicFields = ({
  jobTitle,
  setJobTitle,
  jobLocation,
  setJobLocation,
  jobDescription,
  setJobDescription,
  priority,
  setPriority,
  activeProperties,
}: TaskBasicFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Title</Label>
        <Input
          id="title"
          placeholder="Task title"
          className="col-span-3"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">Location</Label>
        <Select value={jobLocation} onValueChange={setJobLocation}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {activeProperties.length > 0 ? (
              activeProperties.map((property) => (
                <SelectItem key={property.id} value={property.name}>
                  {property.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="No active properties" disabled>
                No active properties available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Textarea
          id="description"
          placeholder="Task description"
          className="col-span-3"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="priority" className="text-right">Priority</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default TaskBasicFields;
