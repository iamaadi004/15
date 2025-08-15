import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2 } from 'lucide-react';

interface FloatingAgentButtonProps {
  isVisible: boolean;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const FloatingAgentButton: React.FC<FloatingAgentButtonProps> = ({ isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Anjura, your AI assistant. How can I help you with your warranty claims today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('claim') && message.includes('status')) {
      return 'To check your claim status, please provide your claim ID (starting with WC-). You can also track it in real-time through your dashboard.';
    }
    
    if (message.includes('warranty') && (message.includes('expired') || message.includes('expire'))) {
      return 'Don\'t worry! Even if your warranty appears expired, we can help verify the exact coverage dates. Many products have extended manufacturer warranties you might not be aware of.';
    }
    
    if (message.includes('submit') || message.includes('file')) {
      return 'To submit a warranty claim, you\'ll need: 1) Purchase receipt, 2) Product photos showing the issue, 3) Serial number, 4) Description of the problem. Would you like me to guide you through the process?';
    }
    
    if (message.includes('document') || message.includes('receipt')) {
      return 'For warranty claims, we accept digital receipts, email confirmations, bank statements, or photos of physical receipts. The key is having proof of purchase date and retailer.';
    }
    
    if (message.includes('how long') || message.includes('processing time')) {
      return 'Our AI processes most claims in under 2 minutes! Complex cases may take 24-48 hours. You\'ll receive real-time updates throughout the process.';
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! I\'m here to help with all your warranty questions. Whether you need to submit a claim, check status, or understand coverage, I\'ve got you covered!';
    }
    
    if (message.includes('thank')) {
      return 'You\'re welcome! I\'m always here to help make your warranty experience smooth and hassle-free. Is there anything else I can assist you with?';
    }
    
    // Default response
    return 'I understand you\'re asking about warranty claims. I can help you with submitting claims, tracking status, understanding coverage, or any other warranty-related questions. What specific information do you need?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const agentImageUrl = '/src/assets/images/AI agent/Aviator Anjura ChatBot.png';

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Chat Interface */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="fixed bottom-8 right-8 z-50 w-96 h-[500px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                      <img 
                        src={agentImageUrl} 
                        alt="Anjura AI Assistant" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = 'https://i.imgur.com/8e295gG.png';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Anjura</h3>
                      <p className="text-white/80 text-sm">AI Assistant</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.isUser 
                          ? 'bg-brand-primary text-white rounded-br-sm' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200/50">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by Claimmly AI • Always learning to serve you better
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          {!isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(true)}
              className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white/90 backdrop-blur-lg rounded-full shadow-2xl border border-white/30 cursor-pointer flex items-center justify-center p-2 group"
              aria-label="Open AI Assistant"
            >
              <img 
                src={agentImageUrl} 
                alt="Anjura AI Assistant" 
                className="w-full h-full object-contain rounded-full transition-transform group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = 'https://i.imgur.com/8e295gG.png';
                }}
              />
              
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </motion.button>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default FloatingAgentButton;
