import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type TaskStatus = "pending" | "confirmed" | "completed";
export type AlertLevel = "none" | "green" | "amber" | "red";

export interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: Date;
  recurrence: "none" | "monthly" | "quarterly" | "biannual" | "annual";
  assignedTo?: string;
  status: TaskStatus;
  alertLevel: AlertLevel;
  documentUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ComplianceContextType {
  tasks: ComplianceTask[];
  addTask: (task: Omit<ComplianceTask, "id" | "alertLevel" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<ComplianceTask>) => void;
  deleteTask: (id: string) => void;
  getTasksByMonth: (year: number, month: number) => ComplianceTask[];
  confirmTask: (id: string) => void;
  completeTask: (id: string) => void;
  getUpcomingTasks: () => ComplianceTask[];
  getAlertCount: () => { green: number; amber: number; red: number };
  updateTaskCategories: (categories: string[]) => void;
}

const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

// Mock data for demonstration
const initialTasks: ComplianceTask[] = [
  {
    id: uuidv4(),
    title: "Fire Alarm Testing",
    description: "Annual fire alarm system inspection and certification",
    category: "Safety",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)), // Due in 2 weeks
    recurrence: "annual",
    assignedTo: "John Smith",
    status: "pending",
    alertLevel: "amber",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Building Insurance Renewal",
    description: "Renew building insurance policy",
    category: "Legal",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Due in 1 week
    recurrence: "annual",
    status: "pending",
    alertLevel: "red",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    title: "HVAC Filter Replacement",
    description: "Replace all HVAC filters across the building",
    category: "Maintenance",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 21)), // Due in 3 weeks
    recurrence: "quarterly",
    status: "pending",
    alertLevel: "green",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Elevator Inspection",
    description: "Mandatory elevator safety inspection",
    category: "Safety",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 45)), // Due in over a month
    recurrence: "annual",
    status: "pending",
    alertLevel: "none",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const ComplianceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ComplianceTask[]>(initialTasks);

  // Update alert levels based on due dates
  useEffect(() => {
    const updateAlertLevels = () => {
      const updatedTasks = tasks.map(task => {
        if (task.status !== "pending") return task;
        
        const daysUntilDue = Math.ceil((task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        
        let alertLevel: AlertLevel = "none";
        if (daysUntilDue <= 7) {
          alertLevel = "red";
        } else if (daysUntilDue <= 14) {
          alertLevel = "amber";
        } else if (daysUntilDue <= 21) {
          alertLevel = "green";
        }
        
        return { ...task, alertLevel };
      });
      
      setTasks(updatedTasks);
    };
    
    updateAlertLevels();
    // Check alert levels daily
    const intervalId = setInterval(updateAlertLevels, 86400000);
    return () => clearInterval(intervalId);
  }, [tasks]);

  const addTask = (task: Omit<ComplianceTask, "id" | "alertLevel" | "createdAt" | "updatedAt">) => {
    const now = new Date();
    const daysUntilDue = Math.ceil((task.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    let alertLevel: AlertLevel = "none";
    if (daysUntilDue <= 7) {
      alertLevel = "red";
    } else if (daysUntilDue <= 14) {
      alertLevel = "amber";
    } else if (daysUntilDue <= 21) {
      alertLevel = "green";
    }
    
    const newTask: ComplianceTask = {
      ...task,
      id: uuidv4(),
      alertLevel,
      createdAt: now,
      updatedAt: now
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<ComplianceTask>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date() } 
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTasksByMonth = (year: number, month: number) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.getFullYear() === year && taskDate.getMonth() === month;
    });
  };

  const confirmTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, status: "confirmed", alertLevel: "none", updatedAt: new Date() } 
          : task
      )
    );
  };

  const completeTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, status: "completed", alertLevel: "none", updatedAt: new Date() } 
          : task
      )
    );
  };

  const getUpcomingTasks = () => {
    return tasks
      .filter(task => task.status === "pending")
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  };

  const getAlertCount = () => {
    return tasks.reduce(
      (counts, task) => {
        if (task.alertLevel === "green") counts.green += 1;
        if (task.alertLevel === "amber") counts.amber += 1;
        if (task.alertLevel === "red") counts.red += 1;
        return counts;
      },
      { green: 0, amber: 0, red: 0 }
    );
  };

  const updateTaskCategories = (categories: string[]) => {
    console.log("Task categories updated:", categories);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksByMonth,
    confirmTask,
    completeTask,
    getUpcomingTasks,
    getAlertCount,
    updateTaskCategories
  };

  return (
    <ComplianceContext.Provider value={value}>
      {children}
    </ComplianceContext.Provider>
  );
};

export const useCompliance = () => {
  const context = useContext(ComplianceContext);
  if (context === undefined) {
    throw new Error("useCompliance must be used within a ComplianceProvider");
  }
  return context;
};
