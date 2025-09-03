import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const AuthenticationCard = ({ mode = 'login', onModeChange }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    email: '',
    otp: ''
  });
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'student', label: 'Student', description: 'Access your outpass requests and status' },
    { value: 'faculty', label: 'Faculty', description: 'Review and approve student requests' },
    { value: 'warden', label: 'Warden', description: 'Monitor and manage hostel outpasses' },
    { value: 'hod', label: 'Head of Department', description: 'Department-level approvals and oversight' },
    { value: 'admin', label: 'Administrator', description: 'System administration and user management' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedRole) {
      newErrors.role = 'Please select your role';
    }

    if (mode === 'login') {
      if (!formData?.identifier) {
        newErrors.identifier = 'Please enter your ID or email';
      }
      if (!formData?.password) {
        newErrors.password = 'Please enter your password';
      }
    } else if (mode === 'forgot') {
      if (!formData?.email) {
        newErrors.email = 'Please enter your email address';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'login') {
        navigate('/role-based-dashboard-landing');
      } else {
        // Show success message for password reset
        alert('Password reset instructions sent to your email');
        onModeChange('login');
      }
    }, 1500);
  };

  const handleQRScan = () => {
    setShowQRScanner(true);
    // Simulate QR scan success
    setTimeout(() => {
      setShowQRScanner(false);
      navigate('/role-based-dashboard-landing');
    }, 2000);
  };

  const getRoleSpecificFields = () => {
    if (!selectedRole) return null;

    const fields = [];

    if (mode === 'login') {
      // Role-specific identifier labels
      const identifierLabels = {
        student: 'Student ID or Email',
        faculty: 'Faculty ID or Email',
        warden: 'Warden ID or Email',
        hod: 'HOD ID or Email',
        admin: 'Admin ID or Email'
      };

      fields?.push(
        <div key="identifier" className="form-field-reveal">
          <Input
            label={identifierLabels?.[selectedRole]}
            type="text"
            placeholder={`Enter your ${selectedRole} ID or email`}
            value={formData?.identifier}
            onChange={(e) => handleInputChange('identifier', e?.target?.value)}
            error={errors?.identifier}
            required
            className="font-mono"
          />
        </div>
      );

      fields?.push(
        <div key="password" className="form-field-reveal" style={{ animationDelay: '150ms' }}>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
        </div>
      );

      // QR Code option for students
      if (selectedRole === 'student') {
        fields?.push(
          <div key="qr-option" className="form-field-reveal" style={{ animationDelay: '300ms' }}>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-3">Or use quick login</div>
              <Button
                type="button"
                variant="outline"
                onClick={handleQRScan}
                iconName="QrCode"
                iconPosition="left"
                className="w-full"
              >
                Scan QR Code
              </Button>
            </div>
          </div>
        );
      }
    } else if (mode === 'forgot') {
      fields?.push(
        <div key="email" className="form-field-reveal">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your registered email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            description="We'll send password reset instructions to this email"
            required
          />
        </div>
      );
    }

    return fields;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center institutional-shadow-lg">
              <Icon name="GraduationCap" size={32} color="white" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Smart Outpass</h1>
          <p className="text-muted-foreground">
            {mode === 'login' ? 'Sign in to your account' : 'Reset your password'}
          </p>
        </div>

        {/* QR Scanner Overlay */}
        {showQRScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200">
            <div className="bg-card p-6 rounded-lg institutional-shadow-lg max-w-sm w-full mx-4">
              <div className="text-center">
                <div className="w-48 h-48 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-primary rounded-lg flex items-center justify-center">
                    <Icon name="QrCode" size={48} color="var(--color-primary)" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">Scan QR Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Position the QR code within the frame
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowQRScanner(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Authentication Form */}
        <div className="bg-card p-8 rounded-lg institutional-shadow-lg border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <Select
              label="Select Your Role"
              placeholder="Choose your role to continue"
              options={roleOptions}
              value={selectedRole}
              onChange={setSelectedRole}
              error={errors?.role}
              required
              searchable
              className="role-transition"
            />

            {/* Dynamic Fields */}
            <div className="space-y-4">
              {getRoleSpecificFields()}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              loading={isLoading}
              disabled={!selectedRole}
              className="w-full"
              iconName={mode === 'login' ? 'LogIn' : 'Mail'}
              iconPosition="left"
            >
              {mode === 'login' ? 'Sign In' : 'Send Reset Link'}
            </Button>

            {/* Mode Toggle */}
            <div className="text-center">
              {mode === 'login' ? (
                <button
                  type="button"
                  onClick={() => onModeChange('forgot')}
                  className="text-sm text-primary hover:text-primary/80 micro-interaction"
                >
                  Forgot your password?
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onModeChange('login')}
                  className="text-sm text-primary hover:text-primary/80 micro-interaction"
                >
                  Back to sign in
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2025 Smart Outpass System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCard;