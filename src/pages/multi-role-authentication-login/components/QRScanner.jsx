import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QRScanner = ({ onScanSuccess, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate QR scan process
    setTimeout(() => {
      setIsScanning(false);
      onScanSuccess({
        studentId: 'STU2025001',
        name: 'John Doe',
        registerNumber: 'REG2025001'
      });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card p-6 rounded-lg institutional-shadow-lg max-w-sm w-full">
        <div className="text-center">
          <div className="w-48 h-48 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center relative overflow-hidden">
            {isScanning ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-primary rounded-lg animate-pulse">
                  <div className="w-full h-0.5 bg-primary absolute top-1/2 left-0 animate-bounce"></div>
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-border rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-medium mb-2">
            {isScanning ? 'Scanning...' : 'Scan Student ID Card'}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {isScanning 
              ? 'Please hold your ID card steady' :'Position your student ID card QR code within the frame'
            }
          </p>

          <div className="space-y-3">
            {!isScanning ? (
              <Button
                onClick={handleStartScan}
                iconName="Camera"
                iconPosition="left"
                className="w-full"
              >
                Start Scanning
              </Button>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-primary">
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span className="text-sm">Scanning in progress...</span>
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isScanning}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;