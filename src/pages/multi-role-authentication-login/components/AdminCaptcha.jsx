import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AdminCaptcha = ({ onCaptchaVerify, error }) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    setCaptchaCode(result);
    setUserInput('');
    setIsVerified(false);
    onCaptchaVerify(false);
  };

  const verifyCaptcha = () => {
    const verified = userInput?.toUpperCase() === captchaCode;
    setIsVerified(verified);
    onCaptchaVerify(verified);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (userInput?.length === 6) {
      verifyCaptcha();
    }
  }, [userInput]);

  return (
    <div className="form-field-reveal" style={{ animationDelay: '450ms' }}>
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Security Verification *
        </label>
        
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-muted p-3 rounded-lg border-2 border-dashed border-border">
            <div className="text-center font-mono text-lg font-bold text-foreground tracking-wider">
              {captchaCode}
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={generateCaptcha}
            iconName="RefreshCw"
            title="Refresh Captcha"
          />
        </div>

        <Input
          type="text"
          placeholder="Enter the code above"
          value={userInput}
          onChange={(e) => setUserInput(e?.target?.value)}
          error={error}
          maxLength={6}
          className="font-mono uppercase"
        />

        {isVerified && (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm">Captcha verified successfully</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCaptcha;