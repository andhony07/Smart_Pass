import React from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentLoginForm = ({ formData, onInputChange, errors }) => {
  return (
    <div className="space-y-4">
      <div className="form-field-reveal">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => onInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '100ms' }}>
        <Input
          label="Register Number"
          type="text"
          placeholder="Enter your register number"
          value={formData?.registerNumber}
          onChange={(e) => onInputChange('registerNumber', e?.target?.value)}
          error={errors?.registerNumber}
          required
          className="font-mono"
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '200ms' }}>
        <Input
          label="Mobile Number"
          type="tel"
          placeholder="Enter your mobile number"
          value={formData?.mobileNumber}
          onChange={(e) => onInputChange('mobileNumber', e?.target?.value)}
          error={errors?.mobileNumber}
          required
          maxLength={10}
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '300ms' }}>
        <Input
          label="Official Email ID"
          type="email"
          placeholder="Enter your official email"
          value={formData?.email}
          onChange={(e) => onInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '400ms' }}>
        <Input
          label="Parent's Name"
          type="text"
          placeholder="Enter parent's name"
          value={formData?.parentName}
          onChange={(e) => onInputChange('parentName', e?.target?.value)}
          error={errors?.parentName}
          required
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '500ms' }}>
        <Input
          label="Parent's Mobile Number"
          type="tel"
          placeholder="Enter parent's mobile number"
          value={formData?.parentMobile}
          onChange={(e) => onInputChange('parentMobile', e?.target?.value)}
          error={errors?.parentMobile}
          required
          maxLength={10}
        />
      </div>
      <div className="form-field-reveal" style={{ animationDelay: '600ms' }}>
        <Checkbox
          label="I agree to the Terms & Conditions"
          checked={formData?.termsAccepted}
          onChange={(e) => onInputChange('termsAccepted', e?.target?.checked)}
          error={errors?.termsAccepted}
          required
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default StudentLoginForm;