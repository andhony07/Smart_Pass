import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HODDashboard = () => {
  const departmentAnalytics = {
    totalStudents: 240,
    totalFaculty: 18,
    monthlyRequests: 156,
    approvalRate: 92
  };

  const approvalWorkflow = [
    {
      id: "DEPT-2025-001",
      studentName: "Jennifer Adams",
      studentId: "CS21B004",
      type: "International Conference",
      duration: "7 days",
      facultyApproval: "Approved",
      wardenApproval: "Pending",
      status: "awaiting_hod"
    },
    {
      id: "DEPT-2025-002",
      studentName: "Thomas Brown",
      studentId: "CS21B005",
      type: "Industry Internship",
      duration: "3 months",
      facultyApproval: "Approved",
      wardenApproval: "Approved",
      status: "awaiting_hod"
    }
  ];

  const staffManagement = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Associate Professor",
      pendingApprovals: 5,
      completedToday: 8,
      status: "active"
    },
    {
      name: "Prof. James Wilson",
      role: "Assistant Professor",
      pendingApprovals: 3,
      completedToday: 12,
      status: "active"
    },
    {
      name: "Dr. Priya Patel",
      role: "Professor",
      pendingApprovals: 0,
      completedToday: 6,
      status: "active"
    }
  ];

  const monthlyTrends = [
    { month: "Nov 2024", requests: 142, approved: 128, rejected: 14 },
    { month: "Dec 2024", requests: 98, approved: 89, rejected: 9 },
    { month: "Jan 2025", requests: 156, approved: 144, rejected: 12 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'awaiting_hod': return 'bg-warning/10 text-warning border-warning/20';
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Analytics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentAnalytics?.totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentAnalytics?.totalFaculty}</p>
              <p className="text-sm text-muted-foreground">Faculty Members</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentAnalytics?.monthlyRequests}</p>
              <p className="text-sm text-muted-foreground">Monthly Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border institutional-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{departmentAnalytics?.approvalRate}%</p>
              <p className="text-sm text-muted-foreground">Approval Rate</p>
            </div>
          </div>
        </div>
      </div>
      {/* Approval Workflow */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Pending HOD Approvals</h2>
          <Button variant="outline" size="sm" iconName="Shield" iconPosition="left">
            Bulk Approve
          </Button>
        </div>
        <div className="space-y-4">
          {approvalWorkflow?.map((request) => (
            <div key={request?.id} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{request?.studentName}</h3>
                    <span className="text-sm text-muted-foreground">({request?.studentId})</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request?.status)}`}>
                      Awaiting HOD Approval
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                    <div>
                      <span className="font-medium">Type:</span> {request?.type}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {request?.duration}
                    </div>
                    <div>
                      <span className="font-medium">Faculty:</span> 
                      <span className="text-success ml-1">✓ {request?.facultyApproval}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Warden:</span> 
                    <span className={request?.wardenApproval === 'Approved' ? 'text-success ml-1' : 'text-warning ml-1'}>
                      {request?.wardenApproval === 'Approved' ? '✓' : '⏳'} {request?.wardenApproval}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm" iconName="Eye">
                    Review
                  </Button>
                  <Button variant="default" size="sm" iconName="Shield">
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Staff Management */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Faculty Performance</h2>
          <Button variant="outline" size="sm" iconName="BarChart3" iconPosition="left">
            View Reports
          </Button>
        </div>
        <div className="space-y-4">
          {staffManagement?.map((staff, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{staff?.name}</h3>
                    <p className="text-sm text-muted-foreground">{staff?.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-warning">{staff?.pendingApprovals}</div>
                    <div className="text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-success">{staff?.completedToday}</div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Monthly Trends */}
      <div className="bg-card p-6 rounded-lg border border-border institutional-shadow">
        <h2 className="text-lg font-semibold text-foreground mb-4">Department Trends</h2>
        <div className="space-y-4">
          {monthlyTrends?.map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="font-medium text-foreground">{trend?.month}</div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-foreground">{trend?.requests}</div>
                  <div className="text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-success">{trend?.approved}</div>
                  <div className="text-muted-foreground">Approved</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-destructive">{trend?.rejected}</div>
                  <div className="text-muted-foreground">Rejected</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-primary">{Math.round((trend?.approved / trend?.requests) * 100)}%</div>
                  <div className="text-muted-foreground">Rate</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;