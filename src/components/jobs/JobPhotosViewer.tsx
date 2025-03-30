
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PhotoTabsList from "./photos/PhotoTabsList";
import PhotoTab from "./photos/PhotoTab";
import NoPhotosPlaceholder from "./photos/NoPhotosPlaceholder";

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
    return <NoPhotosPlaceholder />;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <PhotoTabsList 
        reporterPhoto={reporterPhoto}
        beforePhoto={beforePhoto}
        afterPhoto={afterPhoto}
      />
      
      {reporterPhoto && (
        <TabsContent value="reporter">
          <PhotoTab 
            photo={reporterPhoto}
            alt="Issue reported by user"
            description="Photo taken by reporter"
          />
        </TabsContent>
      )}
      
      {beforePhoto && (
        <TabsContent value="before">
          <PhotoTab 
            photo={beforePhoto}
            alt="Before maintenance"
            description="Photo taken before maintenance work"
          />
        </TabsContent>
      )}
      
      {afterPhoto && (
        <TabsContent value="after">
          <PhotoTab 
            photo={afterPhoto}
            alt="After maintenance"
            description="Photo taken after maintenance work"
          />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default JobPhotosViewer;
