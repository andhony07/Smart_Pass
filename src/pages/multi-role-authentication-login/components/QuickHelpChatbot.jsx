import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickHelpChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello! I'm here to help you with login issues. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);

  const quickHelp = [
    {
      question: "Forgot my password",
      answer: `Click on 'Forgot Password' link below the login form. You'll receive reset instructions via email.`
    },
    {
      question: "Can\'t find my role",
      answer: `Please select your role from the dropdown:\n• Student - For outpass requests\n• Faculty - For approving requests\n• Warden - For hostel management\n• HOD - For department oversight\n• Admin - For system management`
    },
    {
      question: "QR code not working",
      answer: `Ensure your student ID card QR code is clean and well-lit. Try holding it steady within the scanning frame.`
    },
    {
      question: "Account locked",
      answer: `After multiple failed attempts, accounts are temporarily locked for security. Please wait 15 minutes or contact your administrator.`
    }
  ];

  const handleQuickHelp = (item) => {
    const userMessage = {
      id: messages?.length + 1,
      type: 'user',
      content: item?.question,
      timestamp: new Date()
    };

    const botMessage = {
      id: messages?.length + 2,
      type: 'bot',
      content: item?.answer,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 left-6 z-900">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          iconName={isOpen ? "X" : "MessageCircle"}
          className="w-12 h-12 rounded-full institutional-shadow-lg"
          title="Quick Help"
        />
      </div>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 w-80 max-w-[calc(100vw-3rem)] bg-card border border-border rounded-lg institutional-shadow-lg z-1000">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Quick Help</h3>
                <p className="text-xs text-muted-foreground">Login assistance</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="whitespace-pre-line">{message?.content}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help Options */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">Quick Help Topics:</div>
            <div className="space-y-1">
              {quickHelp?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickHelp(item)}
                  className="w-full text-left text-xs p-2 rounded hover:bg-muted micro-interaction"
                >
                  {item?.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickHelpChatbot;