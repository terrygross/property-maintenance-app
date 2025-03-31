
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeletedComplianceLists from "./DeletedComplianceLists";
import EmptyRecycleBin from "./EmptyRecycleBin";
import RecycleBinActions from "./RecycleBinActions";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const RecycleBin = () => {
  const [activeTab, setActiveTab] = useState("compliance");
  const [isPurgeDialogOpen, setIsPurgeDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEmptyRecycleBin = () => {
    setIsPurgeDialogOpen(true);
  };

  const handleConfirmPurge = () => {
    // This action would be implemented in a real application to permanently delete all items
    toast({
      title: "Recycle Bin Emptied",
      description: "All items have been permanently deleted.",
    });
    setIsPurgeDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">Recycle Bin</CardTitle>
          <p className="text-sm text-muted-foreground">
            View and manage deleted items
          </p>
        </div>
        <RecycleBinActions onEmptyBin={handleEmptyRecycleBin} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compliance">Compliance Lists</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="other">Other Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compliance">
            <DeletedComplianceLists />
          </TabsContent>
          
          <TabsContent value="jobs">
            <EmptyRecycleBin 
              title="No Deleted Jobs" 
              description="There are no deleted jobs in the recycle bin."
            />
          </TabsContent>
          
          <TabsContent value="other">
            <EmptyRecycleBin 
              title="No Other Deleted Items" 
              description="There are no other deleted items in the recycle bin."
            />
          </TabsContent>
        </Tabs>

        <AlertDialog open={isPurgeDialogOpen} onOpenChange={setIsPurgeDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Empty Recycle Bin?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all items in the recycle bin. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmPurge}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default RecycleBin;
