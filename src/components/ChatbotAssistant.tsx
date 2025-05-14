
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your interview preparation assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);

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
      // Send message to API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });
      
      const data = await response.json();
      
      // Handle API key not configured response
      if (data.message && data.message.includes("API key not configured")) {
        console.log("OpenAI API Key needs to be configured:");
        console.log("1. Create a .env file in the python_backend directory");
        console.log("2. Add this line: OPENAI_API_KEY=your_openai_api_key_here");
        console.log("3. Restart the Flask server");
        
        toast({
          title: "API Key Missing",
          description: "OpenAI API key is not configured. Check the console for instructions on how to set it up.",
          variant: "destructive"
        });
      }
      
      // Add bot response
      const botMessage: Message = {
        id: messages.length + 2,
        text: data.message,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from the assistant. Please try again.",
        variant: "destructive"
      });
      
      // Fallback to static responses if API fails
      const fallbackResponse = getBotResponse(inputMessage);
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
        <Card className="w-80 sm:w-96 h-96 flex flex-col shadow-xl border-2 border-purple-200 animate-scale-in">
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
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-purple-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs font-semibold">
                        {message.sender === 'user' ? 'You' : 'Assistant'}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
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
          
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isLoading}
                className={isLoading ? "opacity-50" : ""}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
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
