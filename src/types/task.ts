
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

export interface DatabaseTask {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskShare {
  id: string;
  task_id: string;
  shared_with_email: string;
  shared_by_user_id: string;
  created_at: string;
}
