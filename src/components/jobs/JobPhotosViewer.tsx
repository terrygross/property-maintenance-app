
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Image } from "lucide-react";

interface JobPhotosViewerProps {
  reporterPhoto?: string;
  beforePhoto?: string;
  afterPhoto?: string;
}

const JobPhotosViewer = ({ reporterPhoto, beforePhoto, afterPhoto }: JobPhotosViewerProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    reporterPhoto ? "reporter" : 
    beforePhoto ? "before" : 
    afterPhoto ? "after" : "reporter"
  );

  const hasAnyPhotos = reporterPhoto || beforePhoto || afterPhoto;

  if (!hasAnyPhotos) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <Camera className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">No photos available</p>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
      
      {reporterPhoto && (
        <TabsContent value="reporter" className="mt-4">
          <div className="rounded-md overflow-hidden border flex items-center justify-center bg-gray-50 h-64">
            <img 
              src={reporterPhoto} 
              alt="Issue reported by user" 
              className="max-w-full max-h-64 object-contain"
            />
          </div>
          <p className="text-xs text-center mt-2 text-gray-500">Photo taken by reporter</p>
        </TabsContent>
      )}
      
      {beforePhoto && (
        <TabsContent value="before" className="mt-4">
          <div className="rounded-md overflow-hidden border flex items-center justify-center bg-gray-50 h-64">
            <img 
              src={beforePhoto} 
              alt="Before maintenance" 
              className="max-w-full max-h-64 object-contain"
            />
          </div>
          <p className="text-xs text-center mt-2 text-gray-500">Photo taken before maintenance work</p>
        </TabsContent>
      )}
      
      {afterPhoto && (
        <TabsContent value="after" className="mt-4">
          <div className="rounded-md overflow-hidden border flex items-center justify-center bg-gray-50 h-64">
            <img 
              src={afterPhoto} 
              alt="After maintenance" 
              className="max-w-full max-h-64 object-contain"
            />
          </div>
          <p className="text-xs text-center mt-2 text-gray-500">Photo taken after maintenance work</p>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default JobPhotosViewer;
