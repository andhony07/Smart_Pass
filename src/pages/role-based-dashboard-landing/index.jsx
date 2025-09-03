import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import WardenDashboard from './components/WardenDashboard';
import HODDashboard from './components/HODDashboard';
import AdminDashboard from './components/AdminDashboard';
import QuickActionFAB from '../../components/ui/QuickActionFAB';

const RoleBasedDashboardLanding = () => {
  const [currentUser, setCurrentUser] = useState({
    role: 'student',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    id: 'CS21B001'
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user data for different roles
  const mockUsers = {
    student: {
      role: 'student',
      name: 'Alex Johnson',
      email: 'alex.johnson@university.edu',
      id: 'CS21B001'
    },
    faculty: {
      role: 'faculty',
      name: 'Dr. Sarah Mitchell',
      email: 'sarah.mitchell@university.edu',
      id: 'FAC001'
    },
    warden: {
      role: 'warden',
      name: 'Prof. James Wilson',
      email: 'james.wilson@university.edu',
      id: 'WAR001'
    },
    hod: {
      role: 'hod',
      name: 'Dr. Priya Patel',
      email: 'priya.patel@university.edu',
      id: 'HOD001'
    },
    admin: {
      role: 'admin',
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@university.edu',
      id: 'ADM001'
    }
  };

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      // In a real app, this would come from authentication context or API
      const savedRole = localStorage.getItem('userRole') || 'student';
      setCurrentUser(mockUsers?.[savedRole] || mockUsers?.student);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Role switching for demo purposes
  const handleRoleSwitch = (newRole) => {
    setCurrentUser(mockUsers?.[newRole]);
    localStorage.setItem('userRole', newRole);
  };

  const renderDashboardContent = () => {
    switch (currentUser?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'warden':
        return <WardenDashboard />;
      case 'hod':
        return <HODDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      student: 'bg-blue-500',
      faculty: 'bg-green-500',
      warden: 'bg-purple-500',
      hod: 'bg-orange-500',
      admin: 'bg-red-500'
    };
    return colors?.[role] || 'bg-gray-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <DashboardHeader
        userRole={currentUser?.role}
        userName={currentUser?.name}
        userEmail={currentUser?.email}
      />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {currentUser?.name?.split(' ')?.[0]}!
              </h1>
              <p className="text-muted-foreground">
                {new Date()?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            {/* Role Switcher for Demo */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Demo Role:</span>
              <div className="flex space-x-1">
                {Object.keys(mockUsers)?.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={`px-3 py-1 rounded-full text-xs font-medium micro-interaction ${
                      currentUser?.role === role
                        ? `${getRoleColor(role)} text-white`
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {role?.charAt(0)?.toUpperCase() + role?.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Role-based Dashboard Content */}
        <div className="pb-20">
          {renderDashboardContent()}
        </div>
      </main>
      {/* Quick Action FAB */}
      <QuickActionFAB userRole={currentUser?.role} />
    </div>
  );
};

export default RoleBasedDashboardLanding;