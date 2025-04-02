
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CameraIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { v4 as uuidv4 } from "uuid";

const EXPENSE_TYPES = [
  { id: "materials", name: "Materials" },
  { id: "tools", name: "Tools & Equipment" },
  { id: "fuel", name: "Fuel & Travel" },
  { id: "services", name: "External Services" },
  { id: "other", name: "Other Expenses" }
];

const PAYMENT_METHODS = [
  { id: "company_card", name: "Company Card" },
  { id: "personal", name: "Personal (Reimbursement)" },
  { id: "cash", name: "Cash" },
  { id: "invoice", name: "Invoice (To Be Paid)" }
];

const ExpenseEntryForm = () => {
  const { toast } = useToast();
  const { properties } = useAppState();
  
  const [amount, setAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload to storage
      // For now, create a local URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!amount || !expenseType || !date || !paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Create expense record
    const expenseRecord = {
      id: uuidv4(),
      amount: parseFloat(amount),
      type: expenseType,
      propertyId: propertyId || null,
      paymentMethod,
      date: date?.toISOString(),
      notes,
      receiptImage,
      createdAt: new Date().toISOString(),
      status: "pending" // pending, approved, rejected
    };
    
    // Save to localStorage (in a real app, send to backend)
    const savedExpenses = localStorage.getItem("expenses") || "[]";
    const expenses = JSON.parse(savedExpenses);
    expenses.push(expenseRecord);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    
    // Reset form
    setAmount("");
    setExpenseType("");
    setPropertyId("");
    setPaymentMethod("");
    setDate(new Date());
    setNotes("");
    setReceiptImage(null);
    setIsSubmitting(false);
    
    toast({
      title: "Expense Logged",
      description: "Your expense has been saved successfully.",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="pl-7"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expense-type">Expense Type *</Label>
          <Select value={expenseType} onValueChange={setExpenseType} required>
            <SelectTrigger id="expense-type">
              <SelectValue placeholder="Select expense type" />
            </SelectTrigger>
            <SelectContent>
              {EXPENSE_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="property">Related Property (Optional)</Label>
          <Select value={propertyId} onValueChange={setPropertyId}>
            <SelectTrigger id="property">
              <SelectValue placeholder="Select property (if applicable)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Not property-specific</SelectItem>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="payment-method">Payment Method *</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
            <SelectTrigger id="payment-method">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="receipt">Receipt Image (Optional)</Label>
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById("receipt-upload")?.click()}
            >
              <CameraIcon className="h-4 w-4 mr-2" />
              {receiptImage ? "Change Image" : "Attach Receipt"}
            </Button>
            <input
              id="receipt-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          {receiptImage && (
            <div className="mt-2 relative border rounded-md overflow-hidden">
              <img 
                src={receiptImage} 
                alt="Receipt" 
                className="w-full h-auto max-h-48 object-contain"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setReceiptImage(null)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Enter any additional details about this expense"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Log Expense"}
      </Button>
    </form>
  );
};

export default ExpenseEntryForm;
