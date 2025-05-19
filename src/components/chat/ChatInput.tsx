
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

export function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  handleSendMessage, 
  handleKeyPress,
  isLoading 
}: ChatInputProps) {
  return (
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
  );
}
