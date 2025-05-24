import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Users, TrendingUp, CheckCircle } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import TransactionManager from "@/components/TransactionManager";
import TaskManagement from "@/components/TaskManagement";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import RoleBasedDashboard from "@/components/RoleBasedDashboard";
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              PA Real Estate Support Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your real estate transactions with our comprehensive portal. 
              Professional tools for transaction coordination, task management, and analytics.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Login / Register
              </Button>
              <div className="text-sm text-gray-600">
                <p>Demo accounts:</p>
                <p>Admin: admin@parealestate.com | Agent: sarah@parealestate.com | Client: john.smith@email.com</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transaction Management</h3>
              <p className="text-gray-600">Comprehensive pipeline management with automated workflows</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">Customized views for admins, agents, and clients</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Reporting</h3>
              <p className="text-gray-600">Detailed insights and automated report generation</p>
            </div>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticate={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-600';
      case 'agent': return 'bg-blue-600';
      case 'client': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">PA Real Estate Portal</h1>
              <RoleBasedNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getRoleColor(user?.role || '')}>
                {user?.role?.toUpperCase()}
              </Badge>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{user?.firstName[0]}{user?.lastName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
              <Button 
                variant="outline"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && <RoleBasedDashboard />}
        {activeTab === "pipeline" && <TransactionManager />}
        {activeTab === "tasks" && <TaskManagement />}
        {activeTab === "analytics" && user?.role === 'admin' && <AnalyticsDashboard />}
      </main>
    </div>
  );
};

export default Index;
