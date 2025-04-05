
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JobCommentsProps {
  jobId: string;
  existingComments: string[];
  onAddComment: (jobId: string, comment: string) => void;
}

const JobComments = ({ jobId, existingComments, onAddComment }: JobCommentsProps) => {
  const [comment, setComment] = useState("");
  
  const handleSubmitComment = () => {
    if (comment.trim()) {
      onAddComment(jobId, comment);
      setComment("");
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">Technician Notes</h4>
      
      {existingComments && existingComments.length > 0 ? (
        <ScrollArea className="h-32 w-full border rounded-md bg-gray-50 p-2">
          {existingComments.map((comment, index) => (
            <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-0">
              <p className="text-sm">{comment}</p>
              <p className="text-xs text-gray-500">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </p>
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className="h-12 w-full border rounded-md bg-gray-50 p-2 text-sm text-gray-500 flex items-center justify-center">
          No notes yet
        </div>
      )}
      
      <div className="flex space-x-2">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add notes about this job..."
          className="min-h-[80px] flex-grow"
        />
        <Button 
          size="sm" 
          className="self-end"
          disabled={!comment.trim()}
          onClick={handleSubmitComment}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default JobComments;
