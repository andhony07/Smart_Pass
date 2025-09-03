import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentUpload = ({ formData, setFormData, errors }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFiles = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray?.forEach(file => {
      if (!allowedTypes?.includes(file?.type)) {
        alert(`File type ${file?.type} is not supported. Please upload PDF, DOC, DOCX, JPG, or PNG files.`);
        return;
      }

      if (file?.size > maxFileSize) {
        alert(`File ${file?.name} is too large. Maximum size is 5MB.`);
        return;
      }

      validFiles?.push({
        id: Date.now() + Math.random(),
        file: file,
        name: file?.name,
        size: file?.size,
        type: file?.type,
        uploadProgress: 0,
        uploaded: false
      });
    });

    if (validFiles?.length > 0) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev?.documents, ...validFiles]
      }));

      // Simulate upload progress
      validFiles?.forEach(fileObj => {
        simulateUpload(fileObj?.id);
      });
    }
  };

  const simulateUpload = (fileId) => {
    const interval = setInterval(() => {
      setFormData(prev => ({
        ...prev,
        documents: prev?.documents?.map(doc => {
          if (doc?.id === fileId) {
            const newProgress = Math.min(doc?.uploadProgress + 10, 100);
            return {
              ...doc,
              uploadProgress: newProgress,
              uploaded: newProgress === 100
            };
          }
          return doc;
        })
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
  };

  const removeFile = (fileId) => {
    setFormData(prev => ({
      ...prev,
      documents: prev?.documents?.filter(doc => doc?.id !== fileId)
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('image')) return 'Image';
    if (type?.includes('word') || type?.includes('document')) return 'FileText';
    return 'File';
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Upload" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Supporting Documents</h3>
          <p className="text-sm text-muted-foreground">Upload relevant documents to support your request</p>
        </div>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              Drop files here or click to browse
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB each)
            </p>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Choose Files
            </Button>
          </div>
        </div>
      </div>
      {/* Document Types Guide */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Recommended Documents:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Medical certificates (for medical leave)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Invitation letters (for events)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Travel tickets (for family visits)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Interview call letters</span>
          </div>
        </div>
      </div>
      {/* Uploaded Files */}
      {formData?.documents?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-foreground mb-4">Uploaded Documents ({formData?.documents?.length})</h4>
          <div className="space-y-3">
            {formData?.documents?.map((doc) => (
              <div key={doc?.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg bg-background">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getFileIcon(doc?.type)} size={16} className="text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">{doc?.name}</p>
                    <div className="flex items-center space-x-2">
                      {doc?.uploaded ? (
                        <div className="flex items-center space-x-1 text-success">
                          <Icon name="CheckCircle" size={16} />
                          <span className="text-xs">Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-primary">
                          <Icon name="Upload" size={16} />
                          <span className="text-xs">{doc?.uploadProgress}%</span>
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(doc?.id)}
                        iconName="Trash2"
                        className="text-destructive hover:text-destructive/80"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{formatFileSize(doc?.size)}</p>
                    {!doc?.uploaded && (
                      <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${doc?.uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {errors?.documents && (
        <p className="mt-2 text-sm text-destructive">{errors?.documents}</p>
      )}
    </div>
  );
};

export default DocumentUpload;