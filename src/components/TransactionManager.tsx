
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TransactionForm from "./TransactionForm";
import TransactionPipeline from "./TransactionPipeline";
import { Transaction } from "@/types/transaction";
import { useToast } from "@/hooks/use-toast";

const TransactionManager = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleCreateTransaction = (transactionData: Partial<Transaction>) => {
    console.log("Creating transaction:", transactionData);
    
    // Here you would typically save to your backend/database
    toast({
      title: "Transaction Created",
      description: `New transaction for ${transactionData.property?.address} has been created successfully.`,
    });
    
    setShowForm(false);
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

      <TransactionPipeline />
    </div>
  );
};

export default TransactionManager;
