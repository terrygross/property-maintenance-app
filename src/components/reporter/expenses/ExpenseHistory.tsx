
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Download } from "lucide-react";
import ExpenseViewDialog from "./ExpenseViewDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Expense {
  id: string;
  amount: number;
  type: string;
  propertyId: string | null;
  paymentMethod: string;
  date: string;
  notes: string;
  receiptImage: string | null;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

const EXPENSE_TYPES = [
  { id: "materials", name: "Materials" },
  { id: "tools", name: "Tools & Equipment" },
  { id: "fuel", name: "Fuel & Travel" },
  { id: "services", name: "External Services" },
  { id: "other", name: "Other Expenses" }
];

const STATUS_COLORS = {
  pending: "yellow",
  approved: "green",
  rejected: "destructive"
};

const ExpenseHistory = () => {
  const { properties } = useAppState();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses) as Expense[];
      setExpenses(parsedExpenses);
      setFilteredExpenses(parsedExpenses);
    }
  }, []);
  
  useEffect(() => {
    // Apply filters whenever filter criteria change
    let filtered = [...expenses];
    
    if (searchQuery) {
      filtered = filtered.filter(expense => 
        expense.notes.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedType) {
      filtered = filtered.filter(expense => expense.type === selectedType);
    }
    
    if (selectedStatus) {
      filtered = filtered.filter(expense => expense.status === selectedStatus);
    }
    
    if (selectedProperty) {
      filtered = filtered.filter(expense => expense.propertyId === selectedProperty);
    }
    
    setFilteredExpenses(filtered);
  }, [expenses, searchQuery, selectedType, selectedStatus, selectedProperty]);
  
  const handleViewExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };
  
  const getPropertyName = (propertyId: string | null) => {
    if (!propertyId) return "General";
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : "Unknown Property";
  };
  
  const getExpenseTypeName = (typeId: string) => {
    const type = EXPENSE_TYPES.find(t => t.id === typeId);
    return type ? type.name : typeId;
  };
  
  const getPaymentMethodName = (methodId: string) => {
    const methods: Record<string, string> = {
      company_card: "Company Card",
      personal: "Personal",
      cash: "Cash",
      invoice: "Invoice"
    };
    return methods[methodId] || methodId;
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedStatus("");
    setSelectedProperty("");
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Expense Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {EXPENSE_TYPES.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Properties</SelectItem>
              <SelectItem value="null">General</SelectItem>
              {properties.map(property => (
                <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {(selectedType || selectedStatus || selectedProperty || searchQuery) && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      {filteredExpenses.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{format(new Date(expense.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>{getExpenseTypeName(expense.type)}</TableCell>
                    <TableCell>{getPropertyName(expense.propertyId)}</TableCell>
                    <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
                    <TableCell>{getPaymentMethodName(expense.paymentMethod)}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_COLORS[expense.status] as any}>
                        {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewExpense(expense)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground mb-2">No expenses found</p>
            <p className="text-sm text-muted-foreground">
              {expenses.length > 0
                ? "Try adjusting your filters to see more results"
                : "Start by logging your first expense"}
            </p>
          </CardContent>
        </Card>
      )}
      
      {selectedExpense && (
        <ExpenseViewDialog
          expense={selectedExpense}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          getPropertyName={getPropertyName}
          getExpenseTypeName={getExpenseTypeName}
          getPaymentMethodName={getPaymentMethodName}
        />
      )}
    </div>
  );
};

export default ExpenseHistory;
