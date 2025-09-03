import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StudentRecoveryForm = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  errors, 
  isLoading, 
  currentStep,
  onResendCode 
}) => {
  const [countdown, setCountdown] = useState(0);

  const handleResendCode = () => {
    if (countdown === 0) {
      onResendCode();
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Step 1: Register Number and Mobile */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Student Recovery Process</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Enter your register number and mobile number to receive a verification code via SMS.
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Register Number"
            type="text"
            placeholder="Enter your register number (e.g., 21CS001)"
            value={formData?.registerNumber}
            onChange={(e) => onInputChange('registerNumber', e?.target?.value?.toUpperCase())}
            error={errors?.registerNumber}
            required
            className="font-mono"
          />

          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter your registered mobile number"
            value={formData?.mobileNumber}
            onChange={(e) => onInputChange('mobileNumber', e?.target?.value)}
            error={errors?.mobileNumber}
            description="We'll send a verification code to this number"
            required
          />
        </div>
      )}
      {/* Step 2: OTP Verification */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="MessageSquare" size={20} className="text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-900">Verification Code Sent</h4>
                <p className="text-sm text-green-700 mt-1">
                  We've sent a 6-digit code to your mobile number ending in ****{formData?.mobileNumber?.slice(-2)}
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Verification Code"
            type="text"
            placeholder="Enter 6-digit code"
            value={formData?.verificationCode}
            onChange={(e) => onInputChange('verificationCode', e?.target?.value)}
            error={errors?.verificationCode}
            maxLength={6}
            required
            className="font-mono text-center text-lg tracking-widest"
          />

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={countdown > 0}
              className="text-sm text-primary hover:text-primary/80 disabled:text-muted-foreground micro-interaction"
            >
              {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend verification code'}
            </button>
          </div>
        </div>
      )}
      {/* Step 3: New Password */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-900">Create New Password</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Choose a strong password that you haven't used before.
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
            description="Password must be at least 8 characters with uppercase, lowercase, and numbers"
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
        {currentStep === 1 ? 'Send Verification Code' : 
         currentStep === 2 ? 'Verify Code': 'Reset Password'}
      </Button>
    </form>
  );
};

export default StudentRecoveryForm;