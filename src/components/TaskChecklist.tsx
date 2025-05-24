
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Calendar,
  MessageSquare,
  User,
  Filter
} from "lucide-react";
import { Task, TaskStatus, TaskCategory } from "@/types/task";
import { taskTemplates } from "@/data/taskTemplates";
import { format, addDays, isAfter, isBefore } from "date-fns";

interface TaskChecklistProps {
  transactionId: string;
  contractDate: string;
  transactionType: string;
  closingDate: string;
}

const TaskChecklist = ({ transactionId, contractDate, transactionType, closingDate }: TaskChecklistProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | 'all'>('all');
  const [showNotes, setShowNotes] = useState<string | null>(null);

  useEffect(() => {
    // Generate tasks from templates
    const generatedTasks = taskTemplates
      .filter(template => template.transactionTypes.includes(transactionType))
      .map(template => {
        const dueDate = addDays(new Date(contractDate), template.daysFromContract);
        const today = new Date();
        
        let status: TaskStatus = 'pending';
        if (isAfter(today, dueDate)) {
          status = 'overdue';
        }

        return {
          id: `${transactionId}-${template.id}`,
          transactionId,
          templateId: template.id,
          title: template.title,
          description: template.description,
          dueDate: format(dueDate, 'yyyy-MM-dd'),
          completed: false,
          status,
          assignedTo: 'current-user', // Would be assigned based on role
          category: template.category,
          priority: template.priority,
          dependencies: template.dependencies,
          isRequired: template.isRequired,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as Task;
      });

    setTasks(generatedTasks);
  }, [transactionId, contractDate, transactionType]);

  const handleTaskToggle = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const completed = !task.completed;
        return {
          ...task,
          completed,
          status: completed ? 'completed' : 'pending',
          completedAt: completed ? new Date().toISOString() : undefined,
          completedBy: completed ? 'current-user' : undefined,
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    return true;
  });

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: TaskCategory) => {
    const colors = {
      contract: 'bg-blue-100 text-blue-800',
      inspection: 'bg-yellow-100 text-yellow-800',
      financing: 'bg-green-100 text-green-800',
      appraisal: 'bg-purple-100 text-purple-800',
      insurance: 'bg-orange-100 text-orange-800',
      title: 'bg-indigo-100 text-indigo-800',
      closing: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category];
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Transaction Progress
            <span className="text-lg font-normal">
              {completedTasks} of {totalTasks} completed
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(progressPercentage)}% complete
          </p>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All Tasks
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'overdue' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('overdue')}
              >
                Overdue
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`${task.status === 'overdue' ? 'border-red-200 bg-red-50' : ''}`}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="mt-1"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                      {task.isRequired && <span className="text-red-500 ml-1">*</span>}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      <Badge variant={getPriorityColor(task.priority) as any}>
                        {task.priority}
                      </Badge>
                      <Badge className={getCategoryColor(task.category)}>
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>Assigned to: TC</span>
                    </div>
                  </div>
                  
                  {task.completedAt && (
                    <div className="text-sm text-green-600">
                      ✓ Completed on {format(new Date(task.completedAt), 'MMM dd, yyyy')}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowNotes(showNotes === task.id ? null : task.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Notes
                    </Button>
                  </div>
                  
                  {showNotes === task.id && (
                    <div className="mt-4 space-y-2">
                      <Textarea
                        placeholder="Add notes for this task..."
                        value={task.notes || ''}
                        onChange={(e) => {
                          setTasks(prev => prev.map(t => 
                            t.id === task.id ? { ...t, notes: e.target.value } : t
                          ));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskChecklist;
