
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

interface TaskFiltersProps {
  filterStatus: string;
  filterPriority: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
}

export const TaskFilters = ({ 
  filterStatus, 
  filterPriority, 
  onStatusChange, 
  onPriorityChange 
}: TaskFiltersProps) => {
  const clearFilters = () => {
    onStatusChange("all");
    onPriorityChange("all");
  };

  const hasActiveFilters = filterStatus !== "all" || filterPriority !== "all";

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
      <div className="flex items-center space-x-2">
        <FilterIcon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Status:</span>
        <Select value={filterStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Priority:</span>
        <Select value={filterPriority} onValueChange={onPriorityChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
};
