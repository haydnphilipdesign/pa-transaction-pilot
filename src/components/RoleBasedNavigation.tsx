
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface RoleBasedNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const RoleBasedNavigation = ({ activeTab, setActiveTab }: RoleBasedNavigationProps) => {
  const { user } = useAuth();

  if (!user) return null;

  // Admin/TC can see everything
  if (user.role === 'admin') {
    return (
      <nav className="hidden md:flex space-x-6">
        <Button 
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </Button>
        <Button 
          variant={activeTab === "pipeline" ? "default" : "ghost"}
          onClick={() => setActiveTab("pipeline")}
        >
          All Transactions
        </Button>
        <Button 
          variant={activeTab === "tasks" ? "default" : "ghost"}
          onClick={() => setActiveTab("tasks")}
        >
          Team Tasks
        </Button>
        <Button 
          variant={activeTab === "analytics" ? "default" : "ghost"}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </Button>
      </nav>
    );
  }

  // Agent can see their transactions and tasks
  if (user.role === 'agent') {
    return (
      <nav className="hidden md:flex space-x-6">
        <Button 
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </Button>
        <Button 
          variant={activeTab === "pipeline" ? "default" : "ghost"}
          onClick={() => setActiveTab("pipeline")}
        >
          My Transactions
        </Button>
        <Button 
          variant={activeTab === "tasks" ? "default" : "ghost"}
          onClick={() => setActiveTab("tasks")}
        >
          My Tasks
        </Button>
      </nav>
    );
  }

  // Client can only see their transaction
  if (user.role === 'client') {
    return (
      <nav className="hidden md:flex space-x-6">
        <Button 
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          onClick={() => setActiveTab("dashboard")}
        >
          My Transaction
        </Button>
      </nav>
    );
  }

  return null;
};

export default RoleBasedNavigation;
