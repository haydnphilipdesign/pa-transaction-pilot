
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, FileText, Users, TrendingUp, CheckCircle } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import TransactionPipeline from "@/components/TransactionPipeline";
import TaskManagement from "@/components/TaskManagement";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transaction Management</h3>
              <p className="text-gray-600">Comprehensive pipeline management with automated workflows</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Automation</h3>
              <p className="text-gray-600">Automated task creation and Office365 integration</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Reporting</h3>
              <p className="text-gray-600">Detailed insights and automated report generation</p>
            </Card>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticate={() => setIsAuthenticated(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">PA Real Estate Portal</h1>
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
                  Pipeline
                </Button>
                <Button 
                  variant={activeTab === "tasks" ? "default" : "ghost"}
                  onClick={() => setActiveTab("tasks")}
                >
                  Tasks
                </Button>
                <Button 
                  variant={activeTab === "analytics" ? "default" : "ghost"}
                  onClick={() => setActiveTab("analytics")}
                >
                  Analytics
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Closings This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">$2.4M total value</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your most recent transaction activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, address: "123 Main St, Philadelphia, PA", stage: "Document Review", progress: 75 },
                    { id: 2, address: "456 Oak Ave, Pittsburgh, PA", stage: "Awaiting Signature", progress: 60 },
                    { id: 3, address: "789 Pine Rd, Allentown, PA", stage: "Compliance Check", progress: 90 },
                  ].map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{transaction.address}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{transaction.stage}</Badge>
                          <div className="flex-1 max-w-xs">
                            <Progress value={transaction.progress} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-600">{transaction.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "pipeline" && <TransactionPipeline />}
        {activeTab === "tasks" && <TaskManagement />}
        {activeTab === "analytics" && <AnalyticsDashboard />}
      </main>
    </div>
  );
};

export default Index;
