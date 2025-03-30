
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "assigned":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  status: string;
  assignedTo: string;
  techRole: string;
  emailSent: boolean;
  dueDate: Date;
  photos: {
    reporter: string;
    before: string;
    after: string;
  };
}
