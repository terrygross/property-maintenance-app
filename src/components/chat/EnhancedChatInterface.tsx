
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Users } from "lucide-react";
import { MOCK_USERS } from "@/data/mockUsers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export interface ChatMessage {
  id: string;
  userId: string;
  recipientId?: string | null; // null for team messages, userId for direct messages
  content: string;
  timestamp: string;
  isDirectMessage: boolean;
}

// Enhanced mock messages including direct messages
export const ENHANCED_MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    userId: "1",
    content: "Hi team, I need help with a heating system repair in Building A.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    isDirectMessage: false,
  },
  {
    id: "2",
    userId: "2",
    content: "I'll take care of it. Will check it tomorrow morning.",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    isDirectMessage: false,
  },
  {
    id: "3",
    userId: "3",
    content: "Let me know if you need any specialized tools. I have some extras.",
    timestamp: new Date(Date.now() - 30000).toISOString(),
    isDirectMessage: false,
  },
  {
    id: "4",
    userId: "1",
    content: "Thanks everyone! Really appreciate the quick response.",
    timestamp: new Date(Date.now() - 10000).toISOString(),
    isDirectMessage: false,
  },
  // Direct message examples
  {
    id: "5",
    userId: "1",
    recipientId: "2",
    content: "Hey Sarah, could you help me understand how to fix the HVAC unit?",
    timestamp: new Date(Date.now() - 50000).toISOString(),
    isDirectMessage: true,
  },
  {
    id: "6",
    userId: "2",
    recipientId: "1",
    content: "Sure Tristan, I'll show you tomorrow. It's a common issue with those models.",
    timestamp: new Date(Date.now() - 45000).toISOString(),
    isDirectMessage: true,
  },
];

interface EnhancedChatInterfaceProps {
  currentUserId: string;
  isAdmin?: boolean;
  className?: string;
}

const EnhancedChatInterface = ({ 
  currentUserId, 
  isAdmin = false, 
  className 
}: EnhancedChatInterfaceProps) => {
  // State for messages, selected tab and active recipient
  const [messages, setMessages] = useState<ChatMessage[]>(ENHANCED_MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"team" | "direct">("team");
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Filter users to exclude current user
  const availableUsers = MOCK_USERS.filter(user => user.id !== currentUserId);

  // Scroll to bottom on message change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Filter messages based on tab and selected recipient
  const filteredMessages = messages.filter(message => {
    // Admin can see all messages
    if (isAdmin) {
      if (activeTab === "team") {
        return !message.isDirectMessage;
      } else if (activeTab === "direct") {
        return message.isDirectMessage;
      }
    } 
    // For technicians
    else {
      // Show team messages in team tab
      if (activeTab === "team") {
        return !message.isDirectMessage;
      } 
      // Show direct messages with selected user in direct tab
      else if (activeTab === "direct" && selectedRecipient) {
        return message.isDirectMessage && 
          ((message.userId === currentUserId && message.recipientId === selectedRecipient) ||
           (message.recipientId === currentUserId && message.userId === selectedRecipient));
      }
    }
    return true;
  });

  // Send message handler
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUserId,
      recipientId: activeTab === "direct" ? selectedRecipient : null,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isDirectMessage: activeTab === "direct",
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

  // Get user details by ID
  const getUserById = (userId: string) => {
    return MOCK_USERS.find((user) => user.id === userId) || null;
  };

  // Format timestamp for display
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

  // Handle recipient selection
  const onRecipientChange = (value: string) => {
    setSelectedRecipient(value);
  };

  // Get direct message recipients for admin view
  const getMessageParties = (message: ChatMessage) => {
    if (!message.isDirectMessage) return null;
    
    const sender = getUserById(message.userId);
    const recipient = message.recipientId ? getUserById(message.recipientId) : null;
    
    if (!sender || !recipient) return null;
    
    return `${sender.first_name} → ${recipient.first_name}`;
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardContent className="flex flex-col p-0 h-full">
        <div className="px-4 py-3 border-b bg-muted/30">
          <Tabs defaultValue="team" value={activeTab} onValueChange={(val) => setActiveTab(val as "team" | "direct")}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                {activeTab === "team" ? "Team Chat" : "Direct Messages"}
              </h2>
              <TabsList>
                <TabsTrigger value="team" className="text-xs px-3">
                  <Users className="mr-2 h-4 w-4" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="direct" className="text-xs px-3">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Direct
                </TabsTrigger>
              </TabsList>
            </div>

            {/* User selection for direct messages */}
            {activeTab === "direct" && !isAdmin && (
              <div className="mt-3">
                <Select value={selectedRecipient || ""} onValueChange={onRecipientChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user to message" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.first_name} {user.last_name} - {user.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </Tabs>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => {
                const user = getUserById(message.userId);
                const isCurrentUser = message.userId === currentUserId;
                const messageParties = isAdmin && message.isDirectMessage ? getMessageParties(message) : null;

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
                        
                        {messageParties && (
                          <Badge variant="outline" className="mb-1 text-xs">
                            {messageParties}
                          </Badge>
                        )}
                        
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                {activeTab === "direct" && !selectedRecipient 
                  ? "Select a user to start a conversation" 
                  : "No messages to display"}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t mt-auto">
          {(activeTab !== "direct" || selectedRecipient || isAdmin) && (
            <div className="flex items-end gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Type your message${activeTab === "direct" && !isAdmin 
                  ? ` to ${getUserById(selectedRecipient || "")?.first_name || ""}` 
                  : ""}`}
                className="resize-none min-h-[60px]"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || (activeTab === "direct" && !selectedRecipient && !isAdmin)}
                variant="default"
                size="icon"
                className="h-9 w-9"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedChatInterface;
