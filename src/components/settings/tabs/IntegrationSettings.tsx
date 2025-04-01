
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const emailFormSchema = z.object({
  smtpServer: z.string().min(1, { message: "SMTP server is required" }),
  smtpPort: z.coerce.number().min(1).max(65535),
  smtpUsername: z.string().min(1, { message: "Username is required" }),
  smtpPassword: z.string().min(1, { message: "Password is required" }),
  useTLS: z.boolean(),
  fromEmail: z.string().email({ message: "Valid email address is required" }),
  fromName: z.string().min(1, { message: "From name is required" }),
});

const smsFormSchema = z.object({
  smsProvider: z.string().min(1, { message: "Provider is required" }),
  apiKey: z.string().min(1, { message: "API key is required" }),
  apiSecret: z.string().optional(),
  fromNumber: z.string().min(1, { message: "From number is required" }),
  testMode: z.boolean(),
});

const apiFormSchema = z.object({
  enableExternalAPI: z.boolean(),
  apiKey: z.string().optional(),
  allowedOrigins: z.string().optional(),
  rateLimitPerMinute: z.coerce.number().min(1).max(1000).optional(),
  webhookUrl: z.string().url().optional(),
});

const IntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      smtpServer: "smtp.example.com",
      smtpPort: 587,
      smtpUsername: "notifications@example.com",
      smtpPassword: "password123",
      useTLS: true,
      fromEmail: "maintenance@example.com",
      fromName: "Maintenance System",
    },
  });

  const smsForm = useForm<z.infer<typeof smsFormSchema>>({
    resolver: zodResolver(smsFormSchema),
    defaultValues: {
      smsProvider: "twilio",
      apiKey: "",
      apiSecret: "",
      fromNumber: "+15555555555",
      testMode: true,
    },
  });

  const apiForm = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      enableExternalAPI: false,
      apiKey: "",
      allowedOrigins: "*",
      rateLimitPerMinute: 60,
      webhookUrl: "",
    },
  });

  const watchEnableAPI = apiForm.watch("enableExternalAPI");

  function onEmailSubmit(values: z.infer<typeof emailFormSchema>) {
    setIsSubmitting(true);
    console.log("Submitting email settings:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Email Settings Updated",
        description: "Your email server settings have been saved.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  function onSMSSubmit(values: z.infer<typeof smsFormSchema>) {
    setIsSubmitting(true);
    console.log("Submitting SMS settings:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "SMS Settings Updated",
        description: "Your SMS gateway settings have been saved.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  function onAPISubmit(values: z.infer<typeof apiFormSchema>) {
    setIsSubmitting(true);
    console.log("Submitting API settings:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "API Settings Updated",
        description: "Your API configuration has been saved.",
      });
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Settings</CardTitle>
        <CardDescription>
          Configure email servers, SMS gateways, and API connections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="api">API & Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={emailForm.control}
                    name="smtpServer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Server</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Mail server hostname or IP address
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="smtpPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Port</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Common ports: 25, 465 (SSL), 587 (TLS)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="smtpUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Authentication username for SMTP server
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="smtpPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMTP Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Authentication password for SMTP server
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="useTLS"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Use TLS/SSL
                          </FormLabel>
                          <FormDescription>
                            Enable secure connection to mail server
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
                  <div></div>
                  <FormField
                    control={emailForm.control}
                    name="fromEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Email address notifications will be sent from
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="fromName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Display name for outgoing emails
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Email Settings"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="sms">
            <Form {...smsForm}>
              <form onSubmit={smsForm.handleSubmit(onSMSSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={smsForm.control}
                    name="smsProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMS Provider</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select SMS provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="twilio">Twilio</SelectItem>
                            <SelectItem value="messagebird">MessageBird</SelectItem>
                            <SelectItem value="nexmo">Nexmo/Vonage</SelectItem>
                            <SelectItem value="clicksend">ClickSend</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Service provider for sending SMS messages
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={smsForm.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Authentication key for the SMS provider API
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={smsForm.control}
                    name="apiSecret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Secret (if applicable)</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Secondary authentication secret if required
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={smsForm.control}
                    name="fromNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Phone number SMS messages will be sent from
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={smsForm.control}
                    name="testMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-2">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable Test Mode
                          </FormLabel>
                          <FormDescription>
                            Messages will not be sent to real recipients
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save SMS Settings"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="api">
            <Form {...apiForm}>
              <form onSubmit={apiForm.handleSubmit(onAPISubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={apiForm.control}
                    name="enableExternalAPI"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable External API Access
                          </FormLabel>
                          <FormDescription>
                            Allow external applications to access data via API
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
                  
                  {watchEnableAPI && (
                    <div className="grid gap-4 md:grid-cols-2 pt-2">
                      <FormField
                        control={apiForm.control}
                        name="apiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input {...field} className="flex-1" />
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  onClick={() => {
                                    const generatedKey = Math.random().toString(36).substring(2, 15) + 
                                      Math.random().toString(36).substring(2, 15);
                                    apiForm.setValue("apiKey", generatedKey);
                                  }}
                                >
                                  Generate
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Authentication key for API requests
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={apiForm.control}
                        name="allowedOrigins"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allowed Origins (CORS)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Comma-separated list of allowed domains or * for all
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={apiForm.control}
                        name="rateLimitPerMinute"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate Limit (Requests per Minute)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Maximum API requests allowed per minute
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={apiForm.control}
                        name="webhookUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Webhook URL</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              URL to receive system event notifications
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save API Settings"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettings;
