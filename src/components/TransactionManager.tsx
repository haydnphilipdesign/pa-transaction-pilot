
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Bell, Settings } from "lucide-react";
import TransactionForm from "./TransactionForm";
import TransactionPipeline from "./TransactionPipeline";
import CalendarView from "./CalendarView";
import NotificationSystem from "./NotificationSystem";
import GoogleCalendarSync from "./GoogleCalendarSync";
import { Transaction } from "@/types/transaction";
import { Task } from "@/types/task";
import { taskTemplates } from "@/data/taskTemplates";
import { useToast } from "@/hooks/use-toast";
import { addDays, format } from "date-fns";

const TransactionManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("pipeline");
  const { toast } = useToast();

  // Sample data - in real app this would come from backend
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      property: {
        address: "123 Main St",
        city: "Philadelphia",
        state: "PA",
        zipCode: "19101",
        county: "Philadelphia",
        propertyType: "single_family",
        squareFootage: 2000,
        yearBuilt: 1985
      },
      transactionType: "purchase",
      status: "under_contract",
      purchasePrice: 450000,
      contractDate: "2024-01-01",
      closingDate: "2024-02-15",
      contacts: [
        {
          id: "buyer-1",
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@email.com",
          phone: "555-0103",
          role: "buyer"
        },
        {
          id: "seller-1",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@email.com",
          phone: "555-0104",
          role: "seller"
        }
      ],
      assignedAgent: "Sarah Wilson",
      assignedTC: "TC Admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]);

  // Generate sample tasks from templates
  const generateTasksForTransactions = () => {
    const allTasks: Task[] = [];
    
    transactions.forEach(transaction => {
      const applicableTemplates = taskTemplates.filter(template => 
        template.transactionTypes.includes(transaction.transactionType)
      );
      
      applicableTemplates.forEach(template => {
        const dueDate = addDays(new Date(transaction.contractDate), template.daysFromContract);
        const today = new Date();
        
        let status: Task['status'] = 'pending';
        if (dueDate < today) {
          status = 'overdue';
        }

        allTasks.push({
          id: `${transaction.id}-${template.id}`,
          transactionId: transaction.id,
          templateId: template.id,
          title: template.title,
          description: template.description,
          dueDate: format(dueDate, 'yyyy-MM-dd'),
          completed: Math.random() > 0.7, // Random completion for demo
          status,
          assignedTo: transaction.assignedTC,
          category: template.category,
          priority: template.priority,
          dependencies: template.dependencies,
          isRequired: template.isRequired,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      });
    });

    return allTasks;
  };

  const [tasks] = useState<Task[]>(generateTasksForTransactions());

  const handleCreateTransaction = (transactionData: Partial<Transaction>) => {
    console.log("Creating transaction:", transactionData);
    
    toast({
      title: "Transaction Created",
      description: `New transaction for ${transactionData.property?.address} has been created successfully.`,
    });
    
    setShowForm(false);
  };

  const handleTaskClick = (task: Task) => {
    const transaction = transactions.find(t => t.id === task.transactionId);
    if (transaction) {
      setActiveTab("pipeline");
      toast({
        title: "Task Selected",
        description: `Viewing ${task.title} for ${transaction.property.address}`,
      });
    }
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setActiveTab("pipeline");
    toast({
      title: "Transaction Selected",
      description: `Viewing details for ${transaction.property.address}`,
    });
  };

  if (showForm) {
    return (
      <TransactionForm
        onSubmit={handleCreateTransaction}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaction Management</h2>
          <p className="text-muted-foreground">
            Manage all real estate transactions from contract to close
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Transaction
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pipeline" className="flex items-center space-x-2">
            <span>Pipeline</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Calendar Sync</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <TransactionPipeline />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView
            tasks={tasks}
            transactions={transactions}
            onTaskClick={handleTaskClick}
            onTransactionClick={handleTransactionClick}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSystem tasks={tasks} />
        </TabsContent>

        <TabsContent value="settings">
          <GoogleCalendarSync tasks={tasks} transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionManager;
