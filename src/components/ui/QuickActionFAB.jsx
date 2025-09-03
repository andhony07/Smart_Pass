import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionFAB = ({ userRole = 'student', className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const roleActions = {
    student: {
      primary: {
        label: 'New Outpass',
        icon: 'Plus',
        action: () => navigate('/student-outpass-request-form'),
        color: 'bg-primary hover:bg-primary/90'
      },
      secondary: [
        {
          label: 'My Requests',
          icon: 'Clock',
          action: () => navigate('/my-requests')
        },
        {
          label: 'Quick Status',
          icon: 'Search',
          action: () => navigate('/status-check')
        }
      ]
    },
    faculty: {
      primary: {
        label: 'Approve Requests',
        icon: 'CheckSquare',
        action: () => navigate('/approval-queue'),
        color: 'bg-success hover:bg-success/90'
      },
      secondary: [
        {
          label: 'Student Records',
          icon: 'Users',
          action: () => navigate('/student-records')
        },
        {
          label: 'Quick Scan',
          icon: 'QrCode',
          action: () => navigate('/qr-scanner')
        }
      ]
    },
    warden: {
      primary: {
        label: 'Quick Approve',
        icon: 'Zap',
        action: () => navigate('/quick-approve'),
        color: 'bg-accent hover:bg-accent/90'
      },
      secondary: [
        {
          label: 'All Requests',
          icon: 'List',
          action: () => navigate('/all-requests')
        },
        {
          label: 'Emergency',
          icon: 'AlertTriangle',
          action: () => navigate('/emergency')
        }
      ]
    },
    hod: {
      primary: {
        label: 'Department Queue',
        icon: 'Building',
        action: () => navigate('/department-overview'),
        color: 'bg-warning hover:bg-warning/90'
      },
      secondary: [
        {
          label: 'Approvals',
          icon: 'Shield',
          action: () => navigate('/hod-approvals')
        },
        {
          label: 'Analytics',
          icon: 'BarChart3',
          action: () => navigate('/analytics')
        }
      ]
    },
    admin: {
      primary: {
        label: 'System Monitor',
        icon: 'Monitor',
        action: () => navigate('/system-overview'),
        color: 'bg-destructive hover:bg-destructive/90'
      },
      secondary: [
        {
          label: 'User Management',
          icon: 'UserCog',
          action: () => navigate('/user-management')
        },
        {
          label: 'Settings',
          icon: 'Settings',
          action: () => navigate('/system-settings')
        }
      ]
    }
  };

  const currentActions = roleActions?.[userRole] || roleActions?.student;

  const handlePrimaryAction = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      currentActions?.primary?.action();
    }
  };

  const handleSecondaryAction = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-900 ${className}`}>
      {/* Secondary Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in-up">
          {currentActions?.secondary?.map((action, index) => (
            <div
              key={action?.label}
              className="flex items-center space-x-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-card text-card-foreground px-3 py-1 rounded-lg text-sm font-medium institutional-shadow whitespace-nowrap">
                {action?.label}
              </span>
              <button
                onClick={() => handleSecondaryAction(action?.action)}
                className="w-12 h-12 bg-card hover:bg-muted text-card-foreground rounded-full institutional-shadow-lg micro-interaction flex items-center justify-center"
                title={action?.label}
              >
                <Icon name={action?.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Primary Action Button */}
      <div className="relative">
        <button
          onClick={handlePrimaryAction}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className={`w-14 h-14 ${currentActions?.primary?.color} text-white rounded-full institutional-shadow-lg micro-interaction flex items-center justify-center group`}
          title={currentActions?.primary?.label}
        >
          <Icon 
            name={isExpanded ? 'X' : currentActions?.primary?.icon} 
            size={24} 
            className="role-transition"
          />
        </button>

        {/* Tooltip for mobile */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none md:hidden">
          <div className="bg-card text-card-foreground px-3 py-1 rounded-lg text-sm font-medium institutional-shadow whitespace-nowrap">
            {currentActions?.primary?.label}
          </div>
        </div>
      </div>
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-transparent -z-10 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActionFAB;