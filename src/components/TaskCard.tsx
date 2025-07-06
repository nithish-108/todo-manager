import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon, UsersIcon, EditIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onStatusChange: (status: string) => void;
}

export const TaskCard = ({ task, onEdit, onStatusChange }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-yellow-500";
      case "todo": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed";

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-200 hover:-translate-y-1",
      isOverdue && "border-red-200 bg-red-50/30"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className={cn("w-3 h-3 rounded-full", getStatusColor(task.status))}></div>
            <h3 className="font-semibold text-sm leading-none">{task.title}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0">
            <EditIcon className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Priority and Due Date */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>

          {/* Shared Users */}
          {task.sharedWith.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <UsersIcon className="w-3 h-3 mr-1" />
                Shared with {task.sharedWith.length} people
              </div>
              <div className="flex -space-x-1">
                {task.sharedWith.slice(0, 3).map((email, index) => (
                  <Avatar key={index} className="w-6 h-6 border-2 border-white">
                    <AvatarFallback className="text-xs">
                      {email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.sharedWith.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">
                    +{task.sharedWith.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant={task.status === "todo" ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange("todo")}
              className="flex-1 text-xs"
            >
              Todo
            </Button>
            <Button
              variant={task.status === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange("in-progress")}
              className="flex-1 text-xs"
            >
              In Progress
            </Button>
            <Button
              variant={task.status === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange("completed")}
              className="flex-1 text-xs"
            >
              Done
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
