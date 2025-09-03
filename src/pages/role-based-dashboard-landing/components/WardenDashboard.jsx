import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WardenDashboard = () => {
  const realTimeTracking = [
    {
      id: "OUT-2025-006",
      studentName: "David Kumar",
      studentId: "ME21B001",
      status: "out",
      location: "City Hospital",
      expectedReturn: "2025-01-16 18:00",
      contactNumber: "+91 9876543210"
    },
    {
      id: "OUT-2025-007",
      studentName: "Lisa Wang",
      studentId: "EE21B001",
      status: "returning",
      location: "Main Gate",
      expectedReturn: "2025-01-16 20:00",
      contactNumber: "+91 9876543211"
    }
  ];

  const emergencyAlerts = [
    {
      id: "ALERT-001",
      type: "Medical Emergency",
      studentName: "Robert Singh",
      description: "Student reported feeling unwell, requesting immediate outpass",
      timestamp: "2025-01-16 14:30",
      priority: "critical"
    },
    {
      id: "ALERT-002",
      type: "Late Return",
      studentName: "Maria Garcia",
      description: "Student has not returned by expected time",
      timestamp: "2025-01-16 13:15",
      priority: "high"
    }
  ];

  const hostelMetrics = {
    totalCapacity: 500,
    currentOccupancy: 485,
    studentsOut: 15,
    overdueReturns: 2
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'out': return 'bg-warning/10 text-warning border-warning/20';
      case 'returning': return 'bg-success/10 text-success border-success/20';
      case 'overdue': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const occupancyPercentage = Math.round((hostelMetrics?.currentOccupancy / hostelMetrics?.totalCapacity) * 100);

  return (
    <div className="space-y-6">
      {/* Hostel Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Building" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{occupancyPercentage}%</p>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="UserX" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{hostelMetrics?.studentsOut}</p>
              <p className="text-sm text-muted-foreground">Students Out</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{hostelMetrics?.currentOccupancy}</p>
              <p className="text-sm text-muted-foreground">Current Residents</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{hostelMetrics?.overdueReturns}</p>
              <p className="text-sm text-muted-foreground">Overdue Returns</p>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Alerts */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Emergency Alerts</h2>
          <Button variant="outline" size="sm" iconName="AlertTriangle" iconPosition="left">
            All Alerts
          </Button>
        </div>
        <div className="space-y-4">
          {emergencyAlerts?.map((alert) => (
            <div key={alert?.id} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{alert?.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert?.priority)}`}>
                      {alert?.priority}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium">Student:</span> {alert?.studentName}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {alert?.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {alert?.timestamp}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm" iconName="Phone">
                    Contact
                  </Button>
                  <Button variant="default" size="sm" iconName="Check">
                    Resolve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Real-time Tracking */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Real-time Tracking</h2>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
        <div className="space-y-4">
          {realTimeTracking?.map((student) => (
            <div key={student?.id} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{student?.studentName}</h3>
                    <span className="text-sm text-muted-foreground">({student?.studentId})</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student?.status)}`}>
                      {student?.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Location:</span> {student?.location}
                    </div>
                    <div>
                      <span className="font-medium">Expected Return:</span> {student?.expectedReturn}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Contact:</span> {student?.contactNumber}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="ghost" size="sm" iconName="MapPin">
                    Track
                  </Button>
                  <Button variant="outline" size="sm" iconName="Phone">
                    Call
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;