import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminDashboard = () => {
  const systemStats = {
    totalUsers: 1250,
    activeUsers: 1180,
    systemUptime: "99.8%",
    dailyRequests: 89
  };

  const userManagement = [
    {
      department: "Computer Science",
      students: 240,
      faculty: 18,
      activeRequests: 12,
      status: "normal"
    },
    {
      department: "Mechanical Engineering",
      students: 180,
      faculty: 15,
      activeRequests: 8,
      status: "normal"
    },
    {
      department: "Electrical Engineering",
      students: 200,
      faculty: 16,
      activeRequests: 15,
      status: "high"
    },
    {
      department: "Civil Engineering",
      students: 160,
      faculty: 12,
      activeRequests: 6,
      status: "low"
    }
  ];

  const systemAlerts = [
    {
      id: "SYS-001",
      type: "Performance",
      message: "Database query response time increased by 15%",
      severity: "medium",
      timestamp: "2025-01-16 15:30"
    },
    {
      id: "SYS-002",
      type: "Security",
      message: "Multiple failed login attempts detected from IP 192.168.1.100",
      severity: "high",
      timestamp: "2025-01-16 14:45"
    },
    {
      id: "SYS-003",
      type: "Maintenance",
      message: "Scheduled backup completed successfully",
      severity: "info",
      timestamp: "2025-01-16 02:00"
    }
  ];

  const configurationPanels = [
    {
      title: "User Roles & Permissions",
      description: "Manage user access levels and role-based permissions",
      icon: "UserCog",
      action: "Configure"
    },
    {
      title: "System Settings",
      description: "Configure global system parameters and preferences",
      icon: "Settings",
      action: "Manage"
    },
    {
      title: "Notification Templates",
      description: "Customize email and SMS notification templates",
      icon: "Mail",
      action: "Edit"
    },
    {
      title: "Backup & Recovery",
      description: "Configure automated backups and recovery procedures",
      icon: "Database",
      action: "Setup"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'normal': return 'bg-success/10 text-success border-success/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'info': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{systemStats?.totalUsers}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="UserCheck" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{systemStats?.activeUsers}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Monitor" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{systemStats?.systemUptime}</p>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{systemStats?.dailyRequests}</p>
              <p className="text-sm text-muted-foreground">Daily Requests</p>
            </div>
          </div>
        </div>
      </div>
      {/* System Alerts */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">System Alerts</h2>
          <Button variant="outline" size="sm" iconName="AlertTriangle" iconPosition="left">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {systemAlerts?.map((alert) => (
            <div key={alert?.id} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{alert?.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {alert?.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {alert?.timestamp}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm" iconName="Eye">
                    Details
                  </Button>
                  <Button variant="ghost" size="sm" iconName="X">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* User Management Overview */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Department Overview</h2>
          <Button variant="outline" size="sm" iconName="UserCog" iconPosition="left">
            Manage Users
          </Button>
        </div>
        <div className="space-y-4">
          {userManagement?.map((dept, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Building" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{dept?.department}</h3>
                    <p className="text-sm text-muted-foreground">
                      {dept?.students} students, {dept?.faculty} faculty
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{dept?.activeRequests}</div>
                    <div className="text-xs text-muted-foreground">Active Requests</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(dept?.status)}`}>
                    {dept?.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Configuration Panels */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <h2 className="text-lg font-semibold text-foreground mb-4">System Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {configurationPanels?.map((panel, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted/70 micro-interaction">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={panel?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{panel?.title}</h3>
                    <p className="text-sm text-muted-foreground">{panel?.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {panel?.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;