import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacultyDashboard = () => {
  const pendingApprovals = [
    {
      id: "OUT-2025-003",
      studentName: "Sarah Johnson",
      studentId: "CS21B001",
      type: "Medical Emergency",
      submittedDate: "2025-01-16",
      urgency: "high",
      reason: "Family emergency - father hospitalized"
    },
    {
      id: "OUT-2025-004",
      studentName: "Michael Chen",
      studentId: "CS21B002",
      type: "Weekend Home Visit",
      submittedDate: "2025-01-15",
      urgency: "normal",
      reason: "Sister\'s wedding ceremony"
    },
    {
      id: "OUT-2025-005",
      studentName: "Priya Sharma",
      studentId: "CS21B003",
      type: "Job Interview",
      submittedDate: "2025-01-14",
      urgency: "medium",
      reason: "Campus placement interview at TechCorp"
    }
  ];

  const recentRequests = [
    {
      id: "OUT-2025-001",
      studentName: "Alex Rodriguez",
      action: "Approved",
      date: "2025-01-15",
      type: "Medical Appointment"
    },
    {
      id: "OUT-2025-002",
      studentName: "Emma Wilson",
      action: "Rejected",
      date: "2025-01-14",
      type: "Personal Work"
    }
  ];

  const departmentStats = {
    totalStudents: 120,
    activeRequests: 8,
    approvedToday: 5,
    pendingReview: 3
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'normal': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getActionColor = (action) => {
    switch (action?.toLowerCase()) {
      case 'approved': return 'text-success';
      case 'rejected': return 'text-destructive';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentStats?.totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentStats?.activeRequests}</p>
              <p className="text-sm text-muted-foreground">Active Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentStats?.approvedToday}</p>
              <p className="text-sm text-muted-foreground">Approved Today</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentStats?.pendingReview}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
      </div>
      {/* Pending Approvals Queue */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
          <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
            Filter
          </Button>
        </div>
        <div className="space-y-4">
          {pendingApprovals?.map((request) => (
            <div key={request?.id} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{request?.studentName}</h3>
                    <span className="text-sm text-muted-foreground">({request?.studentId})</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request?.urgency)}`}>
                      {request?.urgency}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                    <div>
                      <span className="font-medium">Type:</span> {request?.type}
                    </div>
                    <div>
                      <span className="font-medium">Submitted:</span> {new Date(request.submittedDate)?.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Reason:</span> {request?.reason}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm" iconName="Eye">
                    Review
                  </Button>
                  <Button variant="default" size="sm" iconName="Check">
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Actions */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Actions</h2>
        <div className="space-y-3">
          {recentRequests?.map((request) => (
            <div key={request?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{request?.studentName}</h4>
                  <p className="text-sm text-muted-foreground">{request?.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getActionColor(request?.action)}`}>
                  {request?.action}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(request.date)?.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;