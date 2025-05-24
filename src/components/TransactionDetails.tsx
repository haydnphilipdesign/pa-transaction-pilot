
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  FileText, 
  CheckSquare,
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import TaskChecklist from "./TaskChecklist";
import { Transaction } from "@/types/transaction";
import { format } from "date-fns";

interface TransactionDetailsProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetails = ({ transaction, onBack }: TransactionDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'under_contract': return 'bg-yellow-100 text-yellow-800';
      case 'inspection': return 'bg-orange-100 text-orange-800';
      case 'financing': return 'bg-purple-100 text-purple-800';
      case 'closing': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pipeline
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{transaction.property.address}</h1>
          <p className="text-muted-foreground">
            {transaction.property.city}, {transaction.property.state} {transaction.property.zipCode}
          </p>
        </div>
        <Badge className={getStatusColor(transaction.status)}>
          {transaction.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Key Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Purchase Price</p>
                <p className="text-2xl font-bold">${transaction.purchasePrice.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Contract Date</p>
                <p className="text-lg font-semibold">
                  {format(new Date(transaction.contractDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Closing Date</p>
                <p className="text-lg font-semibold">
                  {format(new Date(transaction.closingDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Transaction Type</p>
                <p className="text-lg font-semibold capitalize">{transaction.transactionType}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks" className="flex items-center space-x-2">
            <CheckSquare className="h-4 w-4" />
            <span>Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Notes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <TaskChecklist
            transactionId={transaction.id}
            contractDate={transaction.contractDate}
            transactionType={transaction.transactionType}
            closingDate={transaction.closingDate}
          />
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                All transaction-related documents and files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Document management coming in next phase...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>
                All parties involved in this transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transaction.contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Avatar>
                      <AvatarFallback>
                        {contact.firstName[0]}{contact.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{contact.firstName} {contact.lastName}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{contact.role.replace('_', ' ')}</p>
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        {contact.email && <span>{contact.email}</span>}
                        {contact.phone && <span>{contact.phone}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Notes</CardTitle>
              <CardDescription>
                Internal notes and communication log
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Notes and communication system coming in next phase...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionDetails;
