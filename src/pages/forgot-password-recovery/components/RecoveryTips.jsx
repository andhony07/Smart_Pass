import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const RecoveryTips = ({ selectedRole }) => {
  const [expandedTip, setExpandedTip] = useState(null);

  const getRecoveryTips = () => {
    if (selectedRole === 'student') {
      return [
        {
          id: 'register',
          title: 'Register Number Format',
          icon: 'Hash',
          content: `Your register number follows the format: YYDDDNNN\n• YY: Year of admission (e.g., 21, 22, 23)\n• DDD: Department code (e.g., CSE, ECE, MEC)\n• NNN: Roll number (e.g., 001, 002, 003)\n\nExample: 21CSE001, 22ECE045`
        },
        {
          id: 'mobile',
          title: 'Mobile Number Issues',
          icon: 'Smartphone',
          content: `If you're not receiving SMS:\n• Check if your mobile number is updated in college records\n• Ensure you have network coverage\n• Check spam/blocked messages\n• Contact your class coordinator for mobile number update`
        },
        {
          id: 'help',
          title: 'Need Additional Help?',
          icon: 'HelpCircle',
          content: `Contact support:\n• Visit the Computer Center during office hours\n• Email: support@college.edu\n• Phone: +91-XXXX-XXXXXX\n• Bring your ID card and admission documents`
        }
      ];
    } else {
      return [
        {
          id: 'email',
          title: 'Official Email Access',
          icon: 'Mail',
          content: `Ensure you're using your official college email:\n• Format: firstname.lastname@college.edu\n• Check your email regularly for the reset link\n• Look in spam/junk folders\n• Link expires in 15 minutes`
        },
        {
          id: 'security',
          title: 'Security Questions',
          icon: 'Shield',
          content: `Remember your security question setup:\n• Answers are case-sensitive\n• Use the exact format you provided during setup\n• Contact IT admin if you've forgotten your security question\n• Questions were set during your account creation`
        },
        {
          id: 'admin',
          title: 'Administrative Support',
          icon: 'Users',
          content: `For immediate assistance:\n• Contact IT Administrator: admin@college.edu\n• Visit IT Office: Room 101, Admin Block\n• Phone: +91-XXXX-XXXXXX (Ext: 101)\n• Office Hours: 9:00 AM - 5:00 PM`
        }
      ];
    }
  };

  const tips = getRecoveryTips();

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Lightbulb" size={20} className="text-warning" />
        <h3 className="text-lg font-medium text-foreground">Recovery Tips</h3>
      </div>
      {tips?.map((tip) => (
        <div key={tip?.id} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleTip(tip?.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted micro-interaction"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={tip?.icon} size={16} className="text-primary" />
              </div>
              <span className="font-medium text-foreground">{tip?.title}</span>
            </div>
            <Icon 
              name={expandedTip === tip?.id ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </button>

          {expandedTip === tip?.id && (
            <div className="px-4 pb-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                  {tip?.content}
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <Icon name="Clock" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Recovery Process Time</h4>
            <p className="text-sm text-blue-700 mt-1">
              The entire password recovery process typically takes 2-5 minutes. 
              Verification codes expire after 10 minutes for security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryTips;