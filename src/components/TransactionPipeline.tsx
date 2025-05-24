
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, DollarSign, MapPin, Users, Eye } from "lucide-react";
import TransactionDetails from "./TransactionDetails";
import { Transaction } from "@/types/transaction";

const TransactionPipeline = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
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
    },
    {
      id: "2",
      property: {
        address: "456 Oak Avenue",
        city: "Pittsburgh",
        state: "PA",
        zipCode: "15201",
        county: "Allegheny",
        propertyType: "condo"
      },
      transactionType: "purchase",
      status: "inspection",
      purchasePrice: 325000,
      contractDate: "2024-01-05",
      closingDate: "2024-02-20",
      contacts: [
        {
          id: "buyer-2",
          firstName: "Mike",
          lastName: "Johnson",
          email: "mike.johnson@email.com",
          phone: "555-0105",
          role: "buyer"
        }
      ],
      assignedAgent: "Tom Davis",
      assignedTC: "TC Admin",
      createdAt: "2024-01-05T00:00:00Z",
      updatedAt: "2024-01-05T00:00:00Z"
    }
  ]);

  const stages = ["new", "under_contract", "inspection", "appraisal", "financing", "final_walkthrough", "closing", "closed"];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "new": return "bg-blue-100 text-blue-800";
      case "under_contract": return "bg-yellow-100 text-yellow-800";
      case "inspection": return "bg-orange-100 text-orange-800";
      case "appraisal": return "bg-purple-100 text-purple-800";
      case "financing": return "bg-green-100 text-green-800";
      case "final_walkthrough": return "bg-indigo-100 text-indigo-800";
      case "closing": return "bg-red-100 text-red-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageDisplayName = (stage: string) => {
    return stage.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (selectedTransaction) {
    return (
      <TransactionDetails
        transaction={selectedTransaction}
        onBack={() => setSelectedTransaction(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaction Pipeline</h2>
          <p className="text-muted-foreground">
            Visual overview of all active transactions and their current status
          </p>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {stages.map((stage) => {
          const stageTransactions = transactions.filter(t => t.status === stage);
          const totalValue = stageTransactions.reduce((sum, t) => sum + t.purchasePrice, 0);
          
          return (
            <Card key={stage} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium">{getStageDisplayName(stage)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{stageTransactions.length}</div>
                <p className="text-xs text-muted-foreground">
                  ${(totalValue / 1000000).toFixed(1)}M
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Transaction Cards */}
      <div className="grid gap-6">
        {stages.map((stage) => {
          const stageTransactions = transactions.filter(t => t.status === stage);
          
          if (stageTransactions.length === 0) return null;
          
          return (
            <div key={stage} className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Badge className={getStageColor(stage)}>{getStageDisplayName(stage)}</Badge>
                <span className="text-sm text-muted-foreground">
                  ({stageTransactions.length} transactions)
                </span>
              </h3>
              
              <div className="grid gap-4">
                {stageTransactions.map((transaction) => (
                  <Card key={transaction.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {transaction.property.address}, {transaction.property.city}, {transaction.property.state}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">${transaction.purchasePrice.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span>{transaction.contacts.find(c => c.role === 'buyer')?.firstName} {transaction.contacts.find(c => c.role === 'buyer')?.lastName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {transaction.assignedAgent.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{transaction.assignedAgent}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-purple-600" />
                              <span>{new Date(transaction.closingDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="capitalize">
                            {transaction.transactionType}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
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
