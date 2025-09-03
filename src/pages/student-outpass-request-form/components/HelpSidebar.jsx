import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSidebar = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('process');

  const helpSections = {
    process: {
      title: 'Approval Process',
      icon: 'GitBranch',
      content: [
        {
          step: 1,
          title: 'Submit Request',
          description: 'Complete and submit your outpass form with required documents',
          status: 'current'
        },
        {
          step: 2,
          title: 'Faculty Review',
          description: 'Your class teacher/HOD reviews the request',
          status: 'pending',
          duration: '2-4 hours'
        },
        {
          step: 3,
          title: 'Warden Approval',
          description: 'Hostel warden provides final approval',
          status: 'pending',
          duration: '1-2 hours'
        },
        {
          step: 4,
          title: 'Notification',
          description: 'You receive approval notification via SMS/email',
          status: 'pending'
        }
      ]
    },
    documents: {
      title: 'Required Documents',
      icon: 'FileText',
      content: [
        {
          category: 'Medical Leave',
          documents: ['Medical certificate from registered doctor', 'Prescription (if applicable)', 'Hospital discharge summary (if admitted)']
        },
        {
          category: 'Family Emergency',
          documents: ['Family member ID proof', 'Medical certificate (if medical emergency)', 'Travel tickets/booking confirmation']
        },
        {
          category: 'Academic Purpose',
          documents: ['Event invitation/registration', 'College/university authorization letter', 'Travel itinerary']
        },
        {
          category: 'Job Interview',
          documents: ['Interview call letter', 'Company communication', 'Travel booking confirmation']
        }
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      icon: 'HelpCircle',
      content: [
        {
          question: 'How much advance notice is required?',
          answer: 'Minimum 24 hours advance notice is required for all outpass requests, except medical emergencies.'
        },
        {
          question: 'Can I modify my request after submission?',
          answer: 'You can modify your request only if it hasn\'t been approved yet. Contact your faculty advisor for changes.'
        },
        {
          question: 'What if my request is rejected?',
          answer: 'You will receive a notification with the reason for rejection. You can resubmit with additional information.'
        },
        {
          question: 'How will I know when it\'s approved?',
          answer: 'You will receive SMS and email notifications. You can also check status in your dashboard.'
        },
        {
          question: 'What if I need to extend my leave?',
          answer: 'Submit a new request for extension before your current outpass expires.'
        }
      ]
    },
    tips: {
      title: 'Helpful Tips',
      icon: 'Lightbulb',
      content: [
        {
          tip: 'Be Specific',
          description: 'Provide detailed and honest reasons for your leave request'
        },
        {
          tip: 'Upload Clear Documents',
          description: 'Ensure all uploaded documents are clear and readable'
        },
        {
          tip: 'Emergency Contacts',
          description: 'Keep your emergency contact information updated and accessible'
        },
        {
          tip: 'Plan Ahead',
          description: 'Submit requests well in advance to avoid last-minute issues'
        },
        {
          tip: 'Stay Reachable',
          description: 'Keep your mobile phone on and accessible during the approval process'
        }
      ]
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Help & Guidelines</h3>
        <p className="text-sm text-muted-foreground">Everything you need to know about outpass requests</p>
      </div>
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(helpSections)?.map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium micro-transition ${
              activeSection === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            <span className="hidden sm:inline">{section?.title}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="space-y-4">
        {activeSection === 'process' && (
          <div className="space-y-4">
            {helpSections?.process?.content?.map((step) => (
              <div key={step?.step} className="flex space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step?.status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                }`}>
                  {step?.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{step?.title}</h4>
                  <p className="text-sm text-muted-foreground">{step?.description}</p>
                  {step?.duration && (
                    <p className="text-xs text-accent mt-1">Typical duration: {step?.duration}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'documents' && (
          <div className="space-y-4">
            {helpSections?.documents?.content?.map((category, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">{category?.category}</h4>
                <ul className="space-y-2">
                  {category?.documents?.map((doc, docIndex) => (
                    <li key={docIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="space-y-4">
            {helpSections?.faq?.content?.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">{faq?.question}</h4>
                <p className="text-sm text-muted-foreground">{faq?.answer}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="space-y-4">
            {helpSections?.tips?.content?.map((tip, index) => (
              <div key={index} className="flex space-x-3">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={16} className="text-warning" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{tip?.tip}</h4>
                  <p className="text-sm text-muted-foreground">{tip?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Contact Support */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="text-center">
          <h4 className="font-medium text-foreground mb-2">Need More Help?</h4>
          <p className="text-sm text-muted-foreground mb-4">Contact our support team for assistance</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              className="w-full"
            >
              Call: +91 98765 43210
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconPosition="left"
              className="w-full"
            >
              Email: support@college.edu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSidebar;