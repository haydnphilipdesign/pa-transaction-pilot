
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, AlertTriangle, CheckCircle, User, FileText } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  transactionId: string;
  transactionAddress: string;
  category: "document" | "communication" | "compliance" | "scheduling";
}

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review Purchase Agreement",
      description: "Review and verify all terms in the purchase agreement for accuracy",
      assignee: "Sarah Wilson",
      dueDate: "2024-01-12",
      priority: "high",
      status: "pending",
      transactionId: "1",
      transactionAddress: "123 Main St, Philadelphia, PA",
      category: "document"
    },
    {
      id: "2",
      title: "Schedule Home Inspection",
      description: "Coordinate with inspector and client for home inspection appointment",
      assignee: "Tom Davis",
      dueDate: "2024-01-14",
      priority: "high",
      status: "in-progress",
      transactionId: "2",
      transactionAddress: "456 Oak Avenue, Pittsburgh, PA",
      category: "scheduling"
    },
    {
      id: "3",
      title: "Follow up with Lender",
      description: "Check status of loan approval and request updated timeline",
      assignee: "Emily Chen",
      dueDate: "2024-01-13",
      priority: "medium",
      status: "pending",
      transactionId: "3",
      transactionAddress: "789 Pine Road, Allentown, PA",
      category: "communication"
    },
    {
      id: "4",
      title: "Upload Title Documents",
      description: "Scan and upload all title-related documents to transaction folder",
      assignee: "Michael Lee",
      dueDate: "2024-01-15",
      priority: "medium",
      status: "completed",
      transactionId: "4",
      transactionAddress: "321 Elm Street, Erie, PA",
      category: "document"
    },
    {
      id: "5",
      title: "Compliance Check - Disclosure Forms",
      description: "Verify all required disclosure forms are completed and signed",
      assignee: "Jennifer Kim",
      dueDate: "2024-01-11",
      priority: "high",
      status: "pending",
      transactionId: "1",
      transactionAddress: "123 Main St, Philadelphia, PA",
      category: "compliance"
    }
  ]);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "document": return <FileText className="h-4 w-4" />;
      case "communication": return <User className="h-4 w-4" />;
      case "compliance": return <CheckCircle className="h-4 w-4" />;
      case "scheduling": return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filterTasks = (status?: string) => {
    if (!status) return tasks;
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Management</h2>
          <p className="text-muted-foreground">
            Manage and track all transaction-related tasks and deadlines
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Create Task
        </Button>
      </div>

      {/* Task Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterTasks("pending").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterTasks("in-progress").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterTasks("completed").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Task List with Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <p className="text-sm font-medium text-blue-600">{task.transactionAddress}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(task.priority)}>
                          {task.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(task.category)}
                          <span className="capitalize">{task.category}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className={getDaysUntilDue(task.dueDate) < 0 ? "text-red-600 font-medium" : ""}>
                          Due {task.dueDate}
                        </span>
                        {getDaysUntilDue(task.dueDate) < 0 && (
                          <Badge variant="destructive" className="text-xs">
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterTasks("pending").map((task) => (
            <Card key={task.id} className="transition-all duration-200 hover:shadow-md">
              {/* Same card content structure */}
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <p className="text-sm font-medium text-blue-600">{task.transactionAddress}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(task.priority)}>
                          {task.priority} priority
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(task.category)}
                          <span className="capitalize">{task.category}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {filterTasks("in-progress").map((task) => (
            <Card key={task.id} className="transition-all duration-200 hover:shadow-md">
              {/* Same card content structure */}
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <p className="text-sm font-medium text-blue-600">{task.transactionAddress}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(task.priority)}>
                          {task.priority} priority
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(task.category)}
                          <span className="capitalize">{task.category}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterTasks("completed").map((task) => (
            <Card key={task.id} className="transition-all duration-200 hover:shadow-md">
              {/* Same card content structure */}
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium line-through text-muted-foreground">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <p className="text-sm font-medium text-blue-600">{task.transactionAddress}</p>
                      </div>
                      
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(task.category)}
                          <span className="capitalize">{task.category}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManagement;
