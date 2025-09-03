import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StaffRecoveryForm = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  errors, 
  isLoading, 
  currentStep,
  selectedRole 
}) => {
  const securityQuestions = [
    { value: 'pet', label: 'What was the name of your first pet?' },
    { value: 'school', label: 'What was the name of your first school?' },
    { value: 'city', label: 'In which city were you born?' },
    { value: 'mother', label: "What is your mother\'s maiden name?" },
    { value: 'book', label: 'What is your favorite book?' },
    { value: 'teacher', label: 'What was your favorite teacher\'s name?' }
  ];

  const getRoleLabel = () => {
    const labels = {
      faculty: 'Faculty Member',
      warden: 'Warden',
      hod: 'Head of Department',
      admin: 'Administrator'
    };
    return labels?.[selectedRole] || 'Staff Member';
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Step 1: Email and Security Question */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Mail" size={20} className="text-purple-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-purple-900">{getRoleLabel()} Recovery</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Enter your official email and answer your security question to proceed.
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Official Email Address"
            type="email"
            placeholder="Enter your official email"
            value={formData?.email}
            onChange={(e) => onInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Select
            label="Security Question"
            placeholder="Select your security question"
            options={securityQuestions}
            value={formData?.securityQuestion}
            onChange={(value) => onInputChange('securityQuestion', value)}
            error={errors?.securityQuestion}
            required
          />

          <Input
            label="Security Answer"
            type="text"
            placeholder="Enter your answer"
            value={formData?.securityAnswer}
            onChange={(e) => onInputChange('securityAnswer', e?.target?.value)}
            error={errors?.securityAnswer}
            description="Answer is case-sensitive"
            required
          />
        </div>
      )}
      {/* Step 2: Email Verification */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-900">Verification Email Sent</h4>
                <p className="text-sm text-green-700 mt-1">
                  We've sent a password reset link to {formData?.email}. Please check your inbox and spam folder.
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Verification Code"
            type="text"
            placeholder="Enter code from email"
            value={formData?.emailVerificationCode}
            onChange={(e) => onInputChange('emailVerificationCode', e?.target?.value)}
            error={errors?.emailVerificationCode}
            description="Check your email for the 8-character verification code"
            required
            className="font-mono text-center text-lg tracking-wider"
          />
        </div>
      )}
      {/* Step 3: New Password */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lock" size={20} className="text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-900">Create New Password</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Set a strong password for your {getRoleLabel()?.toLowerCase()} account.
                </p>
              </div>
            </div>
          </div>

          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={formData?.newPassword}
            onChange={(e) => onInputChange('newPassword', e?.target?.value)}
            error={errors?.newPassword}
            description="Minimum 8 characters with uppercase, lowercase, numbers, and special characters"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            value={formData?.confirmPassword}
            onChange={(e) => onInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        size="lg"
        loading={isLoading}
        className="w-full"
        iconName={currentStep === 1 ? 'Send' : currentStep === 2 ? 'Shield' : 'Check'}
        iconPosition="left"
      >
        {currentStep === 1 ? 'Send Reset Email' : 
         currentStep === 2 ? 'Verify Email': 'Reset Password'}
      </Button>
    </form>
  );
};

export default StaffRecoveryForm;