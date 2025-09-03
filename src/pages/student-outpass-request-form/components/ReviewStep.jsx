import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReviewStep = ({ formData, setCurrentStep, errors }) => {
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Not specified';
    const date = new Date(dateTimeString);
    return date?.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateDuration = () => {
    if (!formData?.leaveInformation?.departureDateTime || !formData?.leaveInformation?.returnDateTime) {
      return 'Not calculated';
    }
    const departure = new Date(formData.leaveInformation.departureDateTime);
    const returnDate = new Date(formData.leaveInformation.returnDateTime);
    const diffTime = Math.abs(returnDate - departure);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  };

  const getReasonLabel = (value) => {
    const reasons = {
      medical: 'Medical Emergency',
      family: 'Family Emergency',
      personal: 'Personal Work',
      academic: 'Academic Purpose',
      interview: 'Job Interview',
      other: 'Other'
    };
    return reasons?.[value] || value;
  };

  const reviewSections = [
    {
      id: 'basic',
      title: 'Personal Information',
      icon: 'User',
      step: 1,
      data: [
        { label: 'Full Name', value: formData?.basicDetails?.fullName },
        { label: 'Register Number', value: formData?.basicDetails?.registerNumber },
        { label: 'Mobile Number', value: formData?.basicDetails?.mobileNumber },
        { label: 'Email Address', value: formData?.basicDetails?.email },
        { label: 'Department', value: formData?.basicDetails?.department },
        { label: 'Year/Semester', value: formData?.basicDetails?.yearSemester },
        { 
          label: 'Current Address', 
          value: `${formData?.basicDetails?.addressLine1}${formData?.basicDetails?.addressLine2 ? ', ' + formData?.basicDetails?.addressLine2 : ''}, ${formData?.basicDetails?.city}, ${formData?.basicDetails?.state} - ${formData?.basicDetails?.pinCode}` 
        }
      ]
    },
    {
      id: 'leave',
      title: 'Leave Information',
      icon: 'Calendar',
      step: 2,
      data: [
        { label: 'Departure', value: formatDateTime(formData?.leaveInformation?.departureDateTime) },
        { label: 'Return', value: formatDateTime(formData?.leaveInformation?.returnDateTime) },
        { label: 'Duration', value: calculateDuration() },
        { label: 'Destination', value: formData?.leaveInformation?.destinationAddress },
        { label: 'Destination City', value: formData?.leaveInformation?.destinationCity },
        { label: 'Contact at Destination', value: formData?.leaveInformation?.destinationContact },
        { label: 'Reason Category', value: getReasonLabel(formData?.leaveInformation?.reasonCategory) },
        { label: 'Detailed Purpose', value: formData?.leaveInformation?.detailedPurpose }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency Contacts',
      icon: 'Phone',
      step: 3,
      data: [
        { label: 'Parent/Guardian', value: `${formData?.emergencyContacts?.parentName} (${formData?.emergencyContacts?.parentRelationship})` },
        { label: 'Parent Mobile', value: formData?.emergencyContacts?.parentMobile },
        { label: 'Parent Email', value: formData?.emergencyContacts?.parentEmail || 'Not provided' },
        { label: 'Local Guardian', value: formData?.emergencyContacts?.localGuardianName || 'Not provided' },
        { label: 'Local Guardian Mobile', value: formData?.emergencyContacts?.localGuardianMobile || 'Not provided' },
        { label: 'Alternate Contacts', value: `${formData?.emergencyContacts?.alternateContacts?.length} contact(s) added` }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="FileCheck" size={24} color="white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Review Your Request</h2>
            <p className="text-muted-foreground">Please verify all information before submitting</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Duration</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{calculateDuration()}</p>
          </div>

          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Destination</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{formData?.leaveInformation?.destinationCity || 'Not specified'}</p>
          </div>

          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="FileText" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Documents</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{formData?.documents?.length} file(s)</p>
          </div>
        </div>
      </div>
      {/* Review Sections */}
      {reviewSections?.map((section) => (
        <div key={section?.id} className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={section?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{section?.title}</h3>
                <p className="text-sm text-muted-foreground">Step {section?.step} information</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(section?.step)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section?.data?.map((item, index) => (
              <div key={index} className="space-y-1">
                <dt className="text-sm font-medium text-muted-foreground">{item?.label}</dt>
                <dd className="text-sm text-foreground break-words">{item?.value || 'Not provided'}</dd>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Documents Section */}
      {formData?.documents?.length > 0 && (
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Paperclip" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Supporting Documents</h3>
              <p className="text-sm text-muted-foreground">{formData?.documents?.length} document(s) attached</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData?.documents?.map((doc) => (
              <div key={doc?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-background rounded flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(doc?.size / 1024 / 1024)?.toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Important Notes */}
      <div className="bg-warning/10 border border-warning/20 p-6 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Important Notes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure all information is accurate and complete</li>
              <li>• Your request will be reviewed by faculty and warden</li>
              <li>• You will receive notifications about approval status</li>
              <li>• Keep your mobile phone accessible for verification</li>
              <li>• Submit your request at least 24 hours in advance</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Validation Errors */}
      {Object.keys(errors)?.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="XCircle" size={20} className="text-destructive mt-0.5" />
            <div>
              <h4 className="font-medium text-destructive mb-2">Please fix the following errors:</h4>
              <ul className="text-sm text-destructive space-y-1">
                {Object.entries(errors)?.map(([field, error]) => (
                  <li key={field}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;