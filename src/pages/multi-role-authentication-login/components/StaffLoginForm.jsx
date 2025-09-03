import React from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const StaffLoginForm = ({ formData, onInputChange, errors, userRole }) => {
  const roleLabels = {
    faculty: 'Faculty',
    warden: 'Warden',
    hod: 'HOD',
    admin: 'Admin'
  };

  return (
    <div className="space-y-4">
      <div className="form-field-reveal">
        <Input
          label="Official Email ID"
          type="email"
          placeholder={`Enter your ${roleLabels?.[userRole]} email`}
          value={formData?.email}
          onChange={(e) => onInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '150ms' }}>
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => onInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '300ms' }}>
        <Checkbox
          label="Remember Me"
          checked={formData?.rememberMe}
          onChange={(e) => onInputChange('rememberMe', e?.target?.checked)}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default StaffLoginForm;