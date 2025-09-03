import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RecoveryMethodSelector = ({ selectedRole, onRoleChange, error }) => {
  const roleOptions = [
    { 
      value: 'student', 
      label: 'Student', 
      description: 'Recover using Register Number & Mobile' 
    },
    { 
      value: 'faculty', 
      label: 'Faculty', 
      description: 'Recover using Email & Security Question' 
    },
    { 
      value: 'warden', 
      label: 'Warden', 
      description: 'Recover using Email & Security Question' 
    },
    { 
      value: 'hod', 
      label: 'Head of Department', 
      description: 'Recover using Email & Security Question' 
    },
    { 
      value: 'admin', 
      label: 'Administrator', 
      description: 'Recover using Email & Security Question' 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="KeyRound" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Password Recovery</h2>
          <p className="text-sm text-muted-foreground">Select your role to begin recovery process</p>
        </div>
      </div>

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
    </div>
  );
};

export default RecoveryMethodSelector;