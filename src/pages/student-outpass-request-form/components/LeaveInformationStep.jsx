import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LeaveInformationStep = ({ formData, setFormData, errors }) => {
  const [showMap, setShowMap] = useState(false);

  const reasonOptions = [
    { value: 'medical', label: 'Medical Emergency', description: 'Health-related issues requiring immediate attention' },
    { value: 'family', label: 'Family Emergency', description: 'Urgent family matters or emergencies' },
    { value: 'personal', label: 'Personal Work', description: 'Personal appointments or tasks' },
    { value: 'academic', label: 'Academic Purpose', description: 'Educational activities, conferences, or seminars' },
    { value: 'interview', label: 'Job Interview', description: 'Employment interviews or career opportunities' },
    { value: 'other', label: 'Other', description: 'Please specify in the purpose field' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      leaveInformation: {
        ...prev?.leaveInformation,
        [field]: value
      }
    }));
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now?.getFullYear();
    const month = String(now?.getMonth() + 1)?.padStart(2, '0');
    const day = String(now?.getDate())?.padStart(2, '0');
    const hours = String(now?.getHours())?.padStart(2, '0');
    const minutes = String(now?.getMinutes())?.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getMinDateTime = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    const year = tomorrow?.getFullYear();
    const month = String(tomorrow?.getMonth() + 1)?.padStart(2, '0');
    const day = String(tomorrow?.getDate())?.padStart(2, '0');
    return `${year}-${month}-${day}T00:00`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Leave Duration</h3>
            <p className="text-sm text-muted-foreground">Specify your departure and return times</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Departure Date & Time"
            type="datetime-local"
            value={formData?.leaveInformation?.departureDateTime}
            onChange={(e) => handleInputChange('departureDateTime', e?.target?.value)}
            error={errors?.departureDateTime}
            required
            min={getMinDateTime()}
            description="Minimum 24 hours advance notice required"
          />

          <Input
            label="Return Date & Time"
            type="datetime-local"
            value={formData?.leaveInformation?.returnDateTime}
            onChange={(e) => handleInputChange('returnDateTime', e?.target?.value)}
            error={errors?.returnDateTime}
            required
            min={formData?.leaveInformation?.departureDateTime || getMinDateTime()}
            description="Expected return date and time"
          />
        </div>

        {formData?.leaveInformation?.departureDateTime && formData?.leaveInformation?.returnDateTime && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>
                Duration: {Math.ceil((new Date(formData.leaveInformation.returnDateTime) - new Date(formData.leaveInformation.departureDateTime)) / (1000 * 60 * 60 * 24))} day(s)
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Destination Details</h3>
            <p className="text-sm text-muted-foreground">Where will you be during the leave period</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Destination Address"
            type="text"
            value={formData?.leaveInformation?.destinationAddress}
            onChange={(e) => handleInputChange('destinationAddress', e?.target?.value)}
            error={errors?.destinationAddress}
            required
            placeholder="Complete address where you'll be staying"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              type="text"
              value={formData?.leaveInformation?.destinationCity}
              onChange={(e) => handleInputChange('destinationCity', e?.target?.value)}
              error={errors?.destinationCity}
              required
              placeholder="Destination city"
            />

            <Input
              label="Contact Number at Destination"
              type="tel"
              value={formData?.leaveInformation?.destinationContact}
              onChange={(e) => handleInputChange('destinationContact', e?.target?.value)}
              error={errors?.destinationContact}
              required
              placeholder="Reachable contact number"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">View location on map</span>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="text-primary hover:text-primary/80 text-sm font-medium micro-interaction"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>

          {showMap && (
            <div className="h-64 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Destination Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=28.6139,77.2090&z=14&output=embed"
                className="border-0"
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Purpose of Leave</h3>
            <p className="text-sm text-muted-foreground">Provide detailed reason for your outpass request</p>
          </div>
        </div>

        <div className="space-y-4">
          <Select
            label="Reason Category"
            placeholder="Select the primary reason for leave"
            options={reasonOptions}
            value={formData?.leaveInformation?.reasonCategory}
            onChange={(value) => handleInputChange('reasonCategory', value)}
            error={errors?.reasonCategory}
            required
            searchable
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Detailed Purpose <span className="text-destructive">*</span>
            </label>
            <textarea
              value={formData?.leaveInformation?.detailedPurpose}
              onChange={(e) => handleInputChange('detailedPurpose', e?.target?.value)}
              placeholder="Provide a detailed explanation of your leave purpose. Include specific details that justify your request."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              required
            />
            {errors?.detailedPurpose && (
              <p className="mt-1 text-sm text-destructive">{errors?.detailedPurpose}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              Minimum 50 characters required. Be specific and honest in your explanation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveInformationStep;