import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleAdaptiveNavbar = ({ userRole = 'student', isAuthenticated = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = {
    student: [
      { label: 'My Dashboard', path: '/role-based-dashboard-landing', icon: 'Home' },
      { label: 'Request Outpass', path: '/student-outpass-request-form', icon: 'FileText' },
      { label: 'My Requests', path: '/my-requests', icon: 'Clock' },
      { label: 'Profile', path: '/profile', icon: 'User' }
    ],
    faculty: [
      { label: 'Dashboard', path: '/role-based-dashboard-landing', icon: 'LayoutDashboard' },
      { label: 'Approval Queue', path: '/approval-queue', icon: 'CheckSquare' },
      { label: 'Student Records', path: '/student-records', icon: 'Users' },
      { label: 'Reports', path: '/reports', icon: 'BarChart3' }
    ],
    warden: [
      { label: 'Dashboard', path: '/role-based-dashboard-landing', icon: 'LayoutDashboard' },
      { label: 'All Requests', path: '/all-requests', icon: 'List' },
      { label: 'Quick Approve', path: '/quick-approve', icon: 'Zap' },
      { label: 'Analytics', path: '/analytics', icon: 'TrendingUp' }
    ],
    hod: [
      { label: 'Dashboard', path: '/role-based-dashboard-landing', icon: 'LayoutDashboard' },
      { label: 'Department Overview', path: '/department-overview', icon: 'Building' },
      { label: 'Approvals', path: '/hod-approvals', icon: 'Shield' },
      { label: 'Settings', path: '/settings', icon: 'Settings' }
    ],
    admin: [
      { label: 'Dashboard', path: '/role-based-dashboard-landing', icon: 'LayoutDashboard' },
      { label: 'System Overview', path: '/system-overview', icon: 'Monitor' },
      { label: 'User Management', path: '/user-management', icon: 'UserCog' },
      { label: 'System Settings', path: '/system-settings', icon: 'Settings' }
    ]
  };

  const currentNavItems = navigationItems?.[userRole] || navigationItems?.student;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/multi-role-authentication-login');
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000 role-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mr-3">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">Smart Outpass</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {currentNavItems?.slice(0, 4)?.map((item) => {
                  const isActive = location?.pathname === item?.path;
                  return (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`px-3 py-2 rounded-md text-sm font-medium micro-interaction flex items-center space-x-2 ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                iconName={isMobileMenuOpen ? "X" : "Menu"}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border institutional-shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {currentNavItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium micro-interaction flex items-center space-x-3 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </button>
                );
              })}
              <div className="border-t border-border pt-2 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted micro-interaction flex items-center space-x-3"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
};

export default RoleAdaptiveNavbar;