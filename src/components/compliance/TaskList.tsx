
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Check, 
  Clock, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  X 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useCompliance, ComplianceTask, TaskStatus } from "@/context/ComplianceContext";
import TaskDetails from "./TaskDetails";

interface TaskListProps {
  onAddTask: () => void;
}

const TaskList = ({ onAddTask }: TaskListProps) => {
  const { tasks, confirmTask, completeTask } = useCompliance();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState<ComplianceTask | null>(null);
  
  // Get unique categories for filter
  const categories = [...new Set(tasks.map(task => task.category))];
  
  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const getAlertBadge = (alertLevel: string) => {
    switch (alertLevel) {
      case "red":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "amber":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "green":
        return <Badge className="bg-green-500">Upcoming</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Confirmed</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-green-500 border-green-500">Completed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Compliance Tasks</CardTitle>
          <Button onClick={onAddTask} size="sm" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TaskStatus | "all")}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No tasks found. Try adjusting your filters or add a new task.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        <div 
                          className="cursor-pointer hover:text-primary transition-colors"
                          onClick={() => setSelectedTask(task)}
                        >
                          {task.title}
                        </div>
                      </TableCell>
                      <TableCell>{task.category}</TableCell>
                      <TableCell>{task.dueDate.toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>{getAlertBadge(task.alertLevel)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {task.status === "pending" && (
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => confirmTask(task.id)}
                              title="Confirm Task"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          {task.status === "confirmed" && (
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => completeTask(task.id)}
                              title="Mark as Completed"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setSelectedTask(task)}
                            title="View Details"
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {selectedTask && (
        <TaskDetails 
          task={selectedTask} 
          open={!!selectedTask} 
          onOpenChange={(open) => !open && setSelectedTask(null)} 
        />
      )}
    </>
  );
};

export default TaskList;
