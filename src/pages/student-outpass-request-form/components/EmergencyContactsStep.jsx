import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmergencyContactsStep = ({ formData, setFormData, errors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: {
        ...prev?.emergencyContacts,
        [field]: value
      }
    }));
  };

  const handleAlternateContactChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: {
        ...prev?.emergencyContacts,
        alternateContacts: prev?.emergencyContacts?.alternateContacts?.map((contact, i) =>
          i === index ? { ...contact, [field]: value } : contact
        )
      }
    }));
  };

  const addAlternateContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: {
        ...prev?.emergencyContacts,
        alternateContacts: [
          ...prev?.emergencyContacts?.alternateContacts,
          { name: '', relationship: '', mobile: '', email: '' }
        ]
      }
    }));
  };

  const removeAlternateContact = (index) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: {
        ...prev?.emergencyContacts,
        alternateContacts: prev?.emergencyContacts?.alternateContacts?.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
            <Icon name="Phone" size={20} className="text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Primary Emergency Contact</h3>
            <p className="text-sm text-muted-foreground">Parent or guardian information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Parent/Guardian Name"
            type="text"
            value={formData?.emergencyContacts?.parentName}
            onChange={(e) => handleInputChange('parentName', e?.target?.value)}
            error={errors?.parentName}
            required
            placeholder="Full name of parent/guardian"
          />

          <Input
            label="Relationship"
            type="text"
            value={formData?.emergencyContacts?.parentRelationship}
            onChange={(e) => handleInputChange('parentRelationship', e?.target?.value)}
            error={errors?.parentRelationship}
            required
            placeholder="Father, Mother, Guardian, etc."
          />

          <Input
            label="Mobile Number"
            type="tel"
            value={formData?.emergencyContacts?.parentMobile}
            onChange={(e) => handleInputChange('parentMobile', e?.target?.value)}
            error={errors?.parentMobile}
            required
            placeholder="Primary contact number"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.emergencyContacts?.parentEmail}
            onChange={(e) => handleInputChange('parentEmail', e?.target?.value)}
            error={errors?.parentEmail}
            placeholder="Parent/guardian email (optional)"
          />
        </div>
      </div>
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="UserPlus" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Local Guardian</h3>
            <p className="text-sm text-muted-foreground">Local contact person in case of emergency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Local Guardian Name"
            type="text"
            value={formData?.emergencyContacts?.localGuardianName}
            onChange={(e) => handleInputChange('localGuardianName', e?.target?.value)}
            error={errors?.localGuardianName}
            placeholder="Name of local guardian"
          />

          <Input
            label="Relationship"
            type="text"
            value={formData?.emergencyContacts?.localGuardianRelationship}
            onChange={(e) => handleInputChange('localGuardianRelationship', e?.target?.value)}
            error={errors?.localGuardianRelationship}
            placeholder="Relative, Family friend, etc."
          />

          <Input
            label="Mobile Number"
            type="tel"
            value={formData?.emergencyContacts?.localGuardianMobile}
            onChange={(e) => handleInputChange('localGuardianMobile', e?.target?.value)}
            error={errors?.localGuardianMobile}
            placeholder="Local guardian contact"
          />

          <Input
            label="Address"
            type="text"
            value={formData?.emergencyContacts?.localGuardianAddress}
            onChange={(e) => handleInputChange('localGuardianAddress', e?.target?.value)}
            error={errors?.localGuardianAddress}
            placeholder="Local guardian address"
          />
        </div>
      </div>
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Alternate Contacts</h3>
              <p className="text-sm text-muted-foreground">Additional emergency contacts (optional)</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAlternateContact}
            iconName="Plus"
            iconPosition="left"
          >
            Add Contact
          </Button>
        </div>

        {formData?.emergencyContacts?.alternateContacts?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="UserX" size={48} className="mx-auto mb-3 opacity-50" />
            <p>No alternate contacts added</p>
            <p className="text-sm">Click "Add Contact" to include additional emergency contacts</p>
          </div>
        ) : (
          <div className="space-y-6">
            {formData?.emergencyContacts?.alternateContacts?.map((contact, index) => (
              <div key={index} className="p-4 border border-border rounded-lg bg-muted/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">Contact {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAlternateContact(index)}
                    iconName="Trash2"
                    className="text-destructive hover:text-destructive/80"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    type="text"
                    value={contact?.name}
                    onChange={(e) => handleAlternateContactChange(index, 'name', e?.target?.value)}
                    placeholder="Contact person name"
                  />

                  <Input
                    label="Relationship"
                    type="text"
                    value={contact?.relationship}
                    onChange={(e) => handleAlternateContactChange(index, 'relationship', e?.target?.value)}
                    placeholder="Relationship to you"
                  />

                  <Input
                    label="Mobile Number"
                    type="tel"
                    value={contact?.mobile}
                    onChange={(e) => handleAlternateContactChange(index, 'mobile', e?.target?.value)}
                    placeholder="Contact number"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    value={contact?.email}
                    onChange={(e) => handleAlternateContactChange(index, 'email', e?.target?.value)}
                    placeholder="Email (optional)"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContactsStep;