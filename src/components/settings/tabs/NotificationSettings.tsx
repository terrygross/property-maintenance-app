
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  notifyNewJob: z.boolean(),
  notifyJobAssigned: z.boolean(),
  notifyJobUpdated: z.boolean(),
  notifyJobCompleted: z.boolean(),
  notifyReporterOnAssignment: z.boolean(),
  notifyReporterOnCompletion: z.boolean(),
  escalationThresholdHours: z.coerce.number().min(1).max(48),
  escalationRecipients: z.string().min(1, { 
    message: "At least one recipient email is required" 
  }),
  reminderFrequency: z.string(),
  reminderHours: z.coerce.number().min(1).max(72),
  notifySystemErrors: z.boolean(),
  dailyDigest: z.boolean(),
  digestTime: z.string(),
  notificationChannels: z.array(z.string()).min(1, { 
    message: "Select at least one notification channel" 
  }),
});

const notificationChannels = [
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
  { id: "app", label: "In-App" },
  { id: "push", label: "Push Notification" },
];

const NotificationSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notifyNewJob: true,
      notifyJobAssigned: true,
      notifyJobUpdated: true,
      notifyJobCompleted: true,
      notifyReporterOnAssignment: true,
      notifyReporterOnCompletion: true,
      escalationThresholdHours: 4,
      escalationRecipients: "manager@example.com,supervisor@example.com",
      reminderFrequency: "daily",
      reminderHours: 24,
      notifySystemErrors: true,
      dailyDigest: true,
      digestTime: "08:00",
      notificationChannels: ["email", "app"],
    },
  });
  
  const watchDailyDigest = form.watch("dailyDigest");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Submitting notification settings:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your notification settings have been saved successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Rules</CardTitle>
        <CardDescription>
          Configure system alerts, automated notifications, and reminders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              <FormField
                control={form.control}
                name="notificationChannels"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormDescription>
                        Select which channels to use for system notifications
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {notificationChannels.map((channel) => (
                        <FormField
                          key={channel.id}
                          control={form.control}
                          name="notificationChannels"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={channel.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(channel.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, channel.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== channel.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {channel.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <h3 className="text-lg font-medium">Job Notifications</h3>
                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="notifyNewJob"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            New Job Reported
                          </FormLabel>
                          <FormDescription>
                            Notify managers when a new job is reported
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
                    name="notifyJobAssigned"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Job Assigned
                          </FormLabel>
                          <FormDescription>
                            Notify technicians when jobs are assigned
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
                    name="notifyJobUpdated"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Job Status Updates
                          </FormLabel>
                          <FormDescription>
                            Notify when job status changes
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
                    name="notifyJobCompleted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Job Completed
                          </FormLabel>
                          <FormDescription>
                            Notify managers when jobs are completed
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
                    name="notifyReporterOnAssignment"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Notify Reporter (Assignment)
                          </FormLabel>
                          <FormDescription>
                            Notify reporter when job is assigned
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
                    name="notifyReporterOnCompletion"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Notify Reporter (Completion)
                          </FormLabel>
                          <FormDescription>
                            Notify reporter when job is completed
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
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium">Escalations & Reminders</h3>
                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="escalationThresholdHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escalation Threshold (Hours)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Hours before unresolved issues are escalated
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="escalationRecipients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escalation Recipients</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Comma-separated list of email addresses
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reminderFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reminder Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How often to send reminders for pending tasks
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reminderHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Reminder Interval (Hours)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Hours between reminder notifications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="notifySystemErrors"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            System Error Alerts
                          </FormLabel>
                          <FormDescription>
                            Send alerts for system errors and failures
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
                    name="dailyDigest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Daily Report Digest
                          </FormLabel>
                          <FormDescription>
                            Send daily summary of maintenance activity
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
                  
                  {watchDailyDigest && (
                    <FormField
                      control={form.control}
                      name="digestTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Digest Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            Time of day to send the daily digest
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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

export default NotificationSettings;
