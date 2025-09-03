import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = ({ 
  userRole = 'student', 
  userName = 'John Doe', 
  userEmail = 'john.doe@university.edu',
  userAvatar = null,
  onLogout 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roleLabels = {
    student: 'Student',
    faculty: 'Faculty Member',
    warden: 'Warden',
    hod: 'Head of Department',
    admin: 'Administrator'
  };

  const roleColors = {
    student: 'bg-blue-100 text-blue-800',
    faculty: 'bg-green-100 text-green-800',
    warden: 'bg-purple-100 text-purple-800',
    hod: 'bg-orange-100 text-orange-800',
    admin: 'bg-red-100 text-red-800'
  };

  const menuItems = [
    { label: 'My Profile', icon: 'User', action: 'profile' },
    { label: 'Settings', icon: 'Settings', action: 'settings' },
    { label: 'Help & Support', icon: 'HelpCircle', action: 'help' },
    { label: 'Privacy Policy', icon: 'Shield', action: 'privacy' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleMenuAction = (action) => {
    setIsOpen(false);
    
    switch (action) {
      case 'profile':
        // Navigate to profile page
        console.log('Navigate to profile');
        break;
      case 'settings':
        // Navigate to settings page
        console.log('Navigate to settings');
        break;
      case 'help':
        // Navigate to help page
        console.log('Navigate to help');
        break;
      case 'privacy':
        // Navigate to privacy page
        console.log('Navigate to privacy');
        break;
      case 'logout':
        if (onLogout) {
          onLogout();
        }
        break;
      default:
        break;
    }
  };

  const getInitials = (name) => {
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted micro-interaction focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt={userName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(userName)
          )}
        </div>

        {/* User Info (Hidden on mobile) */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">{userName}</div>
          <div className="text-xs text-muted-foreground">{roleLabels?.[userRole]}</div>
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground hidden md:block" 
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg institutional-shadow-lg z-1100 animate-fade-in">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-medium">
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(userName)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-popover-foreground truncate">
                  {userName}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {userEmail}
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${roleColors?.[userRole]}`}>
                  {roleLabels?.[userRole]}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <button
                key={item?.action}
                onClick={() => handleMenuAction(item?.action)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted micro-interaction"
              >
                <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-border py-2">
            <button
              onClick={() => handleMenuAction('logout')}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 micro-transition"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;