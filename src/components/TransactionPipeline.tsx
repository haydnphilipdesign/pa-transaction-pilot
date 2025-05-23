
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react";

interface Transaction {
  id: string;
  address: string;
  price: string;
  client: string;
  agent: string;
  stage: string;
  progress: number;
  daysInStage: number;
  closingDate: string;
  priority: "high" | "medium" | "low";
}

const TransactionPipeline = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      address: "123 Main St, Philadelphia, PA",
      price: "$450,000",
      client: "John & Jane Smith",
      agent: "Sarah Wilson",
      stage: "New",
      progress: 15,
      daysInStage: 2,
      closingDate: "2024-01-15",
      priority: "high"
    },
    {
      id: "2",
      address: "456 Oak Avenue, Pittsburgh, PA",
      price: "$325,000",
      client: "Mike Johnson",
      agent: "Tom Davis",
      stage: "Document Review",
      progress: 45,
      daysInStage: 5,
      closingDate: "2024-01-20",
      priority: "medium"
    },
    {
      id: "3",
      address: "789 Pine Road, Allentown, PA",
      price: "$275,000",
      client: "Lisa Brown",
      agent: "Emily Chen",
      stage: "Awaiting Signature",
      progress: 70,
      daysInStage: 3,
      closingDate: "2024-01-25",
      priority: "high"
    },
    {
      id: "4",
      address: "321 Elm Street, Erie, PA",
      price: "$195,000",
      client: "Robert Taylor",
      agent: "Michael Lee",
      stage: "Compliance Check",
      progress: 85,
      daysInStage: 1,
      closingDate: "2024-01-30",
      priority: "medium"
    },
    {
      id: "5",
      address: "654 Maple Drive, Reading, PA",
      price: "$380,000",
      client: "David & Maria Garcia",
      agent: "Jennifer Kim",
      stage: "Closed",
      progress: 100,
      daysInStage: 0,
      closingDate: "2024-01-10",
      priority: "low"
    }
  ]);

  const stages = ["New", "Document Review", "Awaiting Signature", "Compliance Check", "Closed"];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Document Review": return "bg-yellow-100 text-yellow-800";
      case "Awaiting Signature": return "bg-orange-100 text-orange-800";
      case "Compliance Check": return "bg-purple-100 text-purple-800";
      case "Closed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaction Pipeline</h2>
          <p className="text-muted-foreground">
            Visual overview of all active transactions and their current status
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add Transaction
        </Button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {stages.map((stage) => {
          const stageTransactions = transactions.filter(t => t.stage === stage);
          const totalValue = stageTransactions.reduce((sum, t) => 
            sum + parseInt(t.price.replace(/[$,]/g, '')), 0
          );
          
          return (
            <Card key={stage} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{stage}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stageTransactions.length}</div>
                <p className="text-xs text-muted-foreground">
                  ${(totalValue / 1000000).toFixed(1)}M total
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Transaction Cards */}
      <div className="grid gap-6">
        {stages.map((stage) => {
          const stageTransactions = transactions.filter(t => t.stage === stage);
          
          if (stageTransactions.length === 0) return null;
          
          return (
            <div key={stage} className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Badge className={getStageColor(stage)}>{stage}</Badge>
                <span className="text-sm text-muted-foreground">
                  ({stageTransactions.length} transactions)
                </span>
              </h3>
              
              <div className="grid gap-4">
                {stageTransactions.map((transaction) => (
                  <Card key={transaction.id} className={`border-l-4 ${getPriorityColor(transaction.priority)}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {transaction.address}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">{transaction.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span>{transaction.client}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {transaction.agent.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{transaction.agent}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-purple-600" />
                              <span>{transaction.closingDate}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={transaction.priority === "high" ? "destructive" : "secondary"}>
                          {transaction.priority} priority
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{transaction.progress}%</span>
                        </div>
                        <Progress value={transaction.progress} className="h-2" />
                        {transaction.daysInStage > 0 && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{transaction.daysInStage} days in current stage</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionPipeline;
