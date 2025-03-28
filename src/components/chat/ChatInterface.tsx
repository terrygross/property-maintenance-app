
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, User } from "lucide-react";
import { MOCK_USERS } from "@/data/mockUsers";

// Mock messages for demonstration
export const MOCK_MESSAGES = [
  {
    id: "1",
    userId: "1",
    content: "Hi team, I need help with a heating system repair in Building A.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "2",
    userId: "2",
    content: "I'll take care of it. Will check it tomorrow morning.",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: "3",
    userId: "3",
    content: "Let me know if you need any specialized tools. I have some extras.",
    timestamp: new Date(Date.now() - 30000).toISOString(),
  },
  {
    id: "4",
    userId: "1",
    content: "Thanks everyone! Really appreciate the quick response.",
    timestamp: new Date(Date.now() - 10000).toISOString(),
  },
];

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  currentUserId: string;
  className?: string;
}

const ChatInterface = ({ currentUserId, className }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // For a real implementation, you would fetch messages from Supabase

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUserById = (userId: string) => {
    return MOCK_USERS.find((user) => user.id === userId) || null;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardContent className="flex flex-col p-0 h-full">
        <div className="px-4 py-3 border-b bg-muted/30">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Team Chat
          </h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const user = getUserById(message.userId);
              const isCurrentUser = message.userId === currentUserId;

              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    } items-start max-w-[80%]`}
                  >
                    <Avatar className="h-8 w-8 mt-1">
                      {user?.photo_url ? (
                        <AvatarImage src={user.photo_url} alt={user.first_name} />
                      ) : (
                        <AvatarFallback>
                          {user?.first_name.charAt(0)}
                          {user?.last_name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div
                      className={`mx-2 px-3 py-2 rounded-lg ${
                        isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-xs">
                          {user?.first_name} {user?.last_name}
                        </span>
                        <span className="text-xs opacity-70">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t mt-auto">
          <div className="flex items-end gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="resize-none min-h-[60px]"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              variant="default"
              size="icon"
              className="h-9 w-9"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
