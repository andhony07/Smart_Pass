import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecoveryMethodSelector from './components/RecoveryMethodSelector';
import StudentRecoveryForm from './components/StudentRecoveryForm';
import StaffRecoveryForm from './components/StaffRecoveryForm';
import ProgressIndicator from './components/ProgressIndicator';
import RecoveryTips from './components/RecoveryTips';
import SuccessMessage from './components/SuccessMessage';

const ForgotPasswordRecovery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get role from navigation state or default to empty
  const initialRole = location?.state?.selectedRole || '';
  
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Form data for both student and staff recovery
  const [formData, setFormData] = useState({
    // Student fields
    registerNumber: '',
    mobileNumber: '',
    verificationCode: '',
    
    // Staff fields
    email: '',
    securityQuestion: '',
    securityAnswer: '',
    emailVerificationCode: '',
    
    // Common fields
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (selectedRole === 'student') {
        if (!formData?.registerNumber) {
          newErrors.registerNumber = 'Register number is required';
        } else if (!/^[0-9]{2}[A-Z]{3}[0-9]{3}$/?.test(formData?.registerNumber)) {
          newErrors.registerNumber = 'Invalid register number format (e.g., 21CSE001)';
        }
        
        if (!formData?.mobileNumber) {
          newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^[6-9]\d{9}$/?.test(formData?.mobileNumber)) {
          newErrors.mobileNumber = 'Invalid mobile number format';
        }
      } else {
        if (!formData?.email) {
          newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
          newErrors.email = 'Invalid email address format';
        }
        
        if (!formData?.securityQuestion) {
          newErrors.securityQuestion = 'Please select a security question';
        }
        
        if (!formData?.securityAnswer) {
          newErrors.securityAnswer = 'Security answer is required';
        }
      }
    } else if (currentStep === 2) {
      if (selectedRole === 'student') {
        if (!formData?.verificationCode) {
          newErrors.verificationCode = 'Verification code is required';
        } else if (formData?.verificationCode?.length !== 6) {
          newErrors.verificationCode = 'Verification code must be 6 digits';
        }
      } else {
        if (!formData?.emailVerificationCode) {
          newErrors.emailVerificationCode = 'Email verification code is required';
        } else if (formData?.emailVerificationCode?.length !== 8) {
          newErrors.emailVerificationCode = 'Verification code must be 8 characters';
        }
      }
    } else if (currentStep === 3) {
      if (!formData?.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData?.newPassword?.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.newPassword)) {
        newErrors.newPassword = 'Password must contain uppercase, lowercase, and numbers';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.newPassword !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final step - show success
        setShowSuccess(true);
      }
    }, 1500);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentStep(1);
    setFormData({
      registerNumber: '',
      mobileNumber: '',
      verificationCode: '',
      email: '',
      securityQuestion: '',
      securityAnswer: '',
      emailVerificationCode: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleResendCode = () => {
    // Simulate resending code
    console.log('Resending verification code...');
  };

  const handleBackToLogin = () => {
    navigate('/multi-role-authentication-login');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-lg institutional-shadow-lg border border-border">
            <SuccessMessage selectedRole={selectedRole} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Header with Breadcrumb */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                <button
                  onClick={handleBackToLogin}
                  className="hover:text-foreground micro-interaction"
                >
                  Login
                </button>
                <Icon name="ChevronRight" size={16} />
                <span className="text-foreground">Forgot Password</span>
              </div>

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center institutional-shadow-lg">
                  <Icon name="GraduationCap" size={32} color="white" />
                </div>
              </div>
            </div>

            {/* Recovery Form Card */}
            <div className="bg-card p-8 rounded-lg institutional-shadow-lg border border-border">
              {!selectedRole ? (
                <RecoveryMethodSelector
                  selectedRole={selectedRole}
                  onRoleChange={handleRoleChange}
                  error={errors?.role}
                />
              ) : (
                <>
                  <ProgressIndicator
                    currentStep={currentStep}
                    totalSteps={3}
                    selectedRole={selectedRole}
                  />

                  {selectedRole === 'student' ? (
                    <StudentRecoveryForm
                      formData={formData}
                      onInputChange={handleInputChange}
                      onSubmit={handleSubmit}
                      errors={errors}
                      isLoading={isLoading}
                      currentStep={currentStep}
                      onResendCode={handleResendCode}
                    />
                  ) : (
                    <StaffRecoveryForm
                      formData={formData}
                      onInputChange={handleInputChange}
                      onSubmit={handleSubmit}
                      errors={errors}
                      isLoading={isLoading}
                      currentStep={currentStep}
                      selectedRole={selectedRole}
                    />
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={handleBackToLogin}
                      iconName="ArrowLeft"
                      iconPosition="left"
                      className="sm:w-auto"
                    >
                      Back to Login
                    </Button>
                    
                    {currentStep > 1 && (
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        iconName="ChevronLeft"
                        iconPosition="left"
                        className="sm:w-auto"
                      >
                        Previous Step
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>© {new Date()?.getFullYear()} Smart Outpass System. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar with Tips */}
        <div className="hidden lg:block w-96 bg-muted/30 p-8">
          <div className="sticky top-8">
            {selectedRole && (
              <RecoveryTips selectedRole={selectedRole} />
            )}
            
            {!selectedRole && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h3 className="text-lg font-medium text-foreground">Need Help?</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-2">Contact Support</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>📧 support@college.edu</p>
                      <p>📞 +91-XXXX-XXXXXX</p>
                      <p>🏢 IT Office, Admin Block</p>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-2">Office Hours</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 9:00 AM - 1:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordRecovery;