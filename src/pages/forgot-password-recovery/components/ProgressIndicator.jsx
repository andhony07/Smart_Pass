import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, selectedRole }) => {
  const getStepLabels = () => {
    if (selectedRole === 'student') {
      return ['Verify Identity', 'SMS Verification', 'New Password'];
    } else {
      return ['Email & Security', 'Email Verification', 'New Password'];
    }
  };

  const stepLabels = getStepLabels();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {stepLabels?.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium micro-interaction ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center max-w-20 ${
                    isActive
                      ? 'text-foreground font-medium'
                      : isCompleted
                      ? 'text-success' :'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < stepLabels?.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 role-transition ${
                    stepNumber < currentStep
                      ? 'bg-success' :'bg-border'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;