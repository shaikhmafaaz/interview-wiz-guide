import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ConnectionError } from "@/components/chat/ConnectionError";
import { apiService } from "@/services/api";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// API endpoint configuration - can be updated for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const HEALTH_ENDPOINT = `${API_BASE_URL}/health`;
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;
const REQUEST_TIMEOUT = 10000; // 10 seconds

export function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your interview preparation assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);

  // Check backend connection on first open and periodically
  useEffect(() => {
    if (isOpen) {
      checkBackendConnection();
      
      // Set up periodic health checks every 30 seconds when chat is open
      const intervalId = setInterval(() => {
        if (isOpen) {
          checkBackendConnection(false); // Silent check
        }
      }, 30000);
      
      // Clean up interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [isOpen]);

  const checkBackendConnection = useCallback(async (showToast = true) => {
    if (isCheckingConnection) return;
    
    setIsCheckingConnection(true);
    try {
      console.log("Checking backend connection...");
      
      // Use apiService for health check
      const result = await apiService.checkHealth();
      
      if (result.success) {
        console.log("Backend connection successful");
        // Only show toast if we're coming back from an error state
        if (backendError && showToast) {
          toast({
            title: "Connection Restored",
            description: "Successfully connected to the backend server.",
            variant: "default"
          });
        }
        setBackendError(false);
      } else {
        console.error("Backend health check failed:", result.message);
        setBackendError(true);
      }
    } catch (error) {
      console.error("Backend connection error:", error);
      setBackendError(true);
    } finally {
      setIsCheckingConnection(false);
    }
  }, [isCheckingConnection, backendError, toast]);

  const retryConnection = useCallback(() => {
    checkBackendConnection();
  }, [checkBackendConnection]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Use apiService to send message
      const result = await apiService.sendChatMessage(userMessage.text);
      
      if (result.success) {
        setBackendError(false);
        
        // Add bot response
        const botMessage: Message = {
          id: messages.length + 2,
          text: result.message,
          sender: 'bot'
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        console.error("Failed to get chat response:", result.message);
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Check if it's a connection error and set state accordingly
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("Failed to fetch") || 
          errorMessage.includes("NetworkError") || 
          errorMessage.includes("unavailable") ||
          errorMessage.includes("abort")) {
        setBackendError(true);
      }
      
      // Fallback to static responses if API fails
      const fallbackResponse = getBotResponse(userMessage.text);
      const botMessage: Message = {
        id: messages.length + 2,
        text: fallbackResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! How can I help with your interview preparation today?";
    }
    
    if (lowerMessage.includes("help")) {
      return "I can help you prepare for interviews by explaining how to use the question generator, providing interview tips, or answering questions about the interview process. What would you like to know?";
    }
    
    if (lowerMessage.includes("tip") || lowerMessage.includes("advice")) {
      return "Here's a tip: Before your interview, research the company thoroughly. Prepare stories about your experiences that demonstrate your skills. And don't forget to prepare questions to ask the interviewer!";
    }
    
    if (lowerMessage.includes("common question") || lowerMessage.includes("frequently asked")) {
      return "Some common interview questions include: 'Tell me about yourself', 'What are your strengths and weaknesses?', 'Why do you want to work here?', and 'Where do you see yourself in 5 years?'";
    }
    
    if (lowerMessage.includes("nervous") || lowerMessage.includes("anxiety")) {
      return "It's normal to feel nervous before interviews! Try deep breathing exercises, visualize success, and remember that interviews are conversations, not interrogations. Practice with friends can also help reduce anxiety.";
    }
    
    if (lowerMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    if (lowerMessage.includes("how to use") || lowerMessage.includes("how does this work")) {
      return "To use the Interview Questions Generator, select a job role and experience level, then click 'Generate Questions'. The system will create relevant questions based on your selection. You can copy individual questions to clipboard for your preparation.";
    }
    
    if (lowerMessage.includes("experience level") || lowerMessage.includes("fresher") || lowerMessage.includes("experienced")) {
      return "The 'Fresher' level is for candidates with 0-2 years of experience, while 'Experienced' is for candidates with 3+ years of experience. The questions are adjusted to be appropriate for each level.";
    }
    
    return "I'm not sure I understand. Could you rephrase your question? I can help with interview preparation, explain how to use this tool, or provide general interview tips.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[450px] flex flex-col shadow-xl border-2 border-purple-200 animate-scale-in">
          <div className="bg-purple-500 text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">Interview Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-purple-600">
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-2 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-semibold">Assistant</span>
                    </div>
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {backendError && (
            <div className="px-3">
              <ConnectionError 
                onRetry={retryConnection} 
                isChecking={isCheckingConnection} 
              />
            </div>
          )}
          
          <div className="p-3 border-t">
            <ChatInput 
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
              isLoading={isLoading || backendError}
            />
          </div>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full p-3 h-14 w-14 bg-purple-500 hover:bg-purple-600 shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
