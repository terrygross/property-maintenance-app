
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  minPasswordLength: z.coerce.number().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(128),
  requireSpecialChars: z.boolean(),
  passwordExpiryDays: z.coerce.number().min(0).max(365),
  sessionTimeoutMins: z.coerce.number().min(1).max(1440),
  enableMFA: z.boolean(),
  mfaType: z.string(),
  lockoutAttempts: z.coerce.number().min(1).max(10),
  enableIPRestriction: z.boolean(),
});

const UserAccessSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minPasswordLength: 10,
      requireSpecialChars: true,
      passwordExpiryDays: 90,
      sessionTimeoutMins: 30,
      enableMFA: false,
      mfaType: "email",
      lockoutAttempts: 5,
      enableIPRestriction: false,
    },
  });

  const watchMFA = form.watch("enableMFA");
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Submitting user access settings:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your user access settings have been saved successfully.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Access Controls</CardTitle>
        <CardDescription>
          Configure password policies, session settings, and authentication options.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Password Policy</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="minPasswordLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Password Length</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Minimum number of characters required
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requireSpecialChars"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Require Special Characters
                        </FormLabel>
                        <FormDescription>
                          Passwords must contain symbols (e.g., @#$%)
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
                  name="passwordExpiryDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Expiration (Days)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Days before password change is required (0 = never)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lockoutAttempts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Failed Login Attempts Before Lockout</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Number of failed attempts before account is temporarily locked
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium">Session & Authentication</h3>
                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="sessionTimeoutMins"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Timeout (Minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Minutes of inactivity before automatic logout
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enableMFA"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable Multi-Factor Authentication
                          </FormLabel>
                          <FormDescription>
                            Require additional verification step at login
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
                  {watchMFA && (
                    <FormField
                      control={form.control}
                      name="mfaType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MFA Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select MFA type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="app">Authenticator App</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Method used for second factor authentication
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="enableIPRestriction"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable IP Restrictions
                          </FormLabel>
                          <FormDescription>
                            Limit access to specific IP addresses or ranges
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

export default UserAccessSettings;
