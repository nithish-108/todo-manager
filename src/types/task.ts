
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  sharedWith: string[];
  createdAt: string;
}
