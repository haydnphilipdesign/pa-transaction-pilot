
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  BellRing, 
  Clock, 
  Mail, 
  AlertTriangle,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/task";
import { format, differenceInDays, isToday, isTomorrow } from "date-fns";

interface NotificationSettings {
  emailNotifications: boolean;
  inAppNotifications: boolean;
  reminderDays: number[];
  dailyDigest: boolean;
  digestTime: string;
}

interface NotificationSystemProps {
  tasks: Task[];
}

const NotificationSystem = ({ tasks }: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    inAppNotifications: true,
    reminderDays: [3, 1],
    dailyDigest: true,
    digestTime: '09:00'
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    generateNotifications();
  }, [tasks, settings]);

  const generateNotifications = () => {
    const today = new Date();
    const newNotifications: any[] = [];

    tasks.forEach(task => {
      if (task.completed) return;

      const taskDate = new Date(task.dueDate);
      const daysUntilDue = differenceInDays(taskDate, today);

      // Overdue notifications
      if (daysUntilDue < 0) {
        newNotifications.push({
          id: `overdue-${task.id}`,
          type: 'overdue',
          title: 'Overdue Task',
          message: `${task.title} was due ${Math.abs(daysUntilDue)} days ago`,
          task,
          priority: 'high',
          createdAt: new Date(),
          read: false
        });
      }
      // Due today
      else if (daysUntilDue === 0) {
        newNotifications.push({
          id: `today-${task.id}`,
          type: 'due_today',
          title: 'Due Today',
          message: `${task.title} is due today`,
          task,
          priority: 'high',
          createdAt: new Date(),
          read: false
        });
      }
      // Upcoming reminders
      else if (settings.reminderDays.includes(daysUntilDue)) {
        newNotifications.push({
          id: `reminder-${daysUntilDue}-${task.id}`,
          type: 'reminder',
          title: `Due in ${daysUntilDue} day${daysUntilDue === 1 ? '' : 's'}`,
          message: `${task.title} is due ${format(taskDate, 'MMM dd, yyyy')}`,
          task,
          priority: daysUntilDue === 1 ? 'medium' : 'low',
          createdAt: new Date(),
          read: false
        });
      }
    });

    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const sendTestNotification = () => {
    toast({
      title: "Test Notification",
      description: "This is a test notification to verify your settings are working.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'due_today': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'reminder': return <Bell className="h-4 w-4 text-yellow-600" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Manage deadline alerts and notification preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {unreadCount} unread
          </Badge>
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how and when you receive deadline alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="text-sm font-medium">
                  Email Notifications
                </Label>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="in-app-notifications" className="text-sm font-medium">
                  In-App Notifications
                </Label>
                <Switch
                  id="in-app-notifications"
                  checked={settings.inAppNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, inAppNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="daily-digest" className="text-sm font-medium">
                  Daily Digest
                </Label>
                <Switch
                  id="daily-digest"
                  checked={settings.dailyDigest}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, dailyDigest: checked }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Reminder Days Before Due Date
              </Label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 5, 7].map(days => (
                  <Button
                    key={days}
                    variant={settings.reminderDays.includes(days) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev,
                        reminderDays: prev.reminderDays.includes(days)
                          ? prev.reminderDays.filter(d => d !== days)
                          : [...prev.reminderDays, days].sort((a, b) => b - a)
                      }));
                    }}
                  >
                    {days} day{days === 1 ? '' : 's'}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Daily Digest Time
              </Label>
              <Select
                value={settings.digestTime}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, digestTime: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="07:00">7:00 AM</SelectItem>
                  <SelectItem value="08:00">8:00 AM</SelectItem>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="17:00">5:00 PM</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={sendTestNotification} className="w-full">
              <BellRing className="h-4 w-4 mr-2" />
              Send Test Notification
            </Button>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Latest deadline alerts and reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications at this time</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      notification.read ? 'bg-white' : getPriorityColor(notification.priority)
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.task.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(notification.createdAt, 'MMM dd, h:mm a')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationSystem;
