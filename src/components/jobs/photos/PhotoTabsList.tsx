
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PhotoTabsListProps {
  reporterPhoto?: string;
  beforePhoto?: string;
  afterPhoto?: string;
}

const PhotoTabsList: React.FC<PhotoTabsListProps> = ({ 
  reporterPhoto, 
  beforePhoto, 
  afterPhoto 
}) => {
  return (
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger 
        value="reporter" 
        disabled={!reporterPhoto}
        className={!reporterPhoto ? "opacity-50 cursor-not-allowed" : ""}
      >
        Reporter
      </TabsTrigger>
      <TabsTrigger 
        value="before" 
        disabled={!beforePhoto}
        className={!beforePhoto ? "opacity-50 cursor-not-allowed" : ""}
      >
        Before
      </TabsTrigger>
      <TabsTrigger 
        value="after" 
        disabled={!afterPhoto}
        className={!afterPhoto ? "opacity-50 cursor-not-allowed" : ""}
      >
        After
      </TabsTrigger>
    </TabsList>
  );
};

export default PhotoTabsList;
