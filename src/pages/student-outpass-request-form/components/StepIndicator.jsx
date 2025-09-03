import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full bg-card border-b border-border p-4 mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === steps?.length - 1;

            return (
              <React.Fragment key={step?.id}>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 micro-interaction ${
                    isCompleted 
                      ? 'bg-success border-success text-success-foreground' 
                      : isActive 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-background border-border text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{stepNumber}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step?.description}
                    </div>
                  </div>
                </div>
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Mobile step title */}
        <div className="mt-4 sm:hidden text-center">
          <div className="text-sm font-medium text-foreground">
            {steps?.[currentStep - 1]?.title}
          </div>
          <div className="text-xs text-muted-foreground">
            Step {currentStep} of {steps?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;