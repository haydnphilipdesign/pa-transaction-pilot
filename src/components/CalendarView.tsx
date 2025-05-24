
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  Bell,
  Download,
  Settings,
  Users
} from "lucide-react";
import { format, isToday, isTomorrow, addDays, startOfWeek, endOfWeek } from "date-fns";
import { Task } from "@/types/task";
import { Transaction } from "@/types/transaction";

interface CalendarViewProps {
  tasks: Task[];
  transactions: Transaction[];
  onTaskClick?: (task: Task) => void;
  onTransactionClick?: (transaction: Transaction) => void;
}

const CalendarView = ({ tasks, transactions, onTaskClick, onTransactionClick }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('month');
  const [showSettings, setShowSettings] = useState(false);

  // Get tasks for selected date
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      format(new Date(task.dueDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  // Get upcoming tasks (next 7 days)
  const getUpcomingTasks = () => {
    const today = new Date();
    const nextWeek = addDays(today, 7);
    
    return tasks
      .filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= today && taskDate <= nextWeek && !task.completed;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  // Get overdue tasks
  const getOverdueTasks = () => {
    const today = new Date();
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate < today && !task.completed;
    });
  };

  // Check if date has tasks
  const hasTasksOnDate = (date: Date) => {
    return getTasksForDate(date).length > 0;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (task: Task) => {
    if (task.completed) return <Bell className="h-4 w-4 text-green-600" />;
    if (task.status === 'overdue') return <AlertTriangle className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-blue-600" />;
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];
  const upcomingTasks = getUpcomingTasks();
  const overdueTasks = getOverdueTasks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar & Deadlines</h2>
          <p className="text-muted-foreground">
            View and manage all transaction deadlines and tasks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export to Calendar
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue Tasks</p>
                <p className="text-2xl font-bold text-red-600">{overdueTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Due This Week</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingTasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Transactions</p>
                <p className="text-2xl font-bold text-green-600">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={view} onValueChange={(value) => setView(value as 'month' | 'week' | 'agenda')}>
        <TabsList>
          <TabsTrigger value="month">Month View</TabsTrigger>
          <TabsTrigger value="agenda">Agenda View</TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                  Click on a date to view tasks. Dates with tasks are highlighted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasTasks: (date) => hasTasksOnDate(date)
                  }}
                  modifiersClassNames={{
                    hasTasks: "bg-blue-100 text-blue-900 font-semibold"
                  }}
                />
              </CardContent>
            </Card>

            {/* Selected Date Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select a Date'}
                </CardTitle>
                <CardDescription>
                  {selectedDateTasks.length} tasks on this date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDateTasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No tasks scheduled for this date.</p>
                  ) : (
                    selectedDateTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => onTaskClick?.(task)}
                      >
                        {getStatusIcon(task)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {task.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agenda" className="space-y-6">
          {/* Overdue Tasks */}
          {overdueTasks.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Overdue Tasks ({overdueTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {overdueTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-white border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)} variant="secondary">
                          {task.priority}
                        </Badge>
                        <Button size="sm" onClick={() => onTaskClick?.(task)}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks (Next 7 Days)</CardTitle>
              <CardDescription>
                {upcomingTasks.length} tasks due in the next week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming tasks in the next 7 days.</p>
                ) : (
                  upcomingTasks.map((task) => {
                    const taskDate = new Date(task.dueDate);
                    const isTaskToday = isToday(taskDate);
                    const isTaskTomorrow = isTomorrow(taskDate);
                    
                    return (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          isTaskToday ? 'border-blue-200 bg-blue-50' : 
                          isTaskTomorrow ? 'border-yellow-200 bg-yellow-50' : 
                          'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(task)}
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {isTaskToday ? 'Today' : 
                                 isTaskTomorrow ? 'Tomorrow' : 
                                 format(taskDate, 'MMM dd, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)} variant="secondary">
                            {task.priority}
                          </Badge>
                          <Badge variant="outline">{task.category}</Badge>
                          <Button size="sm" variant="outline" onClick={() => onTaskClick?.(task)}>
                            View
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarView;
