
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  emergencySLA: z.coerce.number().min(1).max(24),
  highPrioritySLA: z.coerce.number().min(1).max(96),
  mediumPrioritySLA: z.coerce.number().min(1).max(168),
  lowPrioritySLA: z.coerce.number().min(1).max(336),
  autoEscalate: z.boolean(),
  escalationHours: z.coerce.number().min(1).max(72).optional(),
  emergencyColor: z.string(),
  highPriorityColor: z.string(),
  mediumPriorityColor: z.string(),
  lowPriorityColor: z.string(),
  requirePhotosOnComplete: z.boolean(),
  allowRescheduling: z.boolean(),
  defaultAssignmentMethod: z.string(),
  maxDailyJobsPerTech: z.coerce.number().min(1).max(20),
});

const MaintenanceSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emergencySLA: 4,
      highPrioritySLA: 24,
      mediumPrioritySLA: 48,
      lowPrioritySLA: 72,
      autoEscalate: true,
      escalationHours: 4,
      emergencyColor: "#ff0000",
      highPriorityColor: "#ff9900",
      mediumPriorityColor: "#ffcc00",
      lowPriorityColor: "#00cc66",
      requirePhotosOnComplete: true,
      allowRescheduling: true,
      defaultAssignmentMethod: "round-robin",
      maxDailyJobsPerTech: 10,
    },
  });
  
  const watchAutoEscalate = form.watch("autoEscalate");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Submitting maintenance settings:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your maintenance settings have been saved successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Parameters</CardTitle>
        <CardDescription>
          Configure SLA timeframes, priority settings, and workflow parameters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">SLA Timeframes (Hours)</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="emergencySLA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Response Time</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum hours to respond to emergency issues
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="highPrioritySLA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>High Priority Response Time</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum hours to respond to high priority issues
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mediumPrioritySLA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medium Priority Response Time</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum hours to respond to medium priority issues
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lowPrioritySLA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low Priority Response Time</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum hours to respond to low priority issues
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="autoEscalate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Auto-Escalate Unassigned Jobs
                        </FormLabel>
                        <FormDescription>
                          Automatically increase priority of unassigned jobs
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {watchAutoEscalate && (
                  <FormField
                    control={form.control}
                    name="escalationHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours Before Escalation</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Time before unassigned job is escalated
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium">Priority Color Coding</h3>
                <div className="grid gap-4 pt-2 md:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="emergencyColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input type="color" {...field} className="w-12 h-10" />
                            <Input value={field.value} onChange={field.onChange} className="flex-1" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="highPriorityColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>High Priority</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input type="color" {...field} className="w-12 h-10" />
                            <Input value={field.value} onChange={field.onChange} className="flex-1" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mediumPriorityColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medium Priority</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input type="color" {...field} className="w-12 h-10" />
                            <Input value={field.value} onChange={field.onChange} className="flex-1" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lowPriorityColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Low Priority</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input type="color" {...field} className="w-12 h-10" />
                            <Input value={field.value} onChange={field.onChange} className="flex-1" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium">Workflow Settings</h3>
                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="requirePhotosOnComplete"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Require Photos on Job Completion
                          </FormLabel>
                          <FormDescription>
                            Technicians must upload photos to mark jobs complete
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allowRescheduling"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Allow Technicians to Reschedule Jobs
                          </FormLabel>
                          <FormDescription>
                            Technicians can request date/time changes
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="defaultAssignmentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Job Assignment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assignment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manual">Manual Assignment</SelectItem>
                            <SelectItem value="round-robin">Round Robin</SelectItem>
                            <SelectItem value="load-balanced">Load Balanced</SelectItem>
                            <SelectItem value="skill-based">Skill Based</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How jobs are assigned to technicians by default
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxDailyJobsPerTech"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Daily Jobs Per Technician</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Maximum number of jobs assigned to one technician per day
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSettings;
