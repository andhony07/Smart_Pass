import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentDashboard = () => {
  const currentRequests = [
    {
      id: "OUT-2025-001",
      type: "Weekend Home Visit",
      status: "pending",
      submittedDate: "2025-01-15",
      expectedReturn: "2025-01-17",
      approvalStage: "Faculty Review"
    },
    {
      id: "OUT-2025-002",
      type: "Medical Appointment",
      status: "approved",
      submittedDate: "2025-01-10",
      expectedReturn: "2025-01-10",
      approvalStage: "Completed"
    }
  ];

  const upcomingDeadlines = [
    {
      title: "Assignment Submission",
      date: "2025-01-20",
      subject: "Computer Networks",
      priority: "high"
    },
    {
      title: "Lab Report Due",
      date: "2025-01-22",
      subject: "Database Systems",
      priority: "medium"
    }
  ];

  const quickStats = {
    totalRequests: 12,
    approvedRequests: 8,
    pendingRequests: 2,
    rejectedRequests: 2
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-success/10 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{quickStats?.totalRequests}</p>
              <p className="text-sm text-muted-foreground">Total Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{quickStats?.approvedRequests}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{quickStats?.pendingRequests}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{quickStats?.rejectedRequests}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
      </div>
      {/* Current Requests */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Current Requests</h2>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            New Request
          </Button>
        </div>
        <div className="space-y-4">
          {currentRequests?.map((request) => (
            <div key={request?.id} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{request?.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request?.status)}`}>
                      {request?.status?.charAt(0)?.toUpperCase() + request?.status?.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">ID:</span> {request?.id}
                    </div>
                    <div>
                      <span className="font-medium">Submitted:</span> {new Date(request.submittedDate)?.toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Return:</span> {new Date(request.expectedReturn)?.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">
                      <span className="font-medium">Stage:</span> {request?.approvalStage}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h2>
        <div className="space-y-3">
          {upcomingDeadlines?.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{deadline?.title}</h4>
                  <p className="text-sm text-muted-foreground">{deadline?.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {new Date(deadline.date)?.toLocaleDateString()}
                </div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline?.priority)}`}>
                  {deadline?.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;