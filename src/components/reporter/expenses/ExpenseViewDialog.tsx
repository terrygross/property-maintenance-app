
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Download, X } from "lucide-react";
import { Expense } from "./ExpenseHistory";

interface ExpenseViewDialogProps {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
  getPropertyName: (propertyId: string | null) => string;
  getExpenseTypeName: (typeId: string) => string;
  getPaymentMethodName: (methodId: string) => string;
}

const STATUS_COLORS = {
  pending: "yellow",
  approved: "green",
  rejected: "destructive"
};

const ExpenseViewDialog = ({
  expense,
  isOpen,
  onClose,
  getPropertyName,
  getExpenseTypeName,
  getPaymentMethodName
}: ExpenseViewDialogProps) => {
  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Expense Details</span>
            <Badge variant={STATUS_COLORS[expense.status] as any}>
              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Submitted on {format(new Date(expense.createdAt), "PPP")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
            <p className="text-lg font-semibold">${expense.amount.toFixed(2)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
            <p>{format(new Date(expense.date), "MMMM d, yyyy")}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Expense Type</h3>
            <p>{getExpenseTypeName(expense.type)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
            <p>{getPaymentMethodName(expense.paymentMethod)}</p>
          </div>
          
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground">Property</h3>
            <p>{getPropertyName(expense.propertyId)}</p>
          </div>
          
          {expense.notes && (
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="whitespace-pre-line">{expense.notes}</p>
            </div>
          )}
        </div>
        
        {expense.receiptImage && (
          <div className="mt-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Receipt</h3>
            <div className="border rounded-md overflow-hidden">
              <img 
                src={expense.receiptImage} 
                alt="Receipt" 
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
            <Button variant="outline" className="mt-2 w-full" onClick={() => window.open(expense.receiptImage!, '_blank')}>
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        )}
        
        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseViewDialog;
