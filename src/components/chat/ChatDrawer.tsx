
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ChatInterface from "./ChatInterface";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface ChatDrawerProps {
  currentUserId: string;
}

const ChatDrawer = ({ currentUserId }: ChatDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="pb-0">
          <DrawerTitle>Team Chat</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 h-[calc(85vh-64px)]">
          <ChatInterface currentUserId={currentUserId} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;
