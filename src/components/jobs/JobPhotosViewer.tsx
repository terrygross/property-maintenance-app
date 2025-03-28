
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon } from "lucide-react";

interface JobPhotosViewerProps {
  beforePhoto?: string;
  afterPhoto?: string;
}

const JobPhotosViewer = ({ beforePhoto, afterPhoto }: JobPhotosViewerProps) => {
  const [activeTab, setActiveTab] = useState(beforePhoto ? "before" : "after");
  
  // If no photos are available
  if (!beforePhoto && !afterPhoto) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md">
        <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">No photos have been uploaded for this job</p>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
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
      
      <TabsContent value="before" className="h-64 flex items-center justify-center">
        {beforePhoto ? (
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-md">
            <img 
              src={beforePhoto} 
              alt="Before work photo" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500">No 'before' photo available</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="after" className="h-64 flex items-center justify-center">
        {afterPhoto ? (
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-md">
            <img 
              src={afterPhoto} 
              alt="After work photo" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500">No 'after' photo available</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default JobPhotosViewer;
