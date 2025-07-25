
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, FilterIcon, UsersIcon, CalendarIcon } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { Task } from "@/types/task";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const { tasks, isLoading, updateTask, deleteTask } = useTasks();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleTaskEdit = (task: Task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSave = (taskData: any) => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const handleStatusChange = (taskId: number, status: string) => {
    updateTask({ 
      id: taskId, 
      status: status as 'todo' | 'in-progress' | 'completed' 
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesSearch = searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TodoFlow
            </CardTitle>
            <CardDescription>
              Collaborative task management made simple
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Sign In to Get Started
            </Button>
            <div className="text-center text-sm text-gray-500">
              Sign in to manage your tasks and collaborate with others
            </div>
          </CardContent>
        </Card>
        
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TodoFlow
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Welcome, {user.email}
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowTaskForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Task
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{tasks.filter(t => t.status === 'completed').length} Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>{tasks.filter(t => t.status === 'in-progress').length} In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>{tasks.filter(t => t.status === 'todo').length} Todo</span>
              </div>
            </div>
          </div>

          <TaskFilters
            filterStatus={filterStatus}
            filterPriority={filterPriority}
            onStatusChange={setFilterStatus}
            onPriorityChange={setFilterPriority}
          />
        </div>

        {/* Task Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="my">My Tasks</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="today">Due Today</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tasks...</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => handleTaskEdit(task)}
                    onStatusChange={(status) => handleStatusChange(task.id, status)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.filter(task => task.sharedWith.length === 0).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => handleTaskEdit(task)}
                  onStatusChange={(status) => handleStatusChange(task.id, status)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.filter(task => task.sharedWith.length > 0).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => handleTaskEdit(task)}
                  onStatusChange={(status) => handleStatusChange(task.id, status)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="today" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.filter(task => {
                const today = new Date().toISOString().split('T')[0];
                return task.dueDate === today;
              }).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => handleTaskEdit(task)}
                  onStatusChange={(status) => handleStatusChange(task.id, status)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredTasks.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No tasks found</div>
            <div className="text-gray-500 text-sm">
              {searchQuery ? "Try adjusting your search or filters" : "Create your first task to get started"}
            </div>
          </div>
        )}
      </main>

      <TaskForm
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setSelectedTask(null);
        }}
        onSave={handleTaskSave}
        task={selectedTask}
      />
    </div>
  );
};

export default Index;
