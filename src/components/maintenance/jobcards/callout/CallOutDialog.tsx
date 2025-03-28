
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_USERS } from "@/data/mockUsers";
import { useForm } from "react-hook-form";

interface CallOutDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const CallOutDialog = ({ open, setOpen, onSubmit }: CallOutDialogProps) => {
  const form = useForm();

  // Filter maintenance technicians
  const maintenanceTechs = MOCK_USERS.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
  );
};

export default CallOutDialog;
