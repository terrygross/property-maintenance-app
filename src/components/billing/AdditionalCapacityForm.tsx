
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

interface AdditionalCapacityFormProps {
  onCapacityUpdate: (techCount: number, stationCount: number) => void;
}

const AdditionalCapacityForm = ({ onCapacityUpdate }: AdditionalCapacityFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const addCapacityForm = useForm({
    defaultValues: {
      additionalTechs: 0,
      additionalStations: 0,
    },
  });

  const onAddCapacity = (data: { additionalTechs: number; additionalStations: number }) => {
    // Calculate total additional cost
    const additionalCost = (data.additionalTechs + data.additionalStations) * 20;
    
    toast({
      title: "Capacity Updated",
      description: `Your request for additional capacity has been received. Additional monthly cost: £${additionalCost}.`,
    });

    onCapacityUpdate(data.additionalTechs, data.additionalStations);

    // In a real app, this would make an API call to update the subscription
    console.log("Additional capacity requested:", data);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium">Need additional capacity?</h3>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            {isOpen ? "Close" : "Add Capacity"}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">
        <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
          <div className="text-sm text-blue-800">
            <span className="font-semibold">Pricing:</span> Extra Maintenance Technician: £20/month • Extra Reporting Station: £20/month
          </div>
        </div>
        
        <Form {...addCapacityForm}>
          <form onSubmit={addCapacityForm.handleSubmit(onAddCapacity)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={addCapacityForm.control}
                name="additionalTechs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Technicians</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="10" 
                        placeholder="0" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      £20 per additional technician per month
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addCapacityForm.control}
                name="additionalStations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Reporting Stations</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="10" 
                        placeholder="0" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      £20 per additional station per month
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Capacity
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AdditionalCapacityForm;
