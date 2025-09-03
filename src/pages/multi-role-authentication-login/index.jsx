import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import RoleSelector from './components/RoleSelector';
import StudentLoginForm from './components/StudentLoginForm';
import StaffLoginForm from './components/StaffLoginForm';
import AdminCaptcha from './components/AdminCaptcha';
import QRScanner from './components/QRScanner';
import ThemeToggle from './components/ThemeToggle';
import QuickHelpChatbot from './components/QuickHelpChatbot';
import RoleBackgroundImage from './components/RoleBackgroundImage';

const MultiRoleAuthenticationLogin = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data for different roles
  const [formData, setFormData] = useState({
    // Student fields
    fullName: '',
    registerNumber: '',
    mobileNumber: '',
    email: '',
    parentName: '',
    parentMobile: '',
    termsAccepted: false,
    // Staff fields
    password: '',
    rememberMe: false
  });

  // Mock credentials for different roles
  const mockCredentials = {
    student: {
      fullName: 'John Doe',
      registerNumber: 'REG2025001',
      mobileNumber: '9876543210',
      email: 'john.doe@university.edu',
      parentName: 'Robert Doe',
      parentMobile: '9876543211'
    },
    faculty: {
      email: 'faculty@university.edu',
      password: 'faculty123'
    },
    warden: {
      email: 'warden@university.edu',
      password: 'warden123'
    },
    hod: {
      email: 'hod@university.edu',
      password: 'hod123'
    },
    admin: {
      email: 'admin@university.edu',
      password: 'admin123'
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData({
      fullName: '',
      registerNumber: '',
      mobileNumber: '',
      email: '',
      parentName: '',
      parentMobile: '',
      termsAccepted: false,
      password: '',
      rememberMe: false
    });
    setErrors({});
    setCaptchaVerified(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedRole) {
      newErrors.role = 'Please select your role';
      setErrors(newErrors);
      return false;
    }

    if (selectedRole === 'student') {
      if (!formData?.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData?.registerNumber?.trim()) {
        newErrors.registerNumber = 'Register number is required';
      } else if (!/^REG\d{7}$/?.test(formData?.registerNumber)) {
        newErrors.registerNumber = 'Invalid register number format (e.g., REG2025001)';
      }
      
      if (!formData?.mobileNumber?.trim()) {
        newErrors.mobileNumber = 'Mobile number is required';
      } else if (!/^\d{10}$/?.test(formData?.mobileNumber)) {
        newErrors.mobileNumber = 'Mobile number must be 10 digits';
      }
      
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Invalid email format';
      }
      
      if (!formData?.parentName?.trim()) {
        newErrors.parentName = 'Parent name is required';
      }
      
      if (!formData?.parentMobile?.trim()) {
        newErrors.parentMobile = 'Parent mobile number is required';
      } else if (!/^\d{10}$/?.test(formData?.parentMobile)) {
        newErrors.parentMobile = 'Parent mobile number must be 10 digits';
      }
      
      if (!formData?.termsAccepted) {
        newErrors.termsAccepted = 'Please accept the terms and conditions';
      }
    } else {
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Invalid email format';
      }
      
      if (!formData?.password?.trim()) {
        newErrors.password = 'Password is required';
      }
      
      if (selectedRole === 'admin' && !captchaVerified) {
        newErrors.captcha = 'Please complete the captcha verification';
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
      
      // Check mock credentials
      const credentials = mockCredentials?.[selectedRole];
      let isValid = false;

      if (selectedRole === 'student') {
        isValid = (
          formData?.fullName === credentials?.fullName &&
          formData?.registerNumber === credentials?.registerNumber &&
          formData?.mobileNumber === credentials?.mobileNumber &&
          formData?.email === credentials?.email &&
          formData?.parentName === credentials?.parentName &&
          formData?.parentMobile === credentials?.parentMobile
        );
      } else {
        isValid = (
          formData?.email === credentials?.email &&
          formData?.password === credentials?.password
        );
      }

      if (isValid) {
        navigate('/role-based-dashboard-landing');
      } else {
        setErrors({
          general: `Invalid credentials. Please use the correct ${selectedRole} credentials.`
        });
      }
    }, 1500);
  };

  const handleQRScanSuccess = (studentData) => {
    setFormData(prev => ({
      ...prev,
      fullName: studentData?.name,
      registerNumber: studentData?.registerNumber
    }));
    setShowQRScanner(false);
    navigate('/role-based-dashboard-landing');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password-recovery');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full p-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Smart Outpass</h1>
              <p className="text-xs text-muted-foreground">Educational Institution Management</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          {/* Authentication Card */}
          <div className="relative bg-card rounded-lg institutional-shadow-lg border border-border overflow-hidden">
            {/* Background Image */}
            <RoleBackgroundImage selectedRole={selectedRole} />
            
            {/* Card Content */}
            <div className="relative z-20 p-8">
              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to access your account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <RoleSelector
                  selectedRole={selectedRole}
                  onRoleChange={handleRoleChange}
                  error={errors?.role}
                />

                {/* Dynamic Form Fields */}
                {selectedRole === 'student' && (
                  <StudentLoginForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    errors={errors}
                  />
                )}

                {selectedRole && selectedRole !== 'student' && (
                  <StaffLoginForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    errors={errors}
                    userRole={selectedRole}
                  />
                )}

                {/* Admin Captcha */}
                {selectedRole === 'admin' && (
                  <AdminCaptcha
                    onCaptchaVerify={setCaptchaVerified}
                    error={errors?.captcha}
                  />
                )}

                {/* General Error */}
                {errors?.general && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-destructive" />
                      <span className="text-sm text-destructive">{errors?.general}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  loading={isLoading}
                  disabled={!selectedRole}
                  className="w-full"
                  iconName="LogIn"
                  iconPosition="left"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* QR Code Login for Students */}
                {selectedRole === 'student' && (
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-3">Or use quick login</div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowQRScanner(true)}
                      iconName="QrCode"
                      iconPosition="left"
                      className="w-full"
                    >
                      Scan Student ID Card
                    </Button>
                  </div>
                )}

                {/* Forgot Password */}
                {selectedRole && selectedRole !== 'student' && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-primary hover:text-primary/80 micro-interaction"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>© {new Date()?.getFullYear()} Smart Outpass System. All rights reserved.</p>
          </div>
        </div>
      </main>
      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onScanSuccess={handleQRScanSuccess}
          onClose={() => setShowQRScanner(false)}
        />
      )}
      {/* Quick Help Chatbot */}
      <QuickHelpChatbot />
    </div>
  );
};

export default MultiRoleAuthenticationLogin;