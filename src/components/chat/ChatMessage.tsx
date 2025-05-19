
import { Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
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
  );
}
