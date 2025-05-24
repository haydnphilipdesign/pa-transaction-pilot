
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar as CalendarIcon,
  Download,
  Upload,
  Link,
  CheckCircle,
  AlertCircle,
  Copy,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/task";
import { Transaction } from "@/types/transaction";

interface GoogleCalendarSyncProps {
  tasks: Task[];
  transactions: Transaction[];
}

const GoogleCalendarSync = ({ tasks, transactions }: GoogleCalendarSyncProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncTasks: true,
    syncClosings: true,
    syncInspections: true,
    calendarId: 'primary',
    reminderMinutes: 60
  });
  const [isLoading, setIsLoading] = useState(false);
  const [webcalUrl] = useState(`${window.location.origin}/api/calendar/feed.ics`);
  const { toast } = useToast();

  const handleGoogleConnect = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth flow
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      toast({
        title: "Connected to Google Calendar",
        description: "Your calendar is now synced with your transaction deadlines.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Google Calendar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Google Calendar sync has been disabled.",
    });
  };

  const handleSyncNow = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Sync Complete",
        description: `Synced ${tasks.length} tasks and ${transactions.length} transactions to your calendar.`,
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Unable to sync with Google Calendar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyWebcalUrl = () => {
    navigator.clipboard.writeText(webcalUrl);
    toast({
      title: "URL Copied",
      description: "Calendar feed URL has been copied to your clipboard.",
    });
  };

  const generateICalFile = () => {
    const icalContent = generateICalContent();
    const blob = new Blob([icalContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-deadlines.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Calendar Downloaded",
      description: "Your transaction deadlines have been exported to an .ics file.",
    });
  };

  const generateICalContent = () => {
    const now = new Date();
    const icalEvents = tasks.map(task => {
      const taskDate = new Date(task.dueDate);
      const transaction = transactions.find(t => t.id === task.transactionId);
      
      return `BEGIN:VEVENT
UID:${task.id}@transactiontc.com
DTSTAMP:${formatDateToICal(now)}
DTSTART;VALUE=DATE:${formatDateToICal(taskDate)}
SUMMARY:${task.title}
DESCRIPTION:${task.description || ''} - Property: ${transaction?.property.address || 'N/A'}
CATEGORIES:${task.category}
PRIORITY:${task.priority === 'high' ? '1' : task.priority === 'medium' ? '5' : '9'}
STATUS:${task.completed ? 'COMPLETED' : 'CONFIRMED'}
BEGIN:VALARM
TRIGGER:-PT${syncSettings.reminderMinutes}M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${task.title}
END:VALARM
END:VEVENT`;
    }).join('\n');

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TransactionTC//Transaction Deadlines//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${icalEvents}
END:VCALENDAR`;
  };

  const formatDateToICal = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar Integration</h2>
          <p className="text-muted-foreground">
            Sync your transaction deadlines with external calendar applications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isConnected && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Calendar Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Google Calendar
            </CardTitle>
            <CardDescription>
              Two-way sync with your Google Calendar account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isConnected ? (
              <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Connect your Google Calendar to automatically sync transaction deadlines
                </p>
                <Button onClick={handleGoogleConnect} disabled={isLoading}>
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Link className="h-4 w-4 mr-2" />
                  )}
                  Connect Google Calendar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Connected to Google Calendar</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-sync" className="text-sm font-medium">
                      Automatic Sync
                    </Label>
                    <Switch
                      id="auto-sync"
                      checked={syncSettings.autoSync}
                      onCheckedChange={(checked) => 
                        setSyncSettings(prev => ({ ...prev, autoSync: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sync-tasks" className="text-sm font-medium">
                      Sync Task Deadlines
                    </Label>
                    <Switch
                      id="sync-tasks"
                      checked={syncSettings.syncTasks}
                      onCheckedChange={(checked) => 
                        setSyncSettings(prev => ({ ...prev, syncTasks: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sync-closings" className="text-sm font-medium">
                      Sync Closing Dates
                    </Label>
                    <Switch
                      id="sync-closings"
                      checked={syncSettings.syncClosings}
                      onCheckedChange={(checked) => 
                        setSyncSettings(prev => ({ ...prev, syncClosings: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Reminder Time (minutes before)
                    </Label>
                    <Input
                      type="number"
                      value={syncSettings.reminderMinutes}
                      onChange={(e) => 
                        setSyncSettings(prev => ({ 
                          ...prev, 
                          reminderMinutes: parseInt(e.target.value) || 60 
                        }))
                      }
                      min="0"
                      max="1440"
                    />
                  </div>
                </div>

                <Button onClick={handleSyncNow} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Sync Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Export</CardTitle>
            <CardDescription>
              Export your deadlines to other calendar applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Calendar Feed URL (WebCal)
                </Label>
                <div className="flex space-x-2">
                  <Input 
                    value={webcalUrl} 
                    readOnly 
                    className="font-mono text-xs"
                  />
                  <Button variant="outline" size="icon" onClick={copyWebcalUrl}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use this URL to subscribe to your deadlines in any calendar app
                </p>
              </div>

              <div>
                <Button onClick={generateICalFile} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download .ics File
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Download a one-time export of all current deadlines
                </p>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Import Instructions:</p>
                  <p className="text-blue-700">
                    Copy the WebCal URL and paste it into your calendar app's "Add Calendar" or "Subscribe" feature.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle>Sync Status</CardTitle>
          <CardDescription>
            Overview of your calendar synchronization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {tasks.filter(t => !t.completed).length}
              </div>
              <p className="text-sm text-muted-foreground">Pending Deadlines</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{transactions.length}</div>
              <p className="text-sm text-muted-foreground">Active Transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleCalendarSync;
