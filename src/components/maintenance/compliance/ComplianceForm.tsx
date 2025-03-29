
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ComplianceList, ComplianceFormMode } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface ComplianceFormProps {
  mode: ComplianceFormMode;
  initialData: ComplianceList | null;
  onSubmit: (data: Omit<ComplianceList, "id" | "createdAt" | "updatedAt" | "version">) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["active", "archived"]),
  fileUrl: z.string().optional()
});

const ComplianceForm = ({ mode, initialData, onSubmit, onCancel }: ComplianceFormProps) => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const isMobile = useIsMobile();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      status: initialData.status,
      fileUrl: initialData.fileUrl,
    } : {
      title: "",
      description: "",
      status: "active",
      fileUrl: "",
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileSelected(file);
      // In a real implementation, you would upload the file and get a URL
      // form.setValue("fileUrl", uploadedFileUrl);
    }
  };
  
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      title: data.title,
      description: data.description,
      status: data.status,
      fileUrl: data.fileUrl || "#"
    });
  };

  return (
    <Sheet open={true} onOpenChange={onCancel}>
      <SheetContent side={isMobile ? "bottom" : "right"} className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{mode === "create" ? "Create New Compliance List" : "Edit Compliance List"}</SheetTitle>
          <SheetDescription>
            {mode === "create" 
              ? "Upload a compliance document and provide details." 
              : "Update the compliance list details."}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Monthly Safety Inspection" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a brief description of this compliance list" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>Compliance Document</FormLabel>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, Word, Excel or CSV (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                    />
                  </label>
                </div>
                {fileSelected && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: {fileSelected.name}
                  </p>
                )}
              </div>
              
              <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {mode === "create" ? "Create List" : "Update List"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ComplianceForm;
