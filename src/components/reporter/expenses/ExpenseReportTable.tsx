
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Expense } from "./ExpenseHistory";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/button";
import { FileSpreadsheetIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpenseReportTableProps {
  reportData: Expense[];
  reportType: string;
}

const EXPENSE_TYPES: Record<string, string> = {
  materials: "Materials",
  tools: "Tools & Equipment",
  fuel: "Fuel & Travel",
  services: "External Services",
  other: "Other Expenses"
};

const PAYMENT_METHODS: Record<string, string> = {
  company_card: "Company Card",
  personal: "Personal",
  cash: "Cash",
  invoice: "Invoice"
};

const ExpenseReportTable = ({ reportData, reportType }: ExpenseReportTableProps) => {
  const { properties } = useAppState();
  const { toast } = useToast();
  
  // Function to get property name
  const getPropertyName = (propertyId: string | null) => {
    if (!propertyId) return "General";
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : "Unknown";
  };
  
  // Function to get expense type name
  const getExpenseTypeName = (typeId: string) => {
    return EXPENSE_TYPES[typeId] || typeId;
  };
  
  // Function to get payment method name
  const getPaymentMethodName = (methodId: string) => {
    return PAYMENT_METHODS[methodId] || methodId;
  };
  
  // Sort expenses by date
  const sortedData = [...reportData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Calculate totals
  const totalAmount = sortedData.reduce((sum, expense) => sum + expense.amount, 0);
  
  const handleDownloadExcel = () => {
    toast({
      title: "Excel Download Started",
      description: "Downloading expense data as Excel...",
    });
    
    // In a real app, this would generate and download an Excel file
    setTimeout(() => {
      toast({
        title: "Excel Download Complete",
        description: "Expense data has been downloaded successfully.",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing {sortedData.length} expense records
          </p>
          <p className="font-medium">
            Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
          <FileSpreadsheetIcon className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{format(new Date(expense.date), "MMM d, yyyy")}</TableCell>
                <TableCell>{getExpenseTypeName(expense.type)}</TableCell>
                <TableCell>{getPropertyName(expense.propertyId)}</TableCell>
                <TableCell>{getPaymentMethodName(expense.paymentMethod)}</TableCell>
                <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="font-medium">Total</TableCell>
              <TableCell className="text-right font-medium">${totalAmount.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseReportTable;
