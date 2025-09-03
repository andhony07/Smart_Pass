import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleAdaptiveNavbar from '../../components/ui/RoleAdaptiveNavbar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StepIndicator from './components/StepIndicator';
import BasicDetailsStep from './components/BasicDetailsStep';
import LeaveInformationStep from './components/LeaveInformationStep';
import EmergencyContactsStep from './components/EmergencyContactsStep';
import DocumentUpload from './components/DocumentUpload';
import ReviewStep from './components/ReviewStep';
import HelpSidebar from './components/HelpSidebar';

const StudentOutpassRequestForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Basic Details', description: 'Personal information' },
    { id: 2, title: 'Leave Information', description: 'Duration and purpose' },
    { id: 3, title: 'Emergency Contacts', description: 'Contact information' },
    { id: 4, title: 'Review', description: 'Verify and submit' }
  ];

  const [formData, setFormData] = useState({
    basicDetails: {
      fullName: 'Rajesh Kumar',
      registerNumber: 'CS21B1001',
      mobileNumber: '9876543210',
      email: 'rajesh.kumar@college.edu',
      department: 'Computer Science Engineering',
      yearSemester: '3rd Year, 5th Semester',
      addressLine1: 'Room 205, Hostel Block A',
      addressLine2: 'College Campus',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600036'
    },
    leaveInformation: {
      departureDateTime: '',
      returnDateTime: '',
      destinationAddress: '',
      destinationCity: '',
      destinationContact: '',
      reasonCategory: '',
      detailedPurpose: ''
    },
    emergencyContacts: {
      parentName: 'Suresh Kumar',
      parentRelationship: 'Father',
      parentMobile: '9876543211',
      parentEmail: 'suresh.kumar@email.com',
      localGuardianName: '',
      localGuardianRelationship: '',
      localGuardianMobile: '',
      localGuardianAddress: '',
      alternateContacts: []
    },
    documents: []
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      saveDraft();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSave);
  }, [formData]);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('outpass_draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft?.formData);
        setCurrentStep(parsedDraft?.currentStep || 1);
        setLastSaved(new Date(parsedDraft.timestamp));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const saveDraft = async () => {
    setIsDraftSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const draftData = {
        formData,
        currentStep,
        timestamp: new Date()?.toISOString()
      };
      localStorage.setItem('outpass_draft', JSON.stringify(draftData));
      setLastSaved(new Date());
      setIsDraftSaving(false);
    }, 500);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.basicDetails?.fullName) newErrors.fullName = 'Full name is required';
        if (!formData?.basicDetails?.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
        if (!formData?.basicDetails?.addressLine1) newErrors.addressLine1 = 'Address is required';
        if (!formData?.basicDetails?.city) newErrors.city = 'City is required';
        if (!formData?.basicDetails?.state) newErrors.state = 'State is required';
        if (!formData?.basicDetails?.pinCode) newErrors.pinCode = 'PIN code is required';
        else if (!/^\d{6}$/?.test(formData?.basicDetails?.pinCode)) newErrors.pinCode = 'Invalid PIN code';
        break;

      case 2:
        if (!formData?.leaveInformation?.departureDateTime) newErrors.departureDateTime = 'Departure date is required';
        if (!formData?.leaveInformation?.returnDateTime) newErrors.returnDateTime = 'Return date is required';
        if (!formData?.leaveInformation?.destinationAddress) newErrors.destinationAddress = 'Destination address is required';
        if (!formData?.leaveInformation?.destinationCity) newErrors.destinationCity = 'Destination city is required';
        if (!formData?.leaveInformation?.destinationContact) newErrors.destinationContact = 'Contact number is required';
        if (!formData?.leaveInformation?.reasonCategory) newErrors.reasonCategory = 'Reason category is required';
        if (!formData?.leaveInformation?.detailedPurpose) newErrors.detailedPurpose = 'Detailed purpose is required';
        else if (formData?.leaveInformation?.detailedPurpose?.length < 50) newErrors.detailedPurpose = 'Purpose must be at least 50 characters';

        // Date validation
        if (formData?.leaveInformation?.departureDateTime && formData?.leaveInformation?.returnDateTime) {
          const departure = new Date(formData.leaveInformation.departureDateTime);
          const returnDate = new Date(formData.leaveInformation.returnDateTime);
          const now = new Date();
          const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

          if (departure < tomorrow) newErrors.departureDateTime = 'Departure must be at least 24 hours from now';
          if (returnDate <= departure) newErrors.returnDateTime = 'Return date must be after departure date';
        }
        break;

      case 3:
        if (!formData?.emergencyContacts?.parentName) newErrors.parentName = 'Parent/Guardian name is required';
        if (!formData?.emergencyContacts?.parentRelationship) newErrors.parentRelationship = 'Relationship is required';
        if (!formData?.emergencyContacts?.parentMobile) newErrors.parentMobile = 'Parent mobile number is required';
        else if (!/^\d{10}$/?.test(formData?.emergencyContacts?.parentMobile)) newErrors.parentMobile = 'Invalid mobile number';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps?.length) {
        setCurrentStep(currentStep + 1);
        saveDraft();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);

    // Simulate API submission
    setTimeout(() => {
      setIsLoading(false);
      // Clear draft after successful submission
      localStorage.removeItem('outpass_draft');
      
      // Show success message and redirect
      alert('Outpass request submitted successfully! You will receive a confirmation email shortly.');
      navigate('/role-based-dashboard-landing');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicDetailsStep formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return (
          <div className="space-y-6">
            <LeaveInformationStep formData={formData} setFormData={setFormData} errors={errors} />
            <DocumentUpload formData={formData} setFormData={setFormData} errors={errors} />
          </div>
        );
      case 3:
        return <EmergencyContactsStep formData={formData} setFormData={setFormData} errors={errors} />;
      case 4:
        return <ReviewStep formData={formData} setCurrentStep={setCurrentStep} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleAdaptiveNavbar userRole="student" isAuthenticated={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => navigate('/role-based-dashboard-landing')}
              className="p-2 hover:bg-muted rounded-lg micro-transition"
            >
              <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Outpass Request Form</h1>
              <p className="text-muted-foreground">Submit your leave application with required details</p>
            </div>
          </div>

          {/* Auto-save indicator */}
          {lastSaved && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name={isDraftSaving ? "Loader2" : "Check"} size={16} className={isDraftSaving ? "animate-spin" : "text-success"} />
              <span>
                {isDraftSaving ? 'Saving draft...' : `Last saved: ${lastSaved?.toLocaleTimeString()}`}
              </span>
            </div>
          )}
        </div>

        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={saveDraft}
                    loading={isDraftSaving}
                    iconName="Save"
                    iconPosition="left"
                    className="text-muted-foreground"
                  >
                    Save Draft
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  {currentStep < steps?.length ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      loading={isLoading}
                      iconName="Send"
                      iconPosition="left"
                      className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                      Submit Request
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Help Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <HelpSidebar />
            </div>
          </div>
        </div>

        {/* Mobile Help Section */}
        <div className="lg:hidden mt-8">
          <HelpSidebar />
        </div>
      </div>
      {/* Floating Save Button - Mobile */}
      <div className="fixed bottom-6 left-6 lg:hidden z-900">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={saveDraft}
          loading={isDraftSaving}
          iconName="Save"
          className="bg-card border-border institutional-shadow-lg"
          title="Save Draft"
        />
      </div>
    </div>
  );
};

export default StudentOutpassRequestForm;