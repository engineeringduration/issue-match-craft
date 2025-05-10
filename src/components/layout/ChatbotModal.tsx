import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { AI_CONFIG } from "@/config/api";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type ChatbotModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your contribution assistant. How can I help you find the perfect open source project to contribute to?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Handle sending message with Gemini API integration
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    try {
      // Using the API config from centralized config file
      const res = await fetch(AI_CONFIG.GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: userMessage.content }),
      });
      
      if (!res.ok) throw new Error("Failed to fetch response");
      
      const data = await res.json();    
      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        content: data.reply || "Sorry, I couldn't understand that.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        content: "Oops! Something went wrong while getting a response.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };
  
  // Handle pressing Enter to send
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 ${isExpanded ? 'w-80 sm:w-96 h-[500px]' : 'w-80 h-16'} 
        bg-card border border-border rounded-xl shadow-lg flex flex-col overflow-hidden animate-scale-in`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
            <AvatarFallback>
              <Bot className="h-4 w-4 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">Contribution Assistant</h3>
            <p className="text-xs text-muted-foreground">AI-powered help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost" 
            size="icon"
            className="h-7 w-7"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-background/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] px-3 py-2 rounded-lg ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t border-border p-3 bg-card">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about contributions..."
                className="min-h-10 max-h-32 resize-none"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim()}
                size="icon"
                className="github-button h-10 w-10 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
