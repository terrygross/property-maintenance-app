
import React from "react";
import { Trash2 } from "lucide-react";

interface EmptyRecycleBinProps {
  title: string;
  description: string;
}

const EmptyRecycleBin = ({ title, description }: EmptyRecycleBinProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-6 mb-4">
        <Trash2 className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  );
};

export default EmptyRecycleBin;
