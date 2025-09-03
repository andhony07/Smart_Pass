import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ selectedRole }) => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/multi-role-authentication-login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLoginNow = () => {
    navigate('/multi-role-authentication-login');
  };

  const getRoleLabel = () => {
    const labels = {
      student: 'Student',
      faculty: 'Faculty',
      warden: 'Warden',
      hod: 'Head of Department',
      admin: 'Administrator'
    };
    return labels?.[selectedRole] || 'User';
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={24} color="white" />
          </div>
        </div>
      </div>
      {/* Success Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Password Reset Successful!</h2>
        <p className="text-muted-foreground">
          Your {getRoleLabel()?.toLowerCase()} account password has been successfully updated.
        </p>
      </div>
      {/* Success Details */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-sm font-medium text-success">Secure Password Set</span>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>✓ Password meets all security requirements</p>
            <p>✓ Account access has been restored</p>
            <p>✓ Previous sessions have been invalidated</p>
          </div>
        </div>
      </div>
      {/* Security Recommendations */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-amber-600 mt-0.5" />
          <div className="text-left">
            <h4 className="text-sm font-medium text-amber-900">Security Recommendations</h4>
            <ul className="text-sm text-amber-700 mt-2 space-y-1">
              <li>• Keep your password confidential and secure</li>
              <li>• Enable two-factor authentication if available</li>
              <li>• Log out from shared or public computers</li>
              <li>• Update your security questions if needed</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Auto-redirect Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Clock" size={16} className="text-blue-600" />
          <span className="text-sm text-blue-700">
            Redirecting to login page in {countdown} seconds...
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="default"
          onClick={handleLoginNow}
          iconName="LogIn"
          iconPosition="left"
          className="sm:w-auto"
        >
          Login Now
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/role-based-dashboard-landing')}
          iconName="Home"
          iconPosition="left"
          className="sm:w-auto"
        >
          Go to Dashboard
        </Button>
      </div>
      {/* Footer Note */}
      <div className="text-xs text-muted-foreground">
        <p>If you experience any issues, please contact the IT support team.</p>
      </div>
    </div>
  );
};

export default SuccessMessage;