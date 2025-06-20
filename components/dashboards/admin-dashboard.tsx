"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Bus,
  AlertTriangle,
  Calendar,
  BarChart3,
  Settings,
  MapPin,
  MessageSquare,
  Bell,
  Activity,
  Shield,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { AdminRoutes } from "@/components/admin-routes";
import { AdminAlerts } from "@/components/admin-alerts";
import { AdminSchedules } from "@/components/admin-schedules";

import { AdminUsers } from "@/components/admin-users";

export function AdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("routes");

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "add-route":
        setActiveTab("routes");
        break;
      case "add-alert":
        setActiveTab("alerts");
        break;
      case "add-schedule":
        setActiveTab("schedules");
        break;
      default:
        break;
    }
  };

  const stats = [
    { label: "Total Routes", value: "42", icon: Bus, color: "text-blue-600" },
    {
      label: "Active Buses",
      value: "38",
      icon: Activity,
      color: "text-green-600",
    },
    {
      label: "Total Students",
      value: "1,247",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "delay",
      message: "Route 42 delayed by 15 minutes",
      time: "5 min ago",
      severity: "warning",
    },
    {
      id: 2,
      type: "maintenance",
      message: "Bus #23 scheduled for maintenance",
      time: "1 hour ago",
      severity: "info",
    },
    {
      id: 3,
      type: "emergency",
      message: "Emergency stop on Route 15",
      time: "2 hours ago",
      severity: "error",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary"
        >
          <Shield className="h-4 w-4 mr-1" />
          Administrator
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="schedules">Schedules</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              
            </TabsList>

            <TabsContent value="routes" className="space-y-4">
              <AdminRoutes />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <AdminAlerts />
            </TabsContent>

            <TabsContent value="schedules" className="space-y-4">
              <AdminSchedules />
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <AdminUsers />
            </TabsContent>

            
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("add-route")}
              >
                <Bus className="h-4 w-4 mr-2" />
                Add New Route
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("add-alert")}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("add-schedule")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Add Schedule
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("Send System Alert")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("View Live Map")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Live Map
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("Message Center")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("System Settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">GPS Tracking</span>
                <Badge variant="default" className="bg-green-500">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Communication</span>
                <Badge variant="default" className="bg-green-500">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-green-500">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Badge variant="secondary" className="bg-orange-500 text-white">
                  Delayed
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
