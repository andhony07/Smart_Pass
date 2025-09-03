import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BasicDetailsStep = ({ formData, setFormData, errors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      basicDetails: {
        ...prev?.basicDetails,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            <p className="text-sm text-muted-foreground">Verify and update your details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            value={formData?.basicDetails?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
            disabled
            description="This field is pre-filled from your profile"
          />

          <Input
            label="Register Number"
            type="text"
            value={formData?.basicDetails?.registerNumber}
            onChange={(e) => handleInputChange('registerNumber', e?.target?.value)}
            error={errors?.registerNumber}
            required
            disabled
            description="Your student registration number"
          />

          <Input
            label="Mobile Number"
            type="tel"
            value={formData?.basicDetails?.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e?.target?.value)}
            error={errors?.mobileNumber}
            required
            placeholder="Enter your mobile number"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.basicDetails?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            disabled
            description="Your official email address"
          />

          <Input
            label="Department"
            type="text"
            value={formData?.basicDetails?.department}
            onChange={(e) => handleInputChange('department', e?.target?.value)}
            error={errors?.department}
            required
            disabled
          />

          <Input
            label="Year/Semester"
            type="text"
            value={formData?.basicDetails?.yearSemester}
            onChange={(e) => handleInputChange('yearSemester', e?.target?.value)}
            error={errors?.yearSemester}
            required
            disabled
          />
        </div>
      </div>
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Current Address</h3>
            <p className="text-sm text-muted-foreground">Your current residential address</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Address Line 1"
            type="text"
            value={formData?.basicDetails?.addressLine1}
            onChange={(e) => handleInputChange('addressLine1', e?.target?.value)}
            error={errors?.addressLine1}
            required
            placeholder="House/Flat number, Street name"
          />

          <Input
            label="Address Line 2"
            type="text"
            value={formData?.basicDetails?.addressLine2}
            onChange={(e) => handleInputChange('addressLine2', e?.target?.value)}
            placeholder="Locality, Landmark (Optional)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              type="text"
              value={formData?.basicDetails?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              error={errors?.city}
              required
              placeholder="Enter city"
            />

            <Input
              label="State"
              type="text"
              value={formData?.basicDetails?.state}
              onChange={(e) => handleInputChange('state', e?.target?.value)}
              error={errors?.state}
              required
              placeholder="Enter state"
            />

            <Input
              label="PIN Code"
              type="text"
              value={formData?.basicDetails?.pinCode}
              onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
              error={errors?.pinCode}
              required
              placeholder="6-digit PIN code"
              maxLength={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsStep;