
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Clock, CheckCircle } from "lucide-react";

const AnalyticsDashboard = () => {
  // Sample data for charts
  const monthlyTransactions = [
    { month: 'Jan', transactions: 12, value: 3200000 },
    { month: 'Feb', transactions: 15, value: 4100000 },
    { month: 'Mar', transactions: 18, value: 4800000 },
    { month: 'Apr', transactions: 14, value: 3900000 },
    { month: 'May', transactions: 20, value: 5200000 },
    { month: 'Jun', transactions: 22, value: 5800000 },
  ];

  const taskCompletion = [
    { week: 'Week 1', completed: 85, pending: 15 },
    { week: 'Week 2', completed: 92, pending: 8 },
    { week: 'Week 3', completed: 78, pending: 22 },
    { week: 'Week 4', completed: 95, pending: 5 },
  ];

  const transactionStages = [
    { name: 'New', value: 8, color: '#3B82F6' },
    { name: 'Document Review', value: 12, color: '#EAB308' },
    { name: 'Awaiting Signature', value: 6, color: '#F97316' },
    { name: 'Compliance Check', value: 4, color: '#A855F7' },
    { name: 'Closed', value: 15, color: '#10B981' },
  ];

  const teamPerformance = [
    { name: 'Sarah Wilson', transactions: 18, efficiency: 94 },
    { name: 'Tom Davis', transactions: 15, efficiency: 89 },
    { name: 'Emily Chen', transactions: 12, efficiency: 92 },
    { name: 'Michael Lee', transactions: 14, efficiency: 87 },
    { name: 'Jennifer Kim', transactions: 16, efficiency: 95 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into transaction performance and team productivity
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Schedule Report</Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5.8M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Days to Close</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 days</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>-3 days from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+4% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <div className="flex items-center text-xs text-blue-600">
              <span>22 closing this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Transaction Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Transaction Volume</CardTitle>
            <CardDescription>Transactions and total value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTransactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'transactions' ? value : `$${(Number(value) / 1000000).toFixed(1)}M`,
                    name === 'transactions' ? 'Transactions' : 'Total Value'
                  ]}
                />
                <Bar dataKey="transactions" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Completion Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Task Completion</CardTitle>
            <CardDescription>Percentage of tasks completed on time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={taskCompletion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}%`, 'Completion Rate']} />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Stages Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Stages Distribution</CardTitle>
            <CardDescription>Current distribution of transactions by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionStages}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {transactionStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual team member metrics and efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{member.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{member.transactions} transactions</Badge>
                      <span className="text-sm text-muted-foreground">{member.efficiency}%</span>
                    </div>
                  </div>
                  <Progress value={member.efficiency} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered insights based on current performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Positive Trend</span>
              </div>
              <p className="text-sm text-green-700">
                Transaction completion time has improved by 10% this quarter. Consider documenting best practices.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Action Needed</span>
              </div>
              <p className="text-sm text-yellow-700">
                Document review stage shows bottlenecks. Consider additional training or resource allocation.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Opportunity</span>
              </div>
              <p className="text-sm text-blue-700">
                High-performing team members could mentor others to increase overall efficiency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
