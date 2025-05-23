
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, FileText, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const RoleBasedDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Admin/TC Dashboard - can see everything
  if (user.role === 'admin') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
            <p className="text-muted-foreground">Complete overview of all transactions and team performance</p>
          </div>
          <Badge variant="default" className="bg-purple-600">Admin Access</Badge>
        </div>

        {/* Admin Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">All Active Transactions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Across all agents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">12 overdue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 new this month</p>
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

        {/* All Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>All Active Transactions</CardTitle>
            <CardDescription>System-wide transaction overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, address: "123 Main St, Philadelphia, PA", agent: "Sarah Wilson", client: "John Smith", stage: "Document Review", progress: 75 },
                { id: 2, address: "456 Oak Ave, Pittsburgh, PA", agent: "Tom Davis", client: "Mike Johnson", stage: "Awaiting Signature", progress: 60 },
                { id: 3, address: "789 Pine Rd, Allentown, PA", agent: "Emily Chen", client: "Lisa Brown", stage: "Compliance Check", progress: 90 },
              ].map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{transaction.address}</h4>
                    <p className="text-sm text-gray-600">Agent: {transaction.agent} | Client: {transaction.client}</p>
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
    );
  }

  // Agent Dashboard - can see only their transactions
  if (user.role === 'agent') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Agent Dashboard</h2>
            <p className="text-muted-foreground">Your transactions and performance metrics</p>
          </div>
          <Badge variant="default" className="bg-blue-600">Agent Access</Badge>
        </div>

        {/* Agent Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Active Transactions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 due today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closings This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">$890K total value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Efficiency score</p>
            </CardContent>
          </Card>
        </div>

        {/* Agent's Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>My Transactions</CardTitle>
            <CardDescription>Your active real estate transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, address: "123 Main St, Philadelphia, PA", client: "John Smith", stage: "Document Review", progress: 75 },
                { id: 2, address: "789 Pine Rd, Allentown, PA", client: "Lisa Brown", stage: "Compliance Check", progress: 90 },
              ].map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{transaction.address}</h4>
                    <p className="text-sm text-gray-600">Client: {transaction.client}</p>
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
    );
  }

  // Client Dashboard - can see only their transaction
  if (user.role === 'client') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Real Estate Transaction</h2>
            <p className="text-muted-foreground">Track the progress of your property transaction</p>
          </div>
          <Badge variant="default" className="bg-green-600">Client Access</Badge>
        </div>

        {/* Client Transaction Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Progress</CardTitle>
            <CardDescription>Your property at 123 Main St, Philadelphia, PA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">123 Main St, Philadelphia, PA</h3>
                  <p className="text-gray-600">Agent: Sarah Wilson</p>
                  <p className="text-gray-600">Purchase Price: $450,000</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Document Review</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Next Steps</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Home inspection completed</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span>Awaiting final documents</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Important Dates</h4>
                  <div className="text-sm space-y-1">
                    <p>Estimated Closing: January 15, 2024</p>
                    <p>Final walkthrough: January 12, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Communication */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Communication from your agent and transaction coordinator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium">Document Review Update</p>
                <p className="text-sm text-gray-600">All documents have been reviewed. Waiting for final lender approval.</p>
                <p className="text-xs text-gray-500 mt-1">Yesterday at 2:30 PM</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium">Inspection Complete</p>
                <p className="text-sm text-gray-600">Home inspection completed successfully with no major issues found.</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago at 10:15 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default RoleBasedDashboard;
