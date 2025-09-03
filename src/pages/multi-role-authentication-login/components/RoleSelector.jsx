import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, error }) => {
  const roleOptions = [
    { 
      value: 'student', 
      label: 'Student', 
      description: 'Access your outpass requests and status',
      icon: 'GraduationCap'
    },
    { 
      value: 'faculty', 
      label: 'Faculty', 
      description: 'Review and approve student requests',
      icon: 'BookOpen'
    },
    { 
      value: 'warden', 
      label: 'Warden', 
      description: 'Monitor and manage hostel outpasses',
      icon: 'Shield'
    },
    { 
      value: 'hod', 
      label: 'Head of Department', 
      description: 'Department-level approvals and oversight',
      icon: 'Building'
    },
    { 
      value: 'admin', 
      label: 'Administrator', 
      description: 'System administration and user management',
      icon: 'Settings'
    }
  ];

  return (
    <div className="mb-6">
      <Select
        label="Select Your Role"
        placeholder="Choose your role to continue"
        options={roleOptions}
        value={selectedRole}
        onChange={onRoleChange}
        error={error}
        required
        searchable
        className="role-transition"
      />
      {selectedRole && (
        <div className="mt-3 p-3 bg-muted rounded-lg form-field-reveal">
          <div className="flex items-center space-x-2">
            <Icon 
              name={roleOptions?.find(role => role?.value === selectedRole)?.icon} 
              size={16} 
              className="text-primary" 
            />
            <span className="text-sm text-muted-foreground">
              {roleOptions?.find(role => role?.value === selectedRole)?.description}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;